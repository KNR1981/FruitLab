const express = require('express');
const session = require('express-session');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = 8080;

// Helper to hash password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cache Control middleware to prevent stale pages during development
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Configure Session middleware
app.use(session({
    secret: 'fruit-lab-premium-secret-key-99',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true if using https
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Session: ${req.session.userId || 'Guest'}`);
    next();
});

// Log browser errors
app.get('/log-error', (req, res) => {
    const msg = req.query.msg;
    console.log(`\n!!! BROWSER ERROR: ${msg}\n`);
    res.send('OK');
});

// Authentication middleware helpers
async function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    try {
        const user = await db.getUserById(req.session.userId);
        if (!user) {
            return res.status(401).json({ error: 'User session invalid' });
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Auth error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function requireAdmin(req, res, next) {
    await requireAuth(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    });
}

/* ==========================================================================
   API AUTH ROUTING
   ========================================================================== */

app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || username.trim().length < 3 || password.length < 4) {
        return res.status(400).json({ error: 'Username must be at least 3 chars and password at least 4 chars' });
    }
    try {
        const user = await db.createUser(username.trim(), password);
        if (!user) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Automatically log in user
        req.session.userId = user.id;
        await db.addLoginLog(username.trim(), 'Standard Registration', 'Success');
        res.json({ success: true, user: { username: user.username, role: user.role, points: user.points } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    try {
        const user = await db.getUser(username.trim());
        if (!user || user.password !== hashPassword(password)) {
            await db.addLoginLog(username.trim(), 'Standard Login', 'Failed');
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        req.session.userId = user.id;
        await db.addLoginLog(username.trim(), 'Standard Login', 'Success');
        res.json({ success: true, user: { username: user.username, role: user.role, points: user.points } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

function decodeJwtPayload(jwt) {
    try {
        const parts = jwt.split('.');
        if (parts.length !== 3) return null;
        const payloadB64 = parts[1];
        const base64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("JWT decoding error:", e);
        return null;
    }
}

app.post('/api/auth/google-signin', async (req, res) => {
    const { credential, email, name } = req.body;
    let userEmail = email;
    let userName = name;

    if (credential) {
        const decoded = decodeJwtPayload(credential);
        if (!decoded || !decoded.email) {
            return res.status(400).json({ error: 'Invalid Google credential token' });
        }
        userEmail = decoded.email;
        userName = decoded.name || decoded.email.split('@')[0];
    }

    if (!userEmail) {
        return res.status(400).json({ error: 'Google Email is required' });
    }

    try {
        let user = await db.getUser(userEmail.trim());
        let isNew = false;
        if (!user) {
            // Create a new user using Google details
            user = await db.createUser(userEmail.trim(), 'google-oauth-dummy-pw', 'customer');
            isNew = true;
        }
        req.session.userId = user.id;
        await db.addLoginLog(userEmail.trim(), isNew ? 'Google Registration' : 'Google Sign In', 'Success');
        res.json({ success: true, user: { username: user.username, role: user.role, points: user.points } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Google Sign In failed' });
    }
});

app.get('/api/auth/google-client-id', (req, res) => {
    res.json({ clientId: process.env.GOOGLE_CLIENT_ID || null });
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.json({ success: true });
    });
});

app.get('/api/auth/session', async (req, res) => {
    if (!req.session.userId) {
        return res.json({ loggedIn: false });
    }
    try {
        const user = await db.getUserById(req.session.userId);
        if (!user) {
            return res.json({ loggedIn: false });
        }
        res.json({
            loggedIn: true,
            user: { id: user.id, username: user.username, role: user.role, points: user.points }
        });
    } catch (err) {
        console.error(err);
        res.json({ loggedIn: false });
    }
});

/* ==========================================================================
   LOYALTY PROGRAM & ORDERS ROUTING
   ========================================================================== */

app.get('/api/profile', requireAuth, (req, res) => {
    res.json({
        username: req.user.username,
        role: req.user.role,
        points: req.user.points,
        created_at: req.user.created_at
    });
});

app.get('/api/profile/orders', requireAuth, async (req, res) => {
    try {
        const orders = await db.getOrdersForUser(req.user.id);
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

app.post('/api/profile/orders', requireAuth, async (req, res) => {
    const { items, totalPrice } = req.body;
    if (!items || !totalPrice || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order payload' });
    }
    
    try {
        // Earn 10 points for every 100 Rs spent
        const pointsEarned = Math.floor(parseFloat(totalPrice) / 10);
        const order = await db.addOrder(req.user.id, items, totalPrice, pointsEarned);
        
        res.json({ success: true, order, pointsEarned });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

/* ==========================================================================
   CMS & PUBLIC MENU ROUTING
   ========================================================================== */

app.get('/api/menu', async (req, res) => {
    try {
        const menu = await db.getMenu();
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch menu' });
    }
});

app.post('/api/admin/menu', requireAdmin, async (req, res) => {
    const { category, name, price, bottle, fruits, ingredients, subCategory } = req.body;
    if (!category || !name || !price) {
        return res.status(400).json({ error: 'Category, name, and price are required' });
    }
    const newItem = {
        name,
        price,
        bottle: bottle || 'yellow',
        image: req.body.image || null,
        fruits: fruits || [],
        rating: '4.8',
        reviews: '+1',
        ingredients: ingredients || name,
        subCategory: subCategory || category
    };
    try {
        const success = await db.addMenuItem(category, newItem);
        if (!success) {
            return res.status(400).json({ error: 'Item already exists' });
        }
        res.json({ success: true, item: newItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create menu item' });
    }
});

app.put('/api/admin/menu', requireAdmin, async (req, res) => {
    const { category, name, updatedItem } = req.body;
    if (!category || !name || !updatedItem) {
        return res.status(400).json({ error: 'Category, name, and updated details required' });
    }
    try {
        const success = await db.updateMenuItem(category, name, updatedItem);
        if (!success) {
            return res.status(400).json({ error: 'Item not found' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});

app.delete('/api/admin/menu', requireAdmin, async (req, res) => {
    const { category, name } = req.body;
    if (!category || !name) {
        return res.status(400).json({ error: 'Category and name are required' });
    }
    try {
        const success = await db.deleteMenuItem(category, name);
        if (!success) {
            return res.status(400).json({ error: 'Item not found' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});

/* ==========================================================================
   CMS & PUBLIC BLOG ROUTING
   ========================================================================== */

app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await db.getBlogs();
        res.json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

app.post('/api/admin/blogs', requireAdmin, async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    try {
        const blog = await db.addBlog(title, content, author);
        res.json({ success: true, blog });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

app.delete('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
    try {
        const success = await db.deleteBlog(req.params.id);
        if (!success) {
            return res.status(400).json({ error: 'Blog post not found' });
        }
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/admin/logins', requireAdmin, async (req, res) => {
    try {
        const logs = await db.getLoginLogs();
        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch login logs' });
    }
});

/* ==========================================================================
   STATIC PAGES SERVING
   ========================================================================== */

// Serve standard static files (HTML, CSS, JS, images, videos) locally
app.use(express.static(__dirname));

module.exports = app;

// Start server locally (ignored during Vercel serverless runs)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n==================================================`);
        console.log(`  Fruit Lab Premium Backend Server Running!`);
        console.log(`  Local URL: http://localhost:${PORT}`);
        console.log(`==================================================\n`);
    });
}
