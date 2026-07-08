const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const DB_FILE = path.join(__dirname, 'db.json');

// Check if Supabase configs are present
const useSupabase = process.env.SUPABASE_URL && 
                    process.env.SUPABASE_KEY && 
                    process.env.SUPABASE_URL !== 'YOUR_SUPABASE_PROJECT_URL' &&
                    process.env.SUPABASE_KEY !== 'YOUR_SUPABASE_ANON_OR_SERVICE_ROLE_KEY';

let supabase = null;
if (useSupabase) {
    try {
        supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
        console.log("\n==================================================");
        console.log("  Successfully connected to Supabase Database!");
        console.log("==================================================\n");
    } catch (e) {
        console.error("Error creating Supabase client, falling back to local file:", e);
    }
} else {
    console.log("\n==================================================");
    console.log("  Supabase credentials not configured in .env");
    console.log("  Using local JSON database fallback (db.json)");
    console.log("==================================================\n");
}

// Helper to hash password safely
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Full seed menu data from original layout
const seedMenu = {
    'dear-self': [
        { name: 'Glowing Skin', price: '159', bottle: 'orig_orange', fruits: ['orange', 'carrot', 'ginger', 'mint'], rating: '4.9', reviews: '+15', ingredients: 'Carrot, Orange, Ginger, Lime', subCategory: 'glow-energy' },
        { name: 'Natural Collagen', price: '159', bottle: 'orig_yellow', fruits: ['apple', 'orange', 'pineapple', 'ginger', 'mint', 'turmeric'], rating: '4.8', reviews: '+9', ingredients: 'Pineapple, Orange, Lime, Ginger, Turmeric', subCategory: 'glow-energy' },
        { name: 'Small Waist', price: '159', bottle: 'orig_yellow', fruits: ['cucumber', 'celery', 'ginger', 'mint'], rating: '4.7', reviews: '+24', ingredients: 'Celery, Cucumber, Ginger, Lime, Himalayan Salt', subCategory: 'detox-cleanse' },
        { name: 'Digestive Boost', price: '159', bottle: 'new_yellow', fruits: ['apple', 'banana', 'pineapple', 'papaya', 'coconut'], rating: '4.8', reviews: '+7', ingredients: 'Pineapple, Papaya, Banana, Coconut Water', subCategory: 'detox-cleanse' },
        { name: 'Energy Boost', price: '159', bottle: 'orig_yellow', fruits: ['apple', 'pineapple', 'mango', 'coconut'], rating: '4.9', reviews: '+18', ingredients: 'Pineapple, Mango, Coconut Water', subCategory: 'glow-energy' },
        { name: 'Iron Rich', price: '159', bottle: 'new_red', fruits: ['apple', 'pineapple', 'beetroot', 'ginger', 'mint'], rating: '4.9', reviews: '+11', ingredients: 'Beetroot, Pineapple, Lime, Ginger', subCategory: 'blood-vitality' },
        { name: 'Eye Wellness', price: '159', bottle: 'new_orange', fruits: ['apple', 'pineapple', 'carrot', 'mint'], rating: '4.6', reviews: '+5', ingredients: 'Apple, Pineapple, Carrot, Lime', subCategory: 'glow-energy' },
        { name: 'Blood Oxidant', price: '159', bottle: 'orig_red', fruits: ['orange', 'beetroot', 'ginger', 'mint'], rating: '4.8', reviews: '+13', ingredients: 'Beetroot, Orange, Lime, Ginger', subCategory: 'blood-vitality' },
        { name: 'Super Green', price: '149', bottle: 'new_yellow', fruits: ['apple', 'banana', 'pineapple', 'spinach'], rating: '4.9', reviews: '+32', ingredients: 'Pineapple, Spinach, Banana', subCategory: 'detox-cleanse' },
        { name: 'Boost Sex Drive', price: '149', bottle: 'orig_red', fruits: ['watermelon', 'beetroot', 'lemon'], rating: '4.7', reviews: '+20', ingredients: 'Watermelon, Beetroot, Lemon', subCategory: 'blood-vitality' },
        { name: 'Ruby Rush', price: '149', bottle: 'new_red', fruits: ['watermelon', 'beetroot', 'carrot'], rating: '4.8', reviews: '+42', ingredients: 'Watermelon, Beetroot, Carrot', subCategory: 'blood-vitality' },
        { name: 'Oxygen Juice', price: '149', bottle: 'orig_red', fruits: ['strawberry', 'watermelon', 'mint', 'lemon'], rating: '4.9', reviews: '+14', ingredients: 'Watermelon, Strawberry, Lemon, Mint', subCategory: 'blood-vitality' },
        { name: 'Ultimate Hydration', price: '149', bottle: 'orig_yellow', fruits: ['cucumber', 'mint', 'lemon', 'coconut'], rating: '4.8', reviews: '+19', ingredients: 'Cucumber, Coconut Water, Lemon, Mint', subCategory: 'detox-cleanse' },
        { name: 'Easy Cleanser', price: '159', bottle: 'orig_yellow', fruits: ['apple', 'cucumber', 'ginger', 'spinach', 'lemon'], rating: '4.8', reviews: '+8', ingredients: 'Apple, Cucumber, Spinach, Lemon, Ginger', subCategory: 'detox-cleanse' }
    ],
    'juices-smoothies': [
        { name: 'Feel good', price: '149', bottle: 'new_red', fruits: ['strawberry', 'watermelon', 'mango'], rating: '4.9', reviews: '+50', ingredients: 'Watermelon, Mango, Strawberry', subCategory: 'fruit-juices' },
        { name: 'Jungle Juice', price: '149', bottle: 'orig_orange', fruits: ['banana', 'mango', 'coconut'], rating: '4.7', reviews: '+6', ingredients: 'Mango, Banana, Coconut Water', subCategory: 'fruit-juices' },
        { name: 'Happy Juice', price: '169', bottle: 'orig_orange', fruits: ['apple', 'strawberry', 'muskmelon'], rating: '4.8', reviews: '+13', ingredients: 'Apple, Muskmelon, Strawberry', subCategory: 'fruit-juices' },
        { name: 'Berry Delight', price: '169', bottle: 'orig_red', fruits: ['apple', 'strawberry', 'cranberry'], rating: '4.9', reviews: '+25', ingredients: 'Apple, Strawberry, Cranberry', subCategory: 'fruit-juices' },
        { name: 'Berry Treasure', price: '169', bottle: 'new_red', fruits: ['orange', 'strawberry', 'blueberry', 'watermelon'], rating: '4.8', reviews: '+33', ingredients: 'Blueberry, Strawberry, Watermelon, Orange', subCategory: 'fruit-juices' },
        { name: 'Easy Tropical', price: '169', bottle: 'new_orange', fruits: ['apple', 'banana', 'pineapple', 'mango'], rating: '4.9', reviews: '+19', ingredients: 'Pineapple, Apple, Mango, Banana', subCategory: 'fruit-juices' },
        { name: 'Apple Flair', price: '169', bottle: 'orig_yellow', fruits: ['apple', 'pineapple', 'mint'], rating: '4.7', reviews: '+9', ingredients: 'Pineapple, Apple, Mint', subCategory: 'fruit-juices' },
        { name: 'Hawaiian Orange', price: '169', bottle: 'new_orange', fruits: ['banana', 'orange', 'mango'], rating: '4.8', reviews: '+14', ingredients: 'Orange, Mango, Banana', subCategory: 'fruit-juices' },
        { name: 'Tropical Banana', price: '169', bottle: 'smoothie', fruits: ['banana', 'honey', 'milk'], rating: '4.8', reviews: '+12', ingredients: 'Banana, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Paradise', price: '169', bottle: 'new_yellow', fruits: ['mango', 'honey', 'milk'], rating: '4.7', reviews: '+18', ingredients: 'Mango, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Havana', price: '169', bottle: 'new_orange', fruits: ['banana', 'mango', 'honey', 'milk'], rating: '4.8', reviews: '+22', ingredients: 'Mango, Banana, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Summer Set', price: '169', bottle: 'new_red', fruits: ['strawberry', 'mango', 'honey', 'milk'], rating: '4.9', reviews: '+28', ingredients: 'Mango, Strawberry, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Date Me', price: '169', bottle: 'smoothie', fruits: ['banana', 'dates', 'honey', 'milk', 'cocoa'], rating: '4.8', reviews: '+15', ingredients: 'Dates, Banana, Cocoa, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Coffee Smoothie', price: '169', bottle: 'new_dark_orange', fruits: ['banana', 'espresso', 'dates', 'honey', 'milk', 'oats'], rating: '4.8', reviews: '+29', ingredients: 'Dates, Coffee, Banana, Oats, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Blubana', price: '189', bottle: 'orig_red', fruits: ['banana', 'blueberry', 'honey', 'milk'], rating: '4.9', reviews: '+31', ingredients: 'Blueberry, Banana, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Triple Berry', price: '189', bottle: 'orig_red', fruits: ['strawberry', 'blueberry', 'cranberry', 'honey', 'milk'], rating: '4.9', reviews: '+40', ingredients: 'Blueberry, Strawberry, Cranberry, Milk, Honey', subCategory: 'smoothies' },
        { name: 'Cocoa Whey Shake', price: '229', bottle: 'smoothie', fruits: ['banana', 'whey', 'almonds', 'honey', 'milk', 'cocoa'], rating: '4.9', reviews: '+45', ingredients: 'Whey, Cocoa, Banana, Raw Almonds, Milk, Honey', subCategory: 'whey-shakes' },
        { name: 'Banana Whey Shake', price: '229', bottle: 'new_yellow', fruits: ['banana', 'whey', 'honey', 'milk'], rating: '4.8', reviews: '+20', ingredients: 'Whey, Banana, Milk, Honey', subCategory: 'whey-shakes' },
        { name: 'Blue Berry Whey Shake', price: '229', bottle: 'orig_red', fruits: ['blueberry', 'whey', 'honey', 'milk'], rating: '4.9', reviews: '+35', ingredients: 'Whey, Blueberry, Milk, Honey', subCategory: 'whey-shakes' },
        { name: 'Almond Banana Whey Shake', price: '229', bottle: 'smoothie', fruits: ['banana', 'coconut', 'whey', 'almonds'], rating: '4.8', reviews: '+26', ingredients: 'Whey, Banana, Coconut Water, Raw Almonds', subCategory: 'whey-shakes' },
        { name: 'Big Hit Whey Shake', price: '229', bottle: 'new_dark_orange', fruits: ['coconut', 'whey', 'espresso', 'almonds', 'honey'], rating: '4.7', reviews: '+11', ingredients: 'Whey, Espresso, Coconut Water, Raw Almonds, Honey', subCategory: 'whey-shakes' },
        { name: 'Girl Power Whey Shake', price: '229', bottle: 'new_red', fruits: ['banana', 'strawberry', 'whey', 'honey', 'milk'], rating: '4.8', reviews: '+18', ingredients: 'Whey, Strawberry, Banana, Milk, Honey', subCategory: 'whey-shakes' },
        { name: 'Mango Banana Whey Shake', price: '229', bottle: 'new_orange', fruits: ['banana', 'mango', 'whey', 'honey', 'milk'], rating: '4.9', reviews: '+24', ingredients: 'Whey, Banana, Mango, Milk, Honey', subCategory: 'whey-shakes' },
        { name: 'Fruit Lab Special Whey Shake', price: '229', bottle: 'new_yellow', fruits: ['banana', 'avocado', 'whey', 'almonds', 'honey'], rating: '4.8', reviews: '+16', ingredients: 'Whey, Avocado, Banana, Raw Almonds, Honey', subCategory: 'whey-shakes' }
    ],
    'bowls-puddings': [
        { name: 'Just Oatmeal Seasonal', price: '149', bottle: 'yellow', fruits: ['apple', 'banana', 'milk', 'oats'], rating: '4.7', reviews: '+10', ingredients: 'Apple, Banana, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'just_oatmeal_seasonal.jpg' },
        { name: 'Raw Cocoa Oatmeal', price: '149', bottle: 'red', fruits: ['apple', 'banana', 'milk', 'oats', 'cocoa'], rating: '4.8', reviews: '+22', ingredients: 'Apple, Banana, Raw Cocoa, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'raw_cocoa_oatmeal.jpg' },
        { name: 'Coffee Oatmeal', price: '149', bottle: 'yellow', fruits: ['apple', 'banana', 'espresso', 'milk', 'oats'], rating: '4.8', reviews: '+16', ingredients: 'Apple, Banana, Espresso, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'coffee_oatmeal.jpg' },
        { name: 'Choco Almond Oatmeal', price: '169', bottle: 'red', fruits: ['almonds', 'milk', 'oats', 'cocoa'], rating: '4.9', reviews: '+31', ingredients: 'Almonds, Cocoa Powder, Dark Chocolate, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'choco_almond_oatmeal.jpg' },
        { name: 'Ash Gourd Juice', price: '59', bottle: 'new_yellow', fruits: ['cucumber'], rating: '4.6', reviews: '+8', ingredients: '100% Pure Ash Gourd Juice', subCategory: 'pure-juices' },
        { name: 'Watermelon Juice', price: '69', bottle: 'orig_red', fruits: ['watermelon'], rating: '4.9', reviews: '+67', ingredients: '100% Pure Watermelon Juice', subCategory: 'pure-juices' },
        { name: 'Pineapple Juice', price: '99', bottle: 'orig_yellow', fruits: ['apple', 'pineapple'], rating: '4.8', reviews: '+28', ingredients: '100% Pure Pineapple Juice', subCategory: 'pure-juices' },
        { name: 'Muskmelon Juice', price: '99', bottle: 'new_yellow', fruits: ['muskmelon'], rating: '4.7', reviews: '+19', ingredients: '100% Pure Muskmelon Juice', subCategory: 'pure-juices' },
        { name: 'Beetroot Juice', price: '99', bottle: 'orig_red', fruits: ['beetroot'], rating: '4.8', reviews: '+24', ingredients: '100% Pure Beetroot Juice', subCategory: 'pure-juices' },
        { name: 'Carrot Juice', price: '119', bottle: 'new_dark_orange', fruits: ['carrot'], rating: '4.9', reviews: '+36', ingredients: '100% Pure Carrot Juice', subCategory: 'pure-juices' },
        { name: 'Papaya Plate', price: '119', bottle: 'orig_orange', fruits: ['papaya'], rating: '4.6', reviews: '+15', ingredients: 'Freshly Cut Papaya Slices', subCategory: 'pure-juices' },
        { name: 'Orange Juice', price: '169', bottle: 'orig_orange', fruits: ['orange'], rating: '4.9', reviews: '+48', ingredients: '100% Pure Imported Citrus Orange', subCategory: 'pure-juices' },
        { name: 'Apple Juice', price: '189', bottle: 'orig_yellow', fruits: ['apple'], rating: '4.8', reviews: '+22', ingredients: '100% Pure Royal Gala Apple Juice', subCategory: 'pure-juices' },
        { name: 'Chia Pudding Seasonal', price: '149', bottle: 'yellow', fruits: ['banana', 'honey', 'milk', 'chia', 'seeds'], rating: '4.8', reviews: '+13', ingredients: 'Chia Seeds, Milk, Banana, Honey', subCategory: 'chia-puddings', image: 'chia_pudding_seasonal.jpg' },
        { name: 'Coffee Chia Pudding', price: '149', bottle: 'yellow', fruits: ['banana', 'espresso', 'milk', 'chia', 'seeds'], rating: '4.7', reviews: '+9', ingredients: 'Chia Seeds, Milk, Espresso, Banana', subCategory: 'chia-puddings', image: 'coffee_chia_pudding.png' },
        { name: 'Raw Cocoa Chia Pudding', price: '149', bottle: 'red', fruits: ['banana', 'milk', 'chia', 'cocoa', 'seeds'], rating: '4.8', reviews: '+17', ingredients: 'Raw Cocoa, Chia Seeds, Milk, Banana', subCategory: 'chia-puddings', image: 'raw_cocoa_chia_pudding.jpg' },
        { name: 'Mango Chia Pudding', price: '149', bottle: 'yellow', fruits: ['mango', 'honey', 'milk', 'chia', 'seeds'], rating: '4.9', reviews: '+18', ingredients: 'Chia Seeds, Milk, Alphonso Mango, Honey', subCategory: 'chia-puddings', image: 'mango_chia_pudding.jpeg' }
    ],
    'healthy-bites': [
        { name: 'Veg Sandwich', price: '89', bottle: 'yellow', fruits: ['vegetables', 'grain'], rating: '4.6', reviews: '+23', ingredients: 'Fresh Vegetables on Whole Grain Bread', subCategory: 'sandwiches-toasts', image: 'veg_sandwich.jpg' },
        { name: 'Bombay Sandwich', price: '89', bottle: 'orange', fruits: ['mint', 'potato'], rating: '4.7', reviews: '+34', ingredients: 'Bombay Spiced Potato & Mint Toastie', subCategory: 'sandwiches-toasts', image: 'bombay_sandwich.jpg' },
        { name: 'Corn Spinach Cheese Toast', price: '129', bottle: 'yellow', fruits: ['spinach', 'cheese', 'corn'], rating: '4.8', reviews: '+41', ingredients: 'Golden Corn, Spinach & Low Fat Cheese', subCategory: 'sandwiches-toasts', image: 'corn_spinach_cheese_toast.jpg' },
        { name: 'Weight Gain Fruit Bowl', price: '99', bottle: 'orange', fruits: ['banana', 'coconut', 'almonds', 'dates', 'honey'], rating: '4.8', reviews: '+14', ingredients: 'Banana, Coconut, Raw Almonds, Honey, Dates', subCategory: 'plant-milks-bowls', image: 'weight_gain_fruit_bowl.jpg' },
        { name: 'Weight Loss Fruit Bowl', price: '99', bottle: 'yellow', fruits: ['apple', 'pineapple', 'mint', 'lemon', 'chia', 'seeds'], rating: '4.9', reviews: '+28', ingredients: 'Pineapple, Apple, Lemon, Mint, Chia Seeds', subCategory: 'plant-milks-bowls', image: 'weight_loss_fruit_bowl.png' },
        { name: 'Fruit Lab Special Bowl', price: '149', bottle: 'red', fruits: ['apple', 'kiwi', 'chia', 'berries', 'seeds'], rating: '4.9', reviews: '+52', ingredients: 'Exotic Berries, Kiwi, Apple, Chia Seeds', subCategory: 'plant-milks-bowls', image: 'fruit_lab_special_bowl.jpg' },
        { name: 'Power Seeds Brick', price: '49', bottle: 'red', fruits: ['dates', 'oats', 'seeds'], rating: '4.8', reviews: '+8', ingredients: 'Raw Seeds, Dates, Oatmeal Bound Bar', subCategory: 'energy-protein-bars', image: 'power_seeds_brick.jpg' },
        { name: 'Peanut Bar', price: '69', bottle: 'yellow', fruits: ['almonds', 'honey', 'oats', 'peanuts'], rating: '4.7', reviews: '+15', ingredients: 'Roasted Peanuts, Honey, Rolled Oats', subCategory: 'energy-protein-bars', image: 'peanut_bar.jpg' },
        { name: 'Choco Almond Protein', price: '99', bottle: 'red', fruits: ['whey', 'almonds', 'honey', 'cocoa'], rating: '4.9', reviews: '+39', ingredients: 'Raw Cocoa, Almonds, Whey Protein, Honey', subCategory: 'energy-protein-bars', image: 'choco_almond_protein.jpg' }
    ]
};

const seedBlogs = [
    {
        id: "blog-1",
        title: "The Science of Cold-Pressed Juices",
        content: "By applying thousands of pounds of hydraulic pressure, cold-pressing extracts the raw liquid nectar of fresh fruits and vegetables. Unlike standard centrifugal juicers, it creates zero heat or oxidation, keeping 100% of vital active biological enzymes, minerals, and phytonutrients alive and ready for fast cellular absorption.",
        author: "Dr. Rachel Thorne",
        date: "2026-06-25",
        image: "assets/real_spinach.png"
    },
    {
        id: "blog-2",
        title: "Pure Sourcing: Sourcing Directly From Local Farmers",
        content: "At Fruit Lab, we believe that the best refreshments start with the soil. That's why we forge direct, honest partnerships with local farming communities in Telangana. Sourcing directly at peak seasonal ripeness ensures maximum nutrient density, reduces carbon transport, and guarantees farmers receive fair, reliable compensation.",
        author: "Devendra Rao",
        date: "2026-06-28",
        image: "assets/real_orange.png"
    }
];

class Database {
    constructor() {
        this.loadLocal();
        this.seedIfNeeded();
        if (useSupabase) {
            this.seedSupabaseIfNeeded();
        }
    }

    /* ==========================================================================
       LOCAL FILE FALLBACK SYSTEM
       ========================================================================== */

    loadLocal() {
        try {
            if (fs.existsSync(DB_FILE)) {
                const raw = fs.readFileSync(DB_FILE, 'utf-8');
                this.data = JSON.parse(raw);
            } else {
                this.data = { users: [], menu: {}, blogs: [], orders: [] };
                this.saveLocal();
            }
        } catch (e) {
            console.error("Error loading local database, resetting:", e);
            this.data = { users: [], menu: {}, blogs: [], orders: [] };
        }
    }

    saveLocal() {
        try {
            fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 4), 'utf-8');
        } catch (e) {
            console.error("Error saving local database:", e);
        }
    }

    seedIfNeeded() {
        let dirty = false;
        if (!this.data.users || this.data.users.length === 0) {
            this.data.users = [{
                id: 'user-admin',
                username: 'admin',
                password: hashPassword('admin123'),
                role: 'admin',
                points: 9999,
                created_at: new Date().toISOString()
            }];
            dirty = true;
            console.log("Seeded local admin user: admin / admin123");
        }
        if (!this.data.menu || Object.keys(this.data.menu).length === 0) {
            this.data.menu = seedMenu;
            dirty = true;
            console.log("Seeded local menu items.");
        }
        if (!this.data.blogs || this.data.blogs.length === 0) {
            this.data.blogs = seedBlogs;
            dirty = true;
            console.log("Seeded local blog posts.");
        }
        if (dirty) {
            this.saveLocal();
        }
    }

    /* ==========================================================================
       SUPABASE AUTOMATIC SEEDER
       ========================================================================== */

    async seedSupabaseIfNeeded() {
        try {
            // 1. Seed default admin user
            const { data: users, error: userErr } = await supabase.from('users').select('id');
            if (!userErr && (!users || users.length === 0)) {
                console.log("Seeding default admin user into Supabase...");
                await supabase.from('users').insert([{
                    id: 'user-admin',
                    username: 'admin',
                    password: hashPassword('admin123'),
                    role: 'admin',
                    points: 9999,
                    created_at: new Date().toISOString()
                }]);
            }

            // 2. Seed menu
            const { data: menu, error: menuErr } = await supabase.from('menu').select('id');
            if (!menuErr && (!menu || menu.length === 0)) {
                console.log("Seeding menu items into Supabase...");
                const flatMenu = [];
                Object.keys(seedMenu).forEach(category => {
                    seedMenu[category].forEach(item => {
                        flatMenu.push({
                            category,
                            name: item.name,
                            price: item.price,
                            bottle: item.bottle,
                            image: item.image || null,
                            fruits: item.fruits || [],
                            rating: item.rating,
                            reviews: item.reviews,
                            ingredients: item.ingredients,
                            sub_category: item.subCategory
                        });
                    });
                });
                await supabase.from('menu').insert(flatMenu);
            }

            // 3. Seed blogs
            const { data: blogs, error: blogErr } = await supabase.from('blogs').select('id');
            if (!blogErr && (!blogs || blogs.length === 0)) {
                console.log("Seeding blog posts into Supabase...");
                await supabase.from('blogs').insert(seedBlogs);
            }
            console.log("Supabase seeding check completed successfully.");
        } catch (e) {
            console.error("Error checking or seeding Supabase:", e);
        }
    }

    /* ==========================================================================
       UNIFIED DATABASE API (SUPABASE WITH LOCAL FALLBACK)
       ========================================================================== */

    async getUser(username) {
        if (useSupabase) {
            const { data, error } = await supabase.from('users').select('*').eq('username', username).maybeSingle();
            if (error) console.error("Supabase getUser error:", error);
            return data;
        }
        return this.data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    }

    async getUserById(id) {
        if (useSupabase) {
            const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
            if (error) console.error("Supabase getUserById error:", error);
            return data;
        }
        return this.data.users.find(u => u.id === id);
    }

    async createUser(username, password, role = 'customer') {
        const existing = await this.getUser(username);
        if (existing) return null;

        const newUser = {
            id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            username: username,
            password: hashPassword(password),
            role: role,
            points: 0,
            created_at: new Date().toISOString()
        };

        if (useSupabase) {
            const { error } = await supabase.from('users').insert([newUser]);
            if (error) {
                console.error("Supabase createUser error:", error);
                return null;
            }
            return newUser;
        }

        this.data.users.push(newUser);
        this.saveLocal();
        return newUser;
    }

    async getAllUsers() {
        if (useSupabase) {
            const { data, error } = await supabase.from('users').select('*');
            if (error) {
                console.error("Supabase getAllUsers error:", error);
                return [];
            }
            return data.map(u => ({
                id: u.id,
                username: u.username,
                role: u.role,
                points: u.points,
                created_at: u.created_at
            }));
        }

        return this.data.users.map(u => ({
            id: u.id,
            username: u.username,
            role: u.role,
            points: u.points,
            created_at: u.created_at
        }));
    }

    async addOrder(userId, items, totalPrice, pointsEarned) {
        const orderId = 'order-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
        const orderDate = new Date().toISOString();

        if (useSupabase) {
            const newOrder = {
                id: orderId,
                user_id: userId,
                items: items,
                total_price: totalPrice.toString(),
                points_earned: pointsEarned,
                created_at: orderDate
            };
            const { error: orderError } = await supabase.from('orders').insert([newOrder]);
            if (orderError) {
                console.error("Supabase addOrder error:", orderError);
                return null;
            }

            // Increment loyalty points
            const user = await this.getUserById(userId);
            if (user) {
                const newPoints = (user.points || 0) + pointsEarned;
                const { error: userError } = await supabase.from('users').update({ points: newPoints }).eq('id', userId);
                if (userError) console.error("Supabase points update error:", userError);
            }
            
            // Format order structure back to frontend expectations
            return {
                id: orderId,
                userId: userId,
                items: items,
                totalPrice: totalPrice.toString(),
                pointsEarned: pointsEarned,
                date: orderDate
            };
        }

        const order = {
            id: orderId,
            userId: userId,
            items: items,
            totalPrice: totalPrice,
            pointsEarned: pointsEarned,
            date: orderDate
        };

        if (!this.data.orders) this.data.orders = [];
        this.data.orders.push(order);

        const user = this.data.users.find(u => u.id === userId);
        if (user) {
            user.points = (user.points || 0) + pointsEarned;
        }

        this.saveLocal();
        return order;
    }

    async getOrdersForUser(userId) {
        if (useSupabase) {
            const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId);
            if (error) {
                console.error("Supabase getOrdersForUser error:", error);
                return [];
            }
            return data.map(o => ({
                id: o.id,
                userId: o.user_id,
                items: o.items,
                totalPrice: o.total_price,
                pointsEarned: o.points_earned,
                date: o.created_at
            })).sort((a,b) => new Date(b.date) - new Date(a.date));
        }

        if (!this.data.orders) return [];
        return this.data.orders.filter(o => o.userId === userId).sort((a,b) => new Date(b.date) - new Date(a.date));
    }

    async getMenu() {
        if (useSupabase) {
            const { data, error } = await supabase.from('menu').select('*');
            if (error) {
                console.error("Supabase getMenu error:", error);
                return {};
            }
            const grouped = {};
            data.forEach(item => {
                if (!grouped[item.category]) {
                    grouped[item.category] = [];
                }
                grouped[item.category].push({
                    name: item.name,
                    price: item.price,
                    bottle: item.bottle,
                    image: item.image,
                    fruits: item.fruits || [],
                    rating: item.rating,
                    reviews: item.reviews,
                    ingredients: item.ingredients,
                    subCategory: item.sub_category
                });
            });
            return grouped;
        }

        return this.data.menu || {};
    }

    async addMenuItem(category, item) {
        if (useSupabase) {
            // Check if exists
            const { data, error: checkErr } = await supabase.from('menu').select('id').eq('category', category).eq('name', item.name).maybeSingle();
            if (data) return false;

            const { error } = await supabase.from('menu').insert([{
                category,
                name: item.name,
                price: item.price,
                bottle: item.bottle,
                image: item.image || null,
                fruits: item.fruits || [],
                rating: item.rating || '4.8',
                reviews: item.reviews || '+1',
                ingredients: item.ingredients || item.name,
                sub_category: item.subCategory || category
            }]);

            if (error) {
                console.error("Supabase addMenuItem error:", error);
                return false;
            }
            return true;
        }

        if (!this.data.menu) this.data.menu = {};
        if (!this.data.menu[category]) this.data.menu[category] = [];
        if (this.data.menu[category].some(i => i.name.toLowerCase() === item.name.toLowerCase())) {
            return false;
        }
        this.data.menu[category].push(item);
        this.saveLocal();
        return true;
    }

    async updateMenuItem(category, name, updatedItem) {
        if (useSupabase) {
            const { error } = await supabase.from('menu').update({
                price: updatedItem.price,
                bottle: updatedItem.bottle,
                image: updatedItem.image,
                fruits: updatedItem.fruits,
                ingredients: updatedItem.ingredients,
                sub_category: updatedItem.subCategory
            }).eq('category', category).eq('name', name);

            if (error) {
                console.error("Supabase updateMenuItem error:", error);
                return false;
            }
            return true;
        }

        if (!this.data.menu || !this.data.menu[category]) return false;
        const index = this.data.menu[category].findIndex(i => i.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            this.data.menu[category][index] = { ...this.data.menu[category][index], ...updatedItem };
            this.saveLocal();
            return true;
        }
        return false;
    }

    async deleteMenuItem(category, name) {
        if (useSupabase) {
            const { error } = await supabase.from('menu').delete().eq('category', category).eq('name', name);
            if (error) {
                console.error("Supabase deleteMenuItem error:", error);
                return false;
            }
            return true;
        }

        if (!this.data.menu || !this.data.menu[category]) return false;
        const index = this.data.menu[category].findIndex(i => i.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            this.data.menu[category].splice(index, 1);
            this.saveLocal();
            return true;
        }
        return false;
    }

    async getBlogs() {
        if (useSupabase) {
            const { data, error } = await supabase.from('blogs').select('*');
            if (error) {
                console.error("Supabase getBlogs error:", error);
                return [];
            }
            return data;
        }

        return this.data.blogs || [];
    }

    async addBlog(title, content, author = 'Fruit Lab Team') {
        const blogId = 'blog-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
        const blogDate = new Date().toISOString().split('T')[0];

        const blog = {
            id: blogId,
            title: title,
            content: content,
            author: author,
            date: blogDate,
            image: "assets/real_spinach.png"
        };

        if (useSupabase) {
            const { error } = await supabase.from('blogs').insert([blog]);
            if (error) {
                console.error("Supabase addBlog error:", error);
                return null;
            }
            return blog;
        }

        if (!this.data.blogs) this.data.blogs = [];
        this.data.blogs.push(blog);
        this.saveLocal();
        return blog;
    }

    async deleteBlog(id) {
        if (useSupabase) {
            const { error } = await supabase.from('blogs').delete().eq('id', id);
            if (error) {
                console.error("Supabase deleteBlog error:", error);
                return false;
            }
            return true;
        }

        if (!this.data.blogs) return false;
        const index = this.data.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            this.data.blogs.splice(index, 1);
            this.saveLocal();
            return true;
        }
        return false;
    }

    async addLoginLog(username, method, status) {
        const log = {
            id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            username: username,
            method: method,
            status: status,
            timestamp: new Date().toISOString()
        };

        if (useSupabase) {
            try {
                const { error } = await supabase.from('logins').insert([log]);
                if (error) {
                    if (!this.data.logins) this.data.logins = [];
                    this.data.logins.push(log);
                    this.saveLocal();
                }
            } catch (e) {
                if (!this.data.logins) this.data.logins = [];
                this.data.logins.push(log);
                this.saveLocal();
            }
        } else {
            if (!this.data.logins) this.data.logins = [];
            this.data.logins.push(log);
            this.saveLocal();
        }
        return log;
    }

    async getLoginLogs() {
        if (useSupabase) {
            try {
                const { data, error } = await supabase.from('logins').select('*').order('timestamp', { ascending: false });
                if (!error && data) return data;
            } catch (e) {
                // Fallback to local
            }
        }
        if (!this.data.logins) this.data.logins = [];
        return [...this.data.logins].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
}

module.exports = new Database();
