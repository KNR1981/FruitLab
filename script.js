/* ==========================================================================
   FRUIT LAB - PREMIUM INTERACTIVITY & ANIMATIONS (GSAP)
   ========================================================================== */

window.addEventListener('error', (e) => {
    fetch(`/log-error?msg=${encodeURIComponent(e.message + ' at ' + e.filename + ':' + e.lineno)}`);
});

document.addEventListener('DOMContentLoaded', () => {

    // --- Setup Color Themes ---
    const colors = {
        orange: {
            glow: 'radial-gradient(circle, rgba(255, 229, 191, 0.45) 0%, rgba(255, 242, 219, 0.15) 50%, rgba(0,0,0,0) 100%)', theme: '#F62440', button: 'linear-gradient(135deg, #F62440, #FFE5BF)'
        },
        red: {
            glow: 'radial-gradient(circle, rgba(246, 36, 64, 0.3) 0%, rgba(255, 229, 191, 0.1) 50%, rgba(0,0,0,0) 100%)', theme: '#F62440', button: 'linear-gradient(135deg, #F62440, #FFF2DB)'
        },
        yellow: {
            glow: 'radial-gradient(circle, rgba(255, 242, 219, 0.5) 0%, rgba(255, 229, 191, 0.15) 50%, rgba(0,0,0,0) 100%)', theme: '#FFE5BF', button: 'linear-gradient(135deg, #F62440, #FFE5BF)'
        }
    };

    // --- HTML SVG Assets for Floating Fruits (using real transparent PNGs) ---
    const fruitSVGs = {
        grain: `<img src="assets/real_grain.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Grain">`,
        seeds: `<img src="assets/real_seeds.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Seeds">`,
        cocoa: `<img src="assets/real_cocoa.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Cocoa">`,
        peanuts: `<img src="assets/real_peanuts.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Peanuts">`,
        oats: `<img src="assets/real_oats.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Oats">`,
        vegetables: `<img src="assets/real_vegetables.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Vegetables">`,
        berries: `<img src="assets/real_berries.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Berries">`,
        espresso: `<img src="assets/real_espresso.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Espresso">`,
        dates: `<img src="assets/real_dates.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Dates">`,
        corn: `<img src="assets/real_corn.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Corn">`,
        cheese: `<img src="assets/real_cheese.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Cheese">`,
        chia: `<img src="assets/real_chia.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Chia">`,
        potato: `<img src="assets/real_potato.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Potato">`,
        almonds: `<img src="assets/real_almonds.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Almonds">`,
        milk: `<img src="assets/real_milk.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Milk">`,
        honey: `<img src="assets/real_honey.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Honey">`,
        muskmelon: `<img src="assets/real_muskmelon.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Muskmelon">`,
        lemon: `<img src="assets/real_lemon.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Lemon">`,
        kiwi: `<img src="assets/real_kiwi.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Kiwi">`,
        cranberry: `<img src="assets/real_cranberry.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Cranberry">`,
        celery: `<img src="assets/real_celery.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Celery">`,
        avocado: `<img src="assets/real_avocado.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Avocado">`,
        papaya: `<img src="assets/real_papaya.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Papaya">`,
        turmeric: `<img src="assets/real_turmeric.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Turmeric">`,
        mango: `<img src="assets/real_mango.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Mango">`,
        orange: `<img src="assets/real_orange.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Orange">`,
        strawberry: `<img src="assets/real_strawberry.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Strawberry">`,
        pineapple: `<img src="assets/real_pineapple.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Pineapple">`,
        mint: `<img src="assets/real_mint.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Mint">`,
        carrot: `<img src="assets/real_carrot.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Carrot">`,
        ginger: `<img src="assets/real_ginger.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Ginger">`,
        cucumber: `<img src="assets/real_cucumber.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Cucumber">`,
        watermelon: `<img src="assets/real_watermelon.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Watermelon">`,
        apple: `<img src="assets/real_apple.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Apple">`,
        blueberry: `<img src="assets/real_blueberry.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Blueberry">`,
        spinach: `<img src="assets/real_spinach.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Spinach">`,
        banana: `<img src="assets/real_banana.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Banana">`,
        leaf: `<img src="assets/real_mint.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Leaf">`,
        coffee: `<img src="assets/real_coffee.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Coffee">`,
        nuts: `<img src="assets/real_nuts.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Nuts">`,
        beetroot: `<img src="assets/real_beetroot.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Beetroot">`,
        coconut: `<img src="assets/real_coconut.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Coconut">`,
        whey: `<img src="assets/real_whey.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Whey">`,
        pistachio: `<img src="assets/real_pistachio.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Pistachio">`,
        cherry: `<img src="assets/real_cherry.png?v=70" style="width:100%;height:100%;object-fit:contain;" alt="Cherry">`
    };

    // --- Full Menu Dataset ---
    const fullMenuData = {
        'dear-self': [
            { name: 'Glowing Skin', price: '₹159', bottle: 'orig_orange', fruits: ['orange', 'carrot', 'ginger', 'mint'], rating: '4.9', reviews: '+15', ingredients: 'Carrot, Orange, Ginger, Lime', subCategory: 'glow-energy' },
            { name: 'Natural Collagen', price: '₹159', bottle: 'orig_yellow', fruits: ['apple', 'orange', 'pineapple', 'ginger', 'mint', 'turmeric'], rating: '4.8', reviews: '+9', ingredients: 'Pineapple, Orange, Lime, Ginger, Turmeric', subCategory: 'glow-energy' },
            { name: 'Small Waist', price: '₹159', bottle: 'orig_yellow', fruits: ['cucumber', 'celery', 'ginger', 'mint'], rating: '4.7', reviews: '+24', ingredients: 'Celery, Cucumber, Ginger, Lime, Himalayan Salt', subCategory: 'detox-cleanse' },
            { name: 'Digestive Boost', price: '₹159', bottle: 'new_yellow', fruits: ['apple', 'banana', 'pineapple', 'papaya', 'coconut'], rating: '4.8', reviews: '+7', ingredients: 'Pineapple, Papaya, Banana, Coconut Water', subCategory: 'detox-cleanse' },
            { name: 'Energy Boost', price: '₹159', bottle: 'orig_yellow', fruits: ['apple', 'pineapple', 'mango', 'coconut'], rating: '4.9', reviews: '+18', ingredients: 'Pineapple, Mango, Coconut Water', subCategory: 'glow-energy' },
            { name: 'Iron Rich', price: '₹159', bottle: 'new_red', fruits: ['apple', 'pineapple', 'beetroot', 'ginger', 'mint'], rating: '4.9', reviews: '+11', ingredients: 'Beetroot, Pineapple, Lime, Ginger', subCategory: 'blood-vitality' },
            { name: 'Eye Wellness', price: '₹159', bottle: 'new_orange', fruits: ['apple', 'pineapple', 'carrot', 'mint'], rating: '4.6', reviews: '+5', ingredients: 'Apple, Pineapple, Carrot, Lime', subCategory: 'glow-energy' },
            { name: 'Blood Oxidant', price: '₹159', bottle: 'orig_red', fruits: ['orange', 'beetroot', 'ginger', 'mint'], rating: '4.8', reviews: '+13', ingredients: 'Beetroot, Orange, Lime, Ginger', subCategory: 'blood-vitality' },
            { name: 'Super Green', price: '₹149', bottle: 'new_yellow', fruits: ['apple', 'banana', 'pineapple', 'spinach'], rating: '4.9', reviews: '+32', ingredients: 'Pineapple, Spinach, Banana', subCategory: 'detox-cleanse' },
            { name: 'Boost Sex Drive', price: '₹149', bottle: 'orig_red', fruits: ['watermelon', 'beetroot', 'lemon'], rating: '4.7', reviews: '+20', ingredients: 'Watermelon, Beetroot, Lemon', subCategory: 'blood-vitality' },
            { name: 'Ruby Rush', price: '₹149', bottle: 'new_red', fruits: ['watermelon', 'beetroot', 'carrot'], rating: '4.8', reviews: '+42', ingredients: 'Watermelon, Beetroot, Carrot', subCategory: 'blood-vitality' },
            { name: 'Oxygen Juice', price: '₹149', bottle: 'orig_red', fruits: ['strawberry', 'watermelon', 'mint', 'lemon'], rating: '4.9', reviews: '+14', ingredients: 'Watermelon, Strawberry, Lemon, Mint', subCategory: 'blood-vitality' },
            { name: 'Ultimate Hydration', price: '₹149', bottle: 'orig_yellow', fruits: ['cucumber', 'mint', 'lemon', 'coconut'], rating: '4.8', reviews: '+19', ingredients: 'Cucumber, Coconut Water, Lemon, Mint', subCategory: 'detox-cleanse' },
            { name: 'Easy Cleanser', price: '₹159', bottle: 'orig_yellow', fruits: ['apple', 'cucumber', 'ginger', 'spinach', 'lemon'], rating: '4.8', reviews: '+8', ingredients: 'Apple, Cucumber, Spinach, Lemon, Ginger', subCategory: 'detox-cleanse' }
        ],
        'juices-smoothies': [
            // Column 1: Fruit Juices
            { name: 'Feel good', price: '₹149', bottle: 'new_red', fruits: ['strawberry', 'watermelon', 'mango'], rating: '4.9', reviews: '+50', ingredients: 'Watermelon, Mango, Strawberry', subCategory: 'fruit-juices' },
            { name: 'Jungle Juice', price: '₹149', bottle: 'orig_orange', fruits: ['banana', 'mango', 'coconut'], rating: '4.7', reviews: '+6', ingredients: 'Mango, Banana, Coconut Water', subCategory: 'fruit-juices' },
            { name: 'Happy Juice', price: '₹169', bottle: 'orig_orange', fruits: ['apple', 'strawberry', 'muskmelon'], rating: '4.8', reviews: '+13', ingredients: 'Apple, Muskmelon, Strawberry', subCategory: 'fruit-juices' },
            { name: 'Berry Delight', price: '₹169', bottle: 'orig_red', fruits: ['apple', 'strawberry', 'cranberry'], rating: '4.9', reviews: '+25', ingredients: 'Apple, Strawberry, Cranberry', subCategory: 'fruit-juices' },
            { name: 'Berry Treasure', price: '₹169', bottle: 'new_red', fruits: ['orange', 'strawberry', 'blueberry', 'watermelon'], rating: '4.8', reviews: '+33', ingredients: 'Blueberry, Strawberry, Watermelon, Orange', subCategory: 'fruit-juices' },
            { name: 'Easy Tropical', price: '₹169', bottle: 'new_orange', fruits: ['apple', 'banana', 'pineapple', 'mango'], rating: '4.9', reviews: '+19', ingredients: 'Pineapple, Apple, Mango, Banana', subCategory: 'fruit-juices' },
            { name: 'Apple Flair', price: '₹169', bottle: 'orig_yellow', fruits: ['apple', 'pineapple', 'mint'], rating: '4.7', reviews: '+9', ingredients: 'Pineapple, Apple, Mint', subCategory: 'fruit-juices' },
            { name: 'Hawaiian Orange', price: '₹169', bottle: 'new_orange', fruits: ['banana', 'orange', 'mango'], rating: '4.8', reviews: '+14', ingredients: 'Orange, Mango, Banana', subCategory: 'fruit-juices' },
 
            // Column 2: Smoothies
            { name: 'Tropical Banana', price: '₹169', bottle: 'smoothie', fruits: ['banana', 'honey', 'milk'], rating: '4.8', reviews: '+12', ingredients: 'Banana, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Paradise', price: '₹169', bottle: 'new_yellow', fruits: ['mango', 'honey', 'milk'], rating: '4.7', reviews: '+18', ingredients: 'Mango, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Havana', price: '₹169', bottle: 'new_orange', fruits: ['banana', 'mango', 'honey', 'milk'], rating: '4.8', reviews: '+22', ingredients: 'Mango, Banana, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Summer Set', price: '₹169', bottle: 'new_red', fruits: ['strawberry', 'mango', 'honey', 'milk'], rating: '4.9', reviews: '+28', ingredients: 'Mango, Strawberry, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Date Me', price: '₹169', bottle: 'smoothie', fruits: ['banana', 'dates', 'honey', 'milk', 'cocoa'], rating: '4.8', reviews: '+15', ingredients: 'Dates, Banana, Cocoa, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Coffee Smoothie', price: '₹169', bottle: 'new_dark_orange', fruits: ['banana', 'espresso', 'dates', 'honey', 'milk', 'oats'], rating: '4.8', reviews: '+29', ingredients: 'Dates, Coffee, Banana, Oats, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Blubana', price: '₹189', bottle: 'orig_red', fruits: ['banana', 'blueberry', 'honey', 'milk'], rating: '4.9', reviews: '+31', ingredients: 'Blueberry, Banana, Milk, Honey', subCategory: 'smoothies' },
            { name: 'Triple Berry', price: '₹189', bottle: 'orig_red', fruits: ['strawberry', 'blueberry', 'cranberry', 'honey', 'milk'], rating: '4.9', reviews: '+40', ingredients: 'Blueberry, Strawberry, Cranberry, Milk, Honey', subCategory: 'smoothies' },
 
            // Column 3: Whey Protein Shakes
            { name: 'Cocoa Whey Shake', price: '₹229', bottle: 'smoothie', fruits: ['banana', 'whey', 'almonds', 'honey', 'milk', 'cocoa'], rating: '4.9', reviews: '+45', ingredients: 'Whey, Cocoa, Banana, Raw Almonds, Milk, Honey', subCategory: 'whey-shakes' },
            { name: 'Banana Whey Shake', price: '₹229', bottle: 'new_yellow', fruits: ['banana', 'whey', 'honey', 'milk'], rating: '4.8', reviews: '+20', ingredients: 'Whey, Banana, Milk, Honey', subCategory: 'whey-shakes' },
            { name: 'Blue Berry Whey Shake', price: '₹229', bottle: 'orig_red', fruits: ['blueberry', 'whey', 'honey', 'milk'], rating: '4.9', reviews: '+35', ingredients: 'Whey, Blueberry, Milk, Honey', subCategory: 'whey-shakes' },
            { name: 'Almond Banana Whey Shake', price: '₹229', bottle: 'smoothie', fruits: ['banana', 'coconut', 'whey', 'almonds'], rating: '4.8', reviews: '+26', ingredients: 'Whey, Banana, Coconut Water, Raw Almonds', subCategory: 'whey-shakes' },
            { name: 'Big Hit Whey Shake', price: '₹229', bottle: 'new_dark_orange', fruits: ['coconut', 'whey', 'espresso', 'almonds', 'honey'], rating: '4.7', reviews: '+11', ingredients: 'Whey, Espresso, Coconut Water, Raw Almonds, Honey', subCategory: 'whey-shakes' },
            { name: 'Girl Power Whey Shake', price: '₹229', bottle: 'new_red', fruits: ['banana', 'strawberry', 'whey', 'honey', 'milk'], rating: '4.8', reviews: '+18', ingredients: 'Whey, Strawberry, Banana, Milk, Honey', subCategory: 'whey-shakes' },
            { name: 'Mango Banana Whey Shake', price: '₹229', bottle: 'new_orange', fruits: ['banana', 'mango', 'whey', 'honey', 'milk'], rating: '4.9', reviews: '+24', ingredients: 'Whey, Banana, Mango, Milk, Honey', subCategory: 'whey-shakes' },
            { name: 'Fruit Lab Special Whey Shake', price: '₹229', bottle: 'new_yellow', fruits: ['banana', 'avocado', 'whey', 'almonds', 'honey'], rating: '4.8', reviews: '+16', ingredients: 'Whey, Avocado, Banana, Raw Almonds, Honey', subCategory: 'whey-shakes' }
        ],
        'bowls-puddings': [
            { name: 'Just Oatmeal Seasonal', price: '₹149', bottle: 'yellow', fruits: ['apple', 'banana', 'milk', 'oats'], rating: '4.7', reviews: '+10', ingredients: 'Apple, Banana, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'just_oatmeal_seasonal.jpg' },
            { name: 'Raw Cocoa Oatmeal', price: '₹149', bottle: 'red', fruits: ['apple', 'banana', 'milk', 'oats', 'cocoa'], rating: '4.8', reviews: '+22', ingredients: 'Apple, Banana, Raw Cocoa, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'raw_cocoa_oatmeal.jpg' },
            { name: 'Coffee Oatmeal', price: '₹149', bottle: 'yellow', fruits: ['apple', 'banana', 'espresso', 'milk', 'oats'], rating: '4.8', reviews: '+16', ingredients: 'Apple, Banana, Espresso, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'coffee_oatmeal.jpg' },
            { name: 'Choco Almond Oatmeal', price: '₹169', bottle: 'red', fruits: ['almonds', 'milk', 'oats', 'cocoa'], rating: '4.9', reviews: '+31', ingredients: 'Almonds, Cocoa Powder, Dark Chocolate, Rolled Oats, Milk', subCategory: 'oats-bowls', image: 'choco_almond_oatmeal.jpg' },
            { name: 'Ash Gourd Juice', price: '₹59', bottle: 'new_yellow', fruits: ['cucumber'], rating: '4.6', reviews: '+8', ingredients: '100% Pure Ash Gourd Juice', subCategory: 'pure-juices' },
            { name: 'Watermelon Juice', price: '₹69', bottle: 'orig_red', fruits: ['watermelon'], rating: '4.9', reviews: '+67', ingredients: '100% Pure Watermelon Juice', subCategory: 'pure-juices' },
            { name: 'Pineapple Juice', price: '₹99', bottle: 'orig_yellow', fruits: ['apple', 'pineapple'], rating: '4.8', reviews: '+28', ingredients: '100% Pure Pineapple Juice', subCategory: 'pure-juices' },
            { name: 'Muskmelon Juice', price: '₹99', bottle: 'new_yellow', fruits: ['muskmelon'], rating: '4.7', reviews: '+19', ingredients: '100% Pure Muskmelon Juice', subCategory: 'pure-juices' },
            { name: 'Beetroot Juice', price: '₹99', bottle: 'orig_red', fruits: ['beetroot'], rating: '4.8', reviews: '+24', ingredients: '100% Pure Beetroot Juice', subCategory: 'pure-juices' },
            { name: 'Carrot Juice', price: '₹119', bottle: 'new_dark_orange', fruits: ['carrot'], rating: '4.9', reviews: '+36', ingredients: '100% Pure Carrot Juice', subCategory: 'pure-juices' },
            { name: 'Papaya Plate', price: '₹119', bottle: 'orig_orange', fruits: ['papaya'], rating: '4.6', reviews: '+15', ingredients: 'Freshly Cut Papaya Slices', subCategory: 'pure-juices' },
            { name: 'Orange Juice', price: '₹169', bottle: 'orig_orange', fruits: ['orange'], rating: '4.9', reviews: '+48', ingredients: '100% Pure Imported Citrus Orange', subCategory: 'pure-juices' },
            { name: 'Apple Juice', price: '₹189', bottle: 'orig_yellow', fruits: ['apple'], rating: '4.8', reviews: '+22', ingredients: '100% Pure Royal Gala Apple Juice', subCategory: 'pure-juices' },
            { name: 'Chia Pudding Seasonal', price: '₹149', bottle: 'yellow', fruits: ['banana', 'honey', 'milk', 'chia', 'seeds'], rating: '4.8', reviews: '+13', ingredients: 'Chia Seeds, Milk, Banana, Honey', subCategory: 'chia-puddings', image: 'chia_pudding_seasonal.jpg' },
            { name: 'Coffee Chia Pudding', price: '₹149', bottle: 'yellow', fruits: ['banana', 'espresso', 'milk', 'chia', 'seeds'], rating: '4.7', reviews: '+9', ingredients: 'Chia Seeds, Milk, Espresso, Banana', subCategory: 'chia-puddings', image: 'coffee_chia_pudding.png' },
            { name: 'Raw Cocoa Chia Pudding', price: '₹149', bottle: 'red', fruits: ['banana', 'milk', 'chia', 'cocoa', 'seeds'], rating: '4.8', reviews: '+17', ingredients: 'Raw Cocoa, Chia Seeds, Milk, Banana', subCategory: 'chia-puddings', image: 'raw_cocoa_chia_pudding.jpg' },
            { name: 'Mango Chia Pudding', price: '₹149', bottle: 'yellow', fruits: ['mango', 'honey', 'milk', 'chia', 'seeds'], rating: '4.9', reviews: '+18', ingredients: 'Chia Seeds, Milk, Alphonso Mango, Honey', subCategory: 'chia-puddings', image: 'mango_chia_pudding.jpeg' }
        ],
        'healthy-bites': [
            { name: 'Veg Sandwich', price: '₹89', bottle: 'yellow', fruits: ['vegetables', 'grain'], rating: '4.6', reviews: '+23', ingredients: 'Fresh Vegetables on Whole Grain Bread', subCategory: 'sandwiches-toasts', image: 'veg_sandwich.jpg' },
            { name: 'Bombay Sandwich', price: '₹89', bottle: 'orange', fruits: ['mint', 'potato'], rating: '4.7', reviews: '+34', ingredients: 'Bombay Spiced Potato & Mint Toastie', subCategory: 'sandwiches-toasts', image: 'bombay_sandwich.jpg' },
            { name: 'Corn Spinach Cheese Toast', price: '₹129', bottle: 'yellow', fruits: ['spinach', 'cheese', 'corn'], rating: '4.8', reviews: '+41', ingredients: 'Golden Corn, Spinach & Low Fat Cheese', subCategory: 'sandwiches-toasts', image: 'corn_spinach_cheese_toast.jpg' },
            { name: 'Weight Gain Fruit Bowl', price: '₹99', bottle: 'orange', fruits: ['banana', 'coconut', 'almonds', 'dates', 'honey'], rating: '4.8', reviews: '+14', ingredients: 'Banana, Coconut, Raw Almonds, Honey, Dates', subCategory: 'plant-milks-bowls', image: 'weight_gain_fruit_bowl.jpg' },
            { name: 'Weight Loss Fruit Bowl', price: '₹99', bottle: 'yellow', fruits: ['apple', 'pineapple', 'mint', 'lemon', 'chia', 'seeds'], rating: '4.9', reviews: '+28', ingredients: 'Pineapple, Apple, Lemon, Mint, Chia Seeds', subCategory: 'plant-milks-bowls', image: 'weight_loss_fruit_bowl.png' },
            { name: 'Fruit Lab Special Bowl', price: '₹149', bottle: 'red', fruits: ['apple', 'kiwi', 'chia', 'berries', 'seeds'], rating: '4.9', reviews: '+52', ingredients: 'Exotic Berries, Kiwi, Apple, Chia Seeds', subCategory: 'plant-milks-bowls', image: 'fruit_lab_special_bowl.jpg' },
            { name: 'Power Seeds Brick', price: '₹49', bottle: 'red', fruits: ['dates', 'oats', 'seeds'], rating: '4.8', reviews: '+8', ingredients: 'Raw Seeds, Dates, Oatmeal Bound Bar', subCategory: 'energy-protein-bars', image: 'power_seeds_brick.jpg' },
            { name: 'Peanut Bar', price: '₹69', bottle: 'yellow', fruits: ['almonds', 'honey', 'oats', 'peanuts'], rating: '4.7', reviews: '+15', ingredients: 'Roasted Peanuts, Honey, Rolled Oats', subCategory: 'energy-protein-bars', image: 'peanut_bar.jpg' },
            { name: 'Choco Almond Protein', price: '₹99', bottle: 'red', fruits: ['whey', 'almonds', 'honey', 'cocoa'], rating: '4.9', reviews: '+39', ingredients: 'Raw Cocoa, Almonds, Whey Protein, Honey', subCategory: 'energy-protein-bars', image: 'choco_almond_protein.jpg' }
        ]
    };

    // --- Dark Mode Detect & Auto Setup ---
    document.body.classList.add('dark-mode');

    // --- Mobile Responsive Navbar Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Reset open dropdowns on close
            if (!navMenu.classList.contains('active')) {
                const parent = document.querySelector('.nav-item.dropdown');
                if (parent) parent.classList.remove('open');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Dropdown Toggle Logic for mobile viewport
            if (link.classList.contains('dropdown-toggle')) {
                if (window.innerWidth <= 768) {
                    const parent = link.parentElement;
                    if (!parent.classList.contains('open')) {
                        e.preventDefault();
                        parent.classList.add('open');
                        return; // Stop here so it doesn't close the menu
                    }
                }
            }

            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            
            const parent = document.querySelector('.nav-item.dropdown');
            if (parent) parent.classList.remove('open');

            // Set active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            const parent = document.querySelector('.nav-item.dropdown');
            if (parent) parent.classList.remove('open');
        });
    });

    // --- CTA Buttons Interactivity ---
    const noSugarBtn = document.getElementById('no-sugar-btn');
    const coldPressedBtn = document.getElementById('cold-pressed-btn');

    if (noSugarBtn) {
        noSugarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const menuSection = document.getElementById('menu-section');
            if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
            
            const detoxTab = document.querySelector('.category-tab-btn[data-category="dear-self"]');
            if (detoxTab) {
                setTimeout(() => detoxTab.click(), 400);
            }
        });
    }

    if (coldPressedBtn) {
        coldPressedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const menuSection = document.getElementById('menu-section');
            if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
            
            const juicesTab = document.querySelector('.category-tab-btn[data-category="juices-smoothies"]');
            if (juicesTab) {
                setTimeout(() => juicesTab.click(), 400);
            }
        });
    }

    // --- Sticky Scroll Navbar ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Hero Section 3D Mouse Parallax (Dual Bottles & Fruits) ---
    const heroVisual = document.getElementById('hero-visual');
    const bottleLeftImg = document.getElementById('hero-bottle-left');
    const bottleRightImg = document.getElementById('hero-bottle-right');
    const bottleCenterImg = document.getElementById('hero-bottle-center');
    const heroGlow = document.getElementById('hero-glow');
    const staticFruits = document.querySelectorAll('.fruit-layer-item');

    if (heroVisual && typeof gsap !== 'undefined') {
        window.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5);
            const mouseY = (e.clientY / window.innerHeight - 0.5);

            // Left bottle image (background depth translation & rotation)
            if (bottleLeftImg) {
                gsap.to(bottleLeftImg, {
                    x: mouseX * 40,
                    y: mouseY * 40,
                    rotateY: mouseX * 12,
                    rotateX: -mouseY * 12,
                    duration: 1,
                    ease: 'power2.out'
                });
            }

            // Right bottle image (background depth translation & rotation)
            if (bottleRightImg) {
                gsap.to(bottleRightImg, {
                    x: mouseX * 50,
                    y: mouseY * 50,
                    rotateY: mouseX * 15,
                    rotateX: -mouseY * 15,
                    duration: 1.1,
                    ease: 'power2.out'
                });
            }

            // Center bottle image (foreground depth translation & rotation)
            if (bottleCenterImg) {
                gsap.to(bottleCenterImg, {
                    x: mouseX * 80,
                    y: mouseY * 80,
                    rotateY: mouseX * 25,
                    rotateX: -mouseY * 25,
                    duration: 1.2,
                    ease: 'power2.out'
                });
            }

            // Floating fruits background parallax based on depth attributes
            staticFruits.forEach(fruit => {
                const depth = parseFloat(fruit.getAttribute('data-depth')) || 0.5;
                gsap.to(fruit, {
                    x: mouseX * depth * 90,
                    y: mouseY * depth * 90,
                    rotation: mouseX * depth * 60,
                    duration: 1.2 + depth * 0.4,
                    ease: 'power1.out'
                });
            });

            // Ambient background glow translation
            if (heroGlow) {
                gsap.to(heroGlow, {
                    x: mouseX * 20,
                    y: mouseY * 20,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    // --- Spawning Hero Splash Particles ---
    const visualParticles = document.getElementById('visual-particles');

    function spawnHeroParticles(flavor) {
        if (!visualParticles) return;
        visualParticles.innerHTML = ''; // Clear past particles
        // Spawning disabled to prevent fruit duplication (strictly keeping one picture per item)
        return;
    }

    // Initialize particles for default orange flavor
    if (visualParticles) {
        spawnHeroParticles('orange');
    }

    // --- Slider Card Navigation & Hero Switcher ---
    const cards = document.querySelectorAll('.menu-card');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const sliderTrack = document.getElementById('slider-track');
    let activeCardIndex = 1; // Start with center card active

    function swapHeroBottles(flavor) {
        if (typeof gsap === 'undefined') return;

        // Map the 8 card bottle codes back to the 4 hero colors
        let baseColor = 'orange';
        if (flavor.includes('red')) {
            baseColor = 'red';
        } else if (flavor.includes('orange')) {
            baseColor = 'orange';
        } else if (flavor.includes('yellow')) {
            baseColor = 'yellow';
        } else if (flavor.includes('smoothie')) {
            baseColor = 'smoothie';
        }

        let centerFlavor = baseColor;
        let leftFlavor = 'orange';
        let rightFlavor = 'yellow';

        if (baseColor === 'orange') {
            leftFlavor = 'red';
            rightFlavor = 'yellow';
        } else if (baseColor === 'yellow') {
            leftFlavor = 'orange';
            rightFlavor = 'red';
        } else if (baseColor === 'red' || baseColor === 'smoothie') {
            leftFlavor = 'orange';
            rightFlavor = 'yellow';
        }

        // Center Bottle
        if (bottleCenterImg) {
            gsap.to(bottleCenterImg, {
                scale: 0.4,
                rotation: 45,
                opacity: 0,
                duration: 0.35,
                onComplete: () => {
                    bottleCenterImg.src = `assets/${centerFlavor}_bottle_transparent.png?v=70`;
                    gsap.to(bottleCenterImg, {
                        scale: 1,
                        rotation: 2,
                        opacity: 1,
                        duration: 0.7,
                        ease: 'back.out(1.4)'
                    });
                }
            });
        }

        // Left Bottle
        if (bottleLeftImg) {
            gsap.to(bottleLeftImg, {
                scale: 0.4,
                rotation: -45,
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    bottleLeftImg.src = `assets/${leftFlavor}_bottle_transparent.png?v=70`;
                    gsap.to(bottleLeftImg, {
                        scale: 1,
                        rotation: -12,
                        opacity: 1,
                        duration: 0.75,
                        ease: 'back.out(1.2)'
                    });
                }
            });
        }

        // Right Bottle
        if (bottleRightImg) {
            gsap.to(bottleRightImg, {
                scale: 0.4,
                rotation: 45,
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    bottleRightImg.src = `assets/${rightFlavor}_bottle_transparent.png?v=70`;
                    gsap.to(bottleRightImg, {
                        scale: 1,
                        rotation: 12,
                        opacity: 1,
                        duration: 0.75,
                        ease: 'back.out(1.2)'
                    });
                }
            });
        }

        // Change ambient background glow behind the bottles
        if (heroGlow && colors[flavor]) {
            gsap.to(heroGlow, {
                background: colors[flavor].glow,
                duration: 0.8
            });
        }

        // Update order button styling if button exists
        const orderBtn = document.querySelector('.hero-cta .btn-noka');
        if (orderBtn && colors[flavor]) {
            gsap.to(orderBtn, {
                borderColor: colors[flavor].theme,
                duration: 0.5
            });
        }
    }

    function updateActiveCard(index) {
        if (index < 0 || index >= cards.length || typeof gsap === 'undefined') return;
        
        cards.forEach(c => c.classList.remove('active'));
        cards[index].classList.add('active');
        activeCardIndex = index;

        const flavor = cards[index].getAttribute('data-flavor');
        swapHeroBottles(flavor);

        // Spawn corresponding flavor particles
        spawnHeroParticles(flavor);
    }

    // --- Dynamic Slider (Carousel) State ---
    let currentScrollOffset = 0;

    const starItems = new Set([
        'Glowing Skin',
        'Small Waist',
        'Energy Boost',
        'Iron Rich',
        'Super Green',
        'Oxygen Juice',
        'Feel good',
        'Jungle Juice',
        'Berry Treasure',
        'Summer Set',
        'Date Me',
        'Coffee Smoothie',
        'Blue Berry Whey Shake',
        'Mango Banana Whey Shake',
        'Choco Almond Protein',
        'Fruit Lab Special Bowl'
    ]);

    function createCardElement(item, isActive) {
        // Calculate dietary/calories dynamically
        let calories = '120 kcal';
        let dairyText = 'Dairy Free';
        let glutenText = 'Gluten Free';
        let dairyIcon = 'fa-solid fa-bottle-water';
        let glutenIcon = 'fa-solid fa-wheat-awn';

        const nameLower = item.name.toLowerCase();
        const ingLower = item.ingredients.toLowerCase();
        const subCat = item.subCategory || '';
        const isStar = starItems.has(item.name);

        // Calorie logic
        if (subCat === 'whey-shakes') {
            calories = '240 kcal';
        } else if (nameLower.includes('oatmeal') || nameLower.includes('pudding')) {
            calories = '190 kcal';
        } else if (subCat === 'smoothies') {
            calories = '160 kcal';
        } else if (nameLower.includes('sandwich') || nameLower.includes('toast')) {
            calories = '180 kcal';
        } else {
            calories = '110 kcal';
        }

        // Dairy logic
        if (ingLower.includes('milk') || ingLower.includes('whey') || ingLower.includes('cheese') || nameLower.includes('whey')) {
            dairyText = 'Contains Dairy';
        } else {
            dairyText = 'Dairy Free';
        }

        // Gluten logic
        if (ingLower.includes('oats') || ingLower.includes('bread') || nameLower.includes('toast') || nameLower.includes('sandwich')) {
            glutenText = 'Gluten Alert';
        } else {
            glutenText = 'Gluten Free';
        }

        const dairyClass = dairyText === 'Dairy Free' ? 'badge-free' : 'badge-alert';
        const glutenClass = glutenText === 'Gluten Free' ? 'badge-free' : 'badge-alert';
        const caloriesVal = calories.split(' ')[0];

        const card = document.createElement('div');
        card.className = `menu-card card-${item.bottle} ${isActive ? 'active' : ''}`;
        card.setAttribute('data-flavor', item.bottle);
        
        // Build fruit particles background behind the bottle in the card (exactly 6 particles)
        let fruitsHTML = '';
        if (item.fruits) {
            const cardFruits = [...item.fruits];
            // Repeat the item's own ingredients to reach exactly 6 particles as requested by the user
            const originalFruits = [...item.fruits];
            if (originalFruits.length > 0) {
                while (cardFruits.length < 6) {
                    cardFruits.push(originalFruits[cardFruits.length % originalFruits.length]);
                }
            }
            cardFruits.forEach((fruit, fIdx) => {
                const imgTag = fruitSVGs[fruit] || fruitSVGs['leaf'];
                fruitsHTML += `<div class="card-fruit-particle cfp-${fIdx + 1}">${imgTag}</div>`;
            });
        }

        card.innerHTML = `
            ${isStar ? `<div class="menu-card-star-badge"><i class="fa-solid fa-crown"></i> Bestseller</div>` : ''}
            <div class="card-fruits-background">
                ${fruitsHTML}
            </div>
            <div class="card-image-wrapper">
                ${item.image 
                    ? `<img src="assets/${item.image}?v=70" alt="${item.name}" class="card-product-image card-food-image">`
                    : `<img src="assets/card_${item.bottle}_bottle.png?v=70" alt="${item.name}" class="card-product-image">`
                }
                <button class="card-action-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="card-body">
                <h3 class="card-item-title">${item.name}</h3>
                <div class="card-item-ingredients">(${item.ingredients})</div>
                <div class="card-meta">
                    <div class="customer-avatars">
                        <span class="avatar av-1"></span>
                        <span class="avatar av-2"></span>
                        <span class="avatar av-3"></span>
                        <span class="avatar-plus">${item.reviews}</span>
                    </div>
                    <div class="card-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${item.rating}</span>
                    </div>
                </div>
                <div class="card-badges">
                    <div class="card-badge-item badge-cal">
                        <div class="badge-circle">
                            <i class="fa-solid fa-arrow-down" style="font-size: 8px;"></i>
                            <span>${caloriesVal}</span>
                        </div>
                        <div class="badge-label">${caloriesVal} kcal</div>
                    </div>
                    <div class="card-badge-item ${dairyClass}">
                        <div class="badge-circle">
                            <i class="${dairyIcon}"></i>
                        </div>
                        <div class="badge-label">${dairyText}</div>
                    </div>
                    <div class="card-badge-item ${glutenClass}">
                        <div class="badge-circle">
                            <i class="${glutenIcon}"></i>
                        </div>
                        <div class="badge-label">${glutenText}</div>
                    </div>
                </div>
                <div class="card-price-badge">${item.price}</div>
            </div>
        `;

        // Click handler to select and update active card & hero theme
        card.addEventListener('click', () => {
            document.querySelectorAll('.menu-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            swapHeroBottles(item.bottle);
            spawnHeroParticles(item.bottle);
        });

        return card;
    }

    // Render Menu Cards dynamically
    function renderMenuCards(category, searchQuery = '') {
        const track = document.getElementById('slider-track');
        if (!track) return;
        
        track.innerHTML = '';
        
        // Reset translation
        track.style.transform = 'translateX(0px)';
        currentScrollOffset = 0;

        const sliderViewport = document.getElementById('slider-viewport');
        const sliderWrapper = document.querySelector('.featured-slider-wrapper');

        let items = fullMenuData[category] || [];
        
        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            items = items.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.ingredients.toLowerCase().includes(query)
            );
        }
        
        if (items.length === 0) {
            track.innerHTML = `<div class="no-results-msg" style="padding: 40px; color: #888; font-size: 18px; font-weight: 600; width: 100%; text-align: center;">No items found matching "${searchQuery}"</div>`;
            if (sliderViewport) sliderViewport.classList.remove('grid-layout');
            if (sliderWrapper) sliderWrapper.classList.remove('grid-active');
            return;
        }

        // Configuration mapping category to its columns layout
        const categoryCols = {
            'juices-smoothies': {
                'fruit-juices': { title: 'Fruit Juices', element: document.createElement('div') },
                'smoothies': { title: 'Smoothies', element: document.createElement('div') },
                'whey-shakes': { title: 'Whey Protein Shakes', element: document.createElement('div') }
            },
            'dear-self': {
                'detox-cleanse': { title: 'Detox & Cleanse', element: document.createElement('div') },
                'glow-energy': { title: 'Glow & Energy', element: document.createElement('div') },
                'blood-vitality': { title: 'Blood & Vitality', element: document.createElement('div') }
            },
            'bowls-puddings': {
                'oats-bowls': { title: 'Rolled Oats Bowls', element: document.createElement('div') },
                'pure-juices': { title: 'Just Nature', element: document.createElement('div') },
                'chia-puddings': { title: 'Superfood Chia Puddings', element: document.createElement('div') }
            },
            'healthy-bites': {
                'sandwiches-toasts': { title: 'Sandwiches & Toasts', element: document.createElement('div') },
                'plant-milks-bowls': { title: 'Fruit Bowls', element: document.createElement('div') },
                'energy-protein-bars': { title: 'Energy & Protein Bars', element: document.createElement('div') }
            }
        };

        const cols = categoryCols[category];

        if (cols) {
            if (sliderViewport) sliderViewport.classList.add('grid-layout');
            if (sliderWrapper) sliderWrapper.classList.add('grid-active');

            for (const key in cols) {
                cols[key].element.className = 'menu-column';
                cols[key].element.id = `col-${key}`;
                
                const header = document.createElement('div');
                header.className = 'column-header';
                header.innerText = cols[key].title;
                cols[key].element.appendChild(header);
            }

            let renderedCount = 0;
            items.forEach((item) => {
                const subCat = item.subCategory;
                if (!cols[subCat]) return;

                const card = createCardElement(item, renderedCount === 0 && !searchQuery);
                cols[subCat].element.appendChild(card);
                renderedCount++;
            });

            // Append columns that have items
            for (const key in cols) {
                const cardCount = cols[key].element.querySelectorAll('.menu-card').length;
                if (cardCount > 0 || !searchQuery) {
                    track.appendChild(cols[key].element);
                }
            }
        } else {
            // Fallback horizontal layout
            if (sliderViewport) sliderViewport.classList.remove('grid-layout');
            if (sliderWrapper) sliderWrapper.classList.remove('grid-active');

            items.forEach((item, idx) => {
                const isActive = idx === 0 && !searchQuery;
                const card = createCardElement(item, isActive);
                track.appendChild(card);
            });
        }

        // Stagger fade-in animation using GSAP
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(track.querySelectorAll('.menu-card'));
            gsap.fromTo(track.querySelectorAll('.menu-card'), 
                { opacity: 0, scale: 0.85, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
            );
        }

        // Diagnostic Logging
        const allCards = document.querySelectorAll('.menu-card');
        fetch(`/log-error?msg=${encodeURIComponent(`DOM Diagnosis: Category: ${category}, Total cards=${allCards.length}`)}`);
    }

    // Scroll slider functionality
    function slideMenu(direction) {
        const track = document.getElementById('slider-track');
        const viewport = document.getElementById('slider-viewport');
        if (!track || !viewport) return;

        const trackWidth = track.scrollWidth;
        const viewportWidth = viewport.clientWidth;
        const maxOffset = Math.max(0, trackWidth - viewportWidth);

        const step = 312; // Card width (280) + gap (32)

        if (direction === 'next') {
            currentScrollOffset = Math.min(currentScrollOffset + step, maxOffset);
        } else {
            currentScrollOffset = Math.max(currentScrollOffset - step, 0);
        }

        track.style.transform = `translateX(-${currentScrollOffset}px)`;
    }

    // Initialize Category Tabs & search inputs
    const categoryTabBtns = document.querySelectorAll('.category-tab-btn');
    const menuSearchInput = document.getElementById('menu-search-input');

    if (categoryTabBtns.length > 0) {
        categoryTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');
                if (menuSearchInput) menuSearchInput.value = ''; // Reset search on tab change
                renderMenuCards(category);
            });
        });
    }

    if (menuSearchInput) {
        menuSearchInput.addEventListener('input', (e) => {
            const activeTab = document.querySelector('.category-tab-btn.active');
            const category = activeTab ? activeTab.getAttribute('data-category') : 'dear-self';
            renderMenuCards(category, e.target.value);
        });
    }

    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => slideMenu('prev'));
    }
    if (sliderNext) {
        sliderNext.addEventListener('click', () => slideMenu('next'));
    }

    // Modal popup scanned menu boards integration
    const openBoardBtn = document.getElementById('open-board-btn');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');

    const menuBoardImages = {
        'dear-self': 'assets/menu_2.png',
        'juices-smoothies': 'assets/menu_4.png',
        'bowls-puddings': 'assets/menu_3.png',
        'healthy-bites': 'assets/menu_1.png'
    };

    if (openBoardBtn && lightboxModal && lightboxImg) {
        openBoardBtn.addEventListener('click', () => {
            const activeTabBtn = document.querySelector('.category-tab-btn.active');
            if (activeTabBtn) {
                const activeCat = activeTabBtn.getAttribute('data-category');
                lightboxImg.src = menuBoardImages[activeCat];
                lightboxModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                lightboxModal.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- Dynamic Session Navbar Link & DB Menu Load ---
    function updateNavbarAndMenu() {
        // 1. Fetch Session Status to update navbar auth link
        fetch('/api/auth/session')
            .then(res => res.json())
            .then(data => {
                const authLink = document.getElementById('nav-auth-link');
                if (authLink) {
                    if (data.loggedIn) {
                        authLink.href = 'profile.html';
                        authLink.innerText = 'My Profile';
                    } else {
                        authLink.href = 'login.html';
                        authLink.innerText = 'Login';
                    }
                }
            })
            .catch(err => console.error("Session check failed:", err));

        // 2. Fetch Menu from database to dynamically overwrite fullMenuData
        fetch('/api/menu')
            .then(res => res.json())
            .then(data => {
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    Object.keys(data).forEach(key => {
                        fullMenuData[key] = data[key];
                    });
                }
                // Initial render of the active category
                const activeTab = document.querySelector('.category-tab-btn.active');
                const startCat = activeTab ? activeTab.getAttribute('data-category') : 'juices-smoothies';
                renderMenuCards(startCat);
            })
            .catch(err => {
                console.error("Menu load failed, falling back to static menu:", err);
                // Fallback rendering
                renderMenuCards('juices-smoothies');
            });
    }

    // Call updateNavbarAndMenu instead of calling renderMenuCards('juices-smoothies') directly
    updateNavbarAndMenu();

    // --- GSAP Entrance Reveals (ScrollTrigger) ---
    // Make sure libraries are loaded first
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Navbar slide-down
        if (document.querySelector('.navbar')) {
            gsap.from('.navbar', {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Hero content text stagger reveal
        if (document.querySelector('.animate-text')) {
            gsap.from('.animate-text', {
                x: -50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }

        // Hero bottles entrance reveal and floating loop
        const dualWrapper = document.querySelector('.dual-product-wrapper');
        const bottleLeftWrap = document.getElementById('bottle-left-wrap');
        const bottleRightWrap = document.getElementById('bottle-right-wrap');
        const bottleCenterWrap = document.getElementById('bottle-center-wrap');
        const shadowLeft = document.querySelector('.shadow-left');
        const shadowRight = document.querySelector('.shadow-right');
        const shadowCenter = document.querySelector('.shadow-center');
        const floatingFruitItems = document.querySelectorAll('.fruit-layer-item');
        
        if (dualWrapper && bottleLeftWrap && bottleRightWrap && bottleCenterWrap) {
            // Set initial offscreen/scaled down states
            gsap.set([bottleLeftWrap, bottleRightWrap, bottleCenterWrap], { scale: 0.4, opacity: 0, y: 80 });

            // Left/Back bottle entrance
            gsap.to(bottleLeftWrap, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.6,
                ease: 'back.out(1.3)',
                delay: 0.3,
                onComplete: () => {
                    // Left bottle infinite float
                    gsap.to(bottleLeftWrap, {
                        y: -18,
                        duration: 4.5,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }
            });

            // Right/Back bottle entrance
            gsap.to(bottleRightWrap, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.6,
                ease: 'back.out(1.3)',
                delay: 0.5,
                onComplete: () => {
                    // Right bottle infinite float
                    gsap.to(bottleRightWrap, {
                        y: 15,
                        duration: 3.8,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }
            });

            // Center/Front bottle entrance
            gsap.to(bottleCenterWrap, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.6,
                ease: 'back.out(1.5)',
                delay: 0.4,
                onComplete: () => {
                    // Center bottle infinite float
                    gsap.to(bottleCenterWrap, {
                        y: -12,
                        duration: 4.2,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true
                    });
                }
            });

            // Sync shadows to scaling down/up based on float height
            if (shadowLeft) {
                gsap.fromTo(shadowLeft, 
                    { scale: 0.9, opacity: 0.45 },
                    { 
                        scale: 0.7, 
                        opacity: 0.25, 
                        duration: 4.5, 
                        ease: 'sine.inOut', 
                        repeat: -1, 
                        yoyo: true 
                    }
                );
            }
            if (shadowRight) {
                gsap.fromTo(shadowRight, 
                    { scale: 0.9, opacity: 0.5 },
                    { 
                        scale: 0.7, 
                        opacity: 0.25, 
                        duration: 3.8, 
                        ease: 'sine.inOut', 
                        repeat: -1, 
                        yoyo: true 
                    }
                );
            }
            if (shadowCenter) {
                gsap.fromTo(shadowCenter, 
                    { scale: 0.95, opacity: 0.5 },
                    { 
                        scale: 0.75, 
                        opacity: 0.25, 
                        duration: 4.2, 
                        ease: 'sine.inOut', 
                        repeat: -1, 
                        yoyo: true 
                    }
                );
            }
        }

        // Float and rotate background static fruits infinitely
        if (floatingFruitItems.length > 0) {
            floatingFruitItems.forEach((fruit, idx) => {
                gsap.to(fruit, {
                    y: `-=${15 + idx * 4}`,
                    rotation: `+=${35 + idx * 10}`,
                    duration: (4 + idx * 0.5) * 1.1, // 10% slower
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true
                });
            });
        }

        // Initialize dynamic dither gradient canvas background
        initDitherGradient();

    }

    // --- Dynamic Dithered Gradient Background Canvas ---
    function initDitherGradient() {
        const canvas = document.getElementById('hero-gradient-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const offscreenCanvas = document.createElement('canvas');
        const offscreenCtx = offscreenCanvas.getContext('2d');

        // Set offscreen resolution (low-res for pixelated/dithered blocky color look)
        offscreenCanvas.width = 320;
        offscreenCanvas.height = 180;

        // Props matching the request
        const colorFrom = "#f97316";
        const colorMid = "#ef4444";
        const colorTo = "#be185d";
        const intensity = 0.2;
        const speed = 4;
        const baseAngle = 120; // 120 degrees

        // Generate noise pattern once (128x128 high-res repeating grain)
        const noiseCanvas = document.createElement('canvas');
        noiseCanvas.width = 128;
        noiseCanvas.height = 128;
        const noiseCtx = noiseCanvas.getContext('2d');
        const imgData = noiseCtx.createImageData(128, 128);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            const val = Math.floor(Math.random() * 255);
            data[i] = val;     // R
            data[i + 1] = val; // G
            data[i + 2] = val; // B
            data[i + 3] = intensity * 255; // A (controls dithering intensity)
        }
        noiseCtx.putImageData(imgData, 0, 0);
        const noisePattern = ctx.createPattern(noiseCanvas, 'repeat');

        // Handle resizing
        function resize() {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        let time = 0;
        let animationFrameId = null;
        let isVisible = true;

        function draw() {
            if (!isVisible) {
                animationFrameId = null;
                return;
            }
            if (canvas.width === 0 || canvas.height === 0) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }
            time += 0.001 * speed;

            const w = offscreenCanvas.width;
            const h = offscreenCanvas.height;
            const cx = w / 2;
            const cy = h / 2;
            
            // Calculate a slowly swaying angle around baseAngle (120 degrees)
            const angleRad = ((baseAngle + Math.sin(time * 0.8) * 15) * Math.PI) / 180;
            const r = Math.sqrt(w * w + h * h) / 2;

            // Gradient line endpoints
            const x0 = cx - Math.cos(angleRad) * r;
            const y0 = cy - Math.sin(angleRad) * r;
            const x1 = cx + Math.cos(angleRad) * r;
            const y1 = cy + Math.sin(angleRad) * r;

            // Draw fluid-moving linear gradient stops
            const grad = offscreenCtx.createLinearGradient(x0, y0, x1, y1);
            
            // Slowly shift stop offsets to create fluid waves
            const stopOffset = Math.sin(time * 1.5) * 0.08;
            grad.addColorStop(0, colorFrom);
            grad.addColorStop(0.5 + stopOffset, colorMid);
            grad.addColorStop(1, colorTo);

            offscreenCtx.fillStyle = grad;
            offscreenCtx.fillRect(0, 0, w, h);

            // Add moving color wave blobs inside the low-res space for extra organic fluid feel
            // Blob 1 (Orange glow moving top-left)
            const b1x = w * (0.3 + Math.sin(time * 1.2) * 0.15);
            const b1y = h * (0.3 + Math.cos(time * 0.9) * 0.15);
            const b1r = Math.min(w, h) * 0.75;
            const g1 = offscreenCtx.createRadialGradient(b1x, b1y, 0, b1x, b1y, b1r);
            g1.addColorStop(0, 'rgba(249, 115, 22, 0.45)');
            g1.addColorStop(1, 'rgba(249, 115, 22, 0)');
            offscreenCtx.fillStyle = g1;
            offscreenCtx.fillRect(0, 0, w, h);

            // Blob 2 (Pink/Magenta glow moving bottom-right)
            const b2x = w * (0.7 + Math.cos(time * 0.8) * 0.15);
            const b2y = h * (0.7 + Math.sin(time * 1.3) * 0.15);
            const b2r = Math.min(w, h) * 0.85;
            const g2 = offscreenCtx.createRadialGradient(b2x, b2y, 0, b2x, b2y, b2r);
            g2.addColorStop(0, 'rgba(190, 24, 93, 0.5)');
            g2.addColorStop(1, 'rgba(190, 24, 93, 0)');
            offscreenCtx.fillStyle = g2;
            offscreenCtx.fillRect(0, 0, w, h);

            // Draw low-res offscreen canvas stretched on high-res canvas (creating pixelated layout)
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);

            // Overlay high-res repeating noise pattern (to create dithering effect)
            ctx.fillStyle = noisePattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(draw);
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
                if (isVisible && !animationFrameId) {
                    draw();
                }
            }, { threshold: 0.01 });
            observer.observe(canvas);
        } else {
            draw();
        }
    }

    // ==========================================================================
    // INSTAGRAM REELS INTERACTIVITY
    // ==========================================================================
    const reelCards = document.querySelectorAll('.reel-card');
    const reelsModal = document.getElementById('reels-modal');
    const reelsModalVideo = document.getElementById('reels-modal-video');
    const reelsModalClose = document.getElementById('reels-modal-close');
    const reelsCaptionText = document.getElementById('reels-modal-caption-text');
    const reelsCommentsList = document.getElementById('reels-comments-list');
    const reelsLikeBtn = document.getElementById('reels-like-btn');
    const reelsLikeIcon = document.getElementById('reels-like-icon');
    const reelsLikesCountNum = document.getElementById('reels-likes-count-num');
    const reelsCommentInput = document.getElementById('reels-comment-input');
    const reelsCommentPostBtn = document.getElementById('reels-comment-post-btn');

    let currentLikes = 124;
    let isLiked = false;

    const mockComments = {
        'pre-run-fuel': [
            { username: 'runner_pro', text: 'This looks so fresh! Sips of pure power 🏃‍♂️⚡', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
            { username: 'health_hq', text: 'Clean ingredients only, this is what I need before gym!', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80' },
            { username: 'fit_n_fine', text: 'Is this the orange beetroot blend? Looks fire.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }
        ],
        'liquid-gold': [
            { username: 'juicery_fan', text: 'Golden color is stunning. Absolute liquid sunshine! ☀️', avatar: 'https://images.unsplash.com/photo-1527983359383-4758693f760c?w=100&q=80' },
            { username: 'smoothie_queen', text: 'My morning routine isn\'t complete without one. 🥤💛', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' }
        ],
        'perfect-snack': [
            { username: 'surfer_life', text: 'Surf, sip, repeat. Best hydration combo!', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
            { username: 'dietitian_dan', text: 'Love the low glycemic load in this. Very clean.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
            { username: 'wanderlust', text: 'Beautiful location! Where is this?', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' }
        ],
        'daily-booster': [
            { username: 'daily_grind', text: 'This gets me through the afternoon slump!', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80' },
            { username: 'organic_life', text: 'No sugar added is the main reason I buy this.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80' }
        ]
    };

    // 1. Video Play/Pause on Hover
    reelCards.forEach(card => {
        const video = card.querySelector('video');
        
        card.addEventListener('mouseenter', () => {
            if (video) {
                video.play().catch(e => console.log("Video autoplay prevented: ", e));
            }
        });

        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
            }
        });

        // 2. Click to open modal
        card.addEventListener('click', () => {
            const videoSrc = card.getAttribute('data-video');
            const caption = card.getAttribute('data-caption') || '';
            const key = caption.toLowerCase().replace(/\s+/g, '-');

            if (reelsModal && reelsModalVideo) {
                // Configure modal details
                reelsModalVideo.src = videoSrc;
                reelsModalVideo.muted = false; // play with sound!
                reelsCaptionText.textContent = caption;
                
                // Set likes count randomly for realism
                currentLikes = Math.floor(Math.random() * 200) + 50;
                reelsLikesCountNum.textContent = currentLikes;
                isLiked = false;
                reelsLikeIcon.className = 'fa-regular fa-heart';
                reelsLikeIcon.style.color = '';

                // Load comments
                reelsCommentsList.innerHTML = '';
                const comments = mockComments[key] || [];
                comments.forEach(comment => {
                    addCommentToDOM(comment.username, comment.text, comment.avatar);
                });

                // Show modal
                reelsModal.classList.add('active');
                reelsModalVideo.play().catch(e => console.log(e));
            }
        });
    });

    // Helper to append a comment to the DOM
    function addCommentToDOM(username, text, avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80') {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <img src="${avatar}" alt="${username}" class="comment-avatar">
            <div class="comment-text-wrapper">
                <span class="reels-username" style="font-size: 13px; font-weight: 700;">${username}</span>
                <span class="comment-text" style="margin-left: 6px;">${text}</span>
            </div>
        `;
        reelsCommentsList.appendChild(commentItem);
        reelsCommentsList.scrollTop = reelsCommentsList.scrollHeight;
    }

    // Close Modal
    function closeModal() {
        if (reelsModal) {
            reelsModal.classList.remove('active');
            if (reelsModalVideo) {
                reelsModalVideo.pause();
                reelsModalVideo.src = '';
            }
        }
    }

    if (reelsModalClose) {
        reelsModalClose.addEventListener('click', closeModal);
    }

    if (reelsModal) {
        reelsModal.addEventListener('click', (e) => {
            if (e.target === reelsModal) {
                closeModal();
            }
        });
    }

    // Like Action Toggle
    if (reelsLikeBtn && reelsLikeIcon && reelsLikesCountNum) {
        reelsLikeBtn.addEventListener('click', () => {
            isLiked = !isLiked;
            if (isLiked) {
                currentLikes++;
                reelsLikeIcon.className = 'fa-solid fa-heart';
                reelsLikeIcon.style.color = '#F62440';
                
                // Add heart animation pulse effect
                reelsLikeIcon.parentElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    reelsLikeIcon.parentElement.style.transform = 'scale(1)';
                }, 200);
            } else {
                currentLikes--;
                reelsLikeIcon.className = 'fa-regular fa-heart';
                reelsLikeIcon.style.color = '';
            }
            reelsLikesCountNum.textContent = currentLikes;
        });
    }

    // Submit Comment Action
    function submitComment() {
        if (reelsCommentInput) {
            const text = reelsCommentInput.value.trim();
            if (text.length > 0) {
                addCommentToDOM('you', text, 'assets/new_logo_1.png');
                reelsCommentInput.value = '';
            }
        }
    }

    if (reelsCommentPostBtn) {
        reelsCommentPostBtn.addEventListener('click', submitComment);
    }

    if (reelsCommentInput) {
        reelsCommentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitComment();
            }
        });
    }

});



/* ==========================================================================
   GLOBAL SHOPPING CART & WHATSAPP CHECKOUT SYSTEM
   ========================================================================== */

(function() {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        /* Cart Drawer CSS */
        .cart-drawer-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(6px);
            z-index: 10000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .cart-drawer-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .cart-drawer {
            position: fixed;
            top: 0;
            right: -450px;
            width: 100%;
            max-width: 450px;
            height: 100%;
            background-color: #FFFAF3; /* Matching page background */
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
            z-index: 10001;
            display: flex;
            flex-direction: column;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cart-drawer-overlay.active .cart-drawer {
            right: 0;
        }
        .cart-header {
            padding: 24px;
            border-bottom: 1px solid rgba(246, 36, 64, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .cart-header h3 {
            font-family: var(--font-serif);
            font-size: 24px;
            color: #38000A;
            margin: 0;
        }
        .cart-close-btn {
            font-size: 28px;
            cursor: pointer;
            color: #38000A;
            transition: transform 0.2s ease;
        }
        .cart-close-btn:hover {
            transform: scale(1.1);
        }
        .cart-items-container {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .cart-empty-state {
            text-align: center;
            padding: 40px 0;
            color: #777;
        }
        .cart-empty-state i {
            font-size: 48px;
            color: rgba(246, 36, 64, 0.2);
            margin-bottom: 16px;
        }
        .cart-item {
            background: #fff;
            border: 1px solid rgba(246, 36, 64, 0.08);
            border-radius: 16px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        .cart-item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .cart-item-title {
            font-weight: 700;
            font-size: 16px;
            color: #38000A;
            margin: 0;
        }
        .cart-item-option {
            font-size: 13px;
            color: #777;
            margin: 2px 0 0 0;
        }
        .cart-item-meta {
            font-size: 12px;
            background: #FDF2F4;
            color: #F62440;
            padding: 4px 8px;
            border-radius: 6px;
            display: inline-block;
            align-self: flex-start;
        }
        .cart-item-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 6px;
        }
        .cart-item-price {
            font-weight: 700;
            color: #F62440;
        }
        .cart-qty-controls {
            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 30px;
            overflow: hidden;
            background: #fff;
        }
        .cart-qty-btn {
            width: 32px;
            height: 32px;
            border: none;
            background: transparent;
            cursor: pointer;
            font-size: 14px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }
        .cart-qty-btn:hover {
            background-color: #f5f5f5;
        }
        .cart-qty-val {
            width: 30px;
            text-align: center;
            font-size: 14px;
            font-weight: 700;
        }
        .cart-footer {
            padding: 24px;
            border-top: 1px solid rgba(246, 36, 64, 0.08);
            background: #fff;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .cart-subtotal {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            font-weight: 700;
            color: #38000A;
        }
        .cart-subtotal-price {
            color: #F62440;
            font-size: 22px;
        }
        .cart-checkout-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 8px;
        }
        .cart-input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid #ddd;
            background: #fafafa;
            font-size: 14px;
            outline: none;
            transition: border-color 0.3s;
        }
        .cart-input:focus {
            border-color: #F62440;
            background: #fff;
        }
        .cart-checkout-btn {
            width: 100%;
            padding: 14px;
            border-radius: 30px;
            border: none;
            background: #25D366; /* WhatsApp Green */
            color: #fff;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
            transition: all 0.3s ease;
        }
        .cart-checkout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(37, 211, 102, 0.45);
            background-color: #20ba59;
        }
        
        /* Floating Toast CSS */
        .cart-toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: #38000A;
            color: #fff;
            padding: 16px 24px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 16px;
            z-index: 10002;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 600;
        }
        .cart-toast.active {
            transform: translateX(-50%) translateY(0);
        }
        .cart-toast-btn {
            background: #FF9F1C;
            color: #fff;
            border: none;
            padding: 6px 14px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 700;
            transition: background-color 0.2s;
        }
        .cart-toast-btn:hover {
            background: #e08500;
        }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Structure
    const drawerOverlay = document.createElement('div');
    drawerOverlay.id = 'global-cart-drawer';
    drawerOverlay.className = 'cart-drawer-overlay';
    drawerOverlay.innerHTML = `
        <div class="cart-drawer">
            <div class="cart-header">
                <h3>My Subscriptions</h3>
                <i class="fa-solid fa-xmark cart-close-btn" id="cart-close-trigger"></i>
            </div>
            <div class="cart-items-container" id="cart-items-list">
                <!-- Dynamic Items -->
            </div>
            <div class="cart-footer">
                <div class="cart-subtotal">
                    <span>Subtotal:</span>
                    <span class="cart-subtotal-price" id="cart-subtotal-val">₹0</span>
                </div>
                <form class="cart-checkout-form" id="cart-checkout-form" onsubmit="event.preventDefault();">
                    <input type="text" id="checkout-name" class="cart-input" placeholder="Your Name" required>
                    <input type="tel" id="checkout-phone" class="cart-input" placeholder="WhatsApp Number" required>
                    <input type="text" id="checkout-address" class="cart-input" placeholder="Delivery Address" required>
                    <button type="submit" class="cart-checkout-btn" id="whatsapp-checkout-btn">
                        <i class="fa-brands fa-whatsapp"></i> Checkout via WhatsApp
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(drawerOverlay);

    // Inject Toast
    const toast = document.createElement('div');
    toast.id = 'global-cart-toast';
    toast.className = 'cart-toast';
    toast.innerHTML = `
        <span>Added to subscription cart!</span>
        <button class="cart-toast-btn" id="cart-toast-view-btn">View Cart</button>
    `;
    document.body.appendChild(toast);

    // 3. LocalStorage Operations
    function getCart() {
        try {
            return JSON.parse(localStorage.getItem('fruitlab_cart')) || [];
        } catch(e) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem('fruitlab_cart', JSON.stringify(cart));
        updateCartBadges();
    }

    function updateCartBadges() {
        const cart = getCart();
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        const badges = document.querySelectorAll('.cart-count');
        badges.forEach(b => {
            b.textContent = totalQty;
            b.style.display = totalQty > 0 ? 'flex' : 'none';
        });
    }

    // Exported function for page triggers
    window.addToGlobalCart = function(item) {
        const cart = getCart();
        const existing = cart.find(i => i.id === item.id);
        if (existing) {
            existing.qty += item.qty;
        } else {
            cart.push(item);
        }
        saveCart(cart);
        updateCartUI();
        
        // Trigger Toast
        toast.classList.add('active');
        setTimeout(() => toast.classList.remove('active'), 4000);
    };

    function updateQty(index, delta) {
        const cart = getCart();
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart(cart);
        updateCartUI();
    }

    function updateCartUI() {
        const cart = getCart();
        const list = document.getElementById('cart-items-list');
        const subtotalVal = document.getElementById('cart-subtotal-val');
        
        if (!list || !subtotalVal) return;
        
        list.innerHTML = '';
        
        if (cart.length === 0) {
            list.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fa-solid fa-shopping-basket"></i>
                    <p>Your subscription cart is empty</p>
                    <p style="font-size: 13px; color: #aaa; margin-top: 5px;">Choose a wellness plan to get started</p>
                </div>
            `;
            subtotalVal.textContent = '₹0';
            document.getElementById('cart-checkout-form').style.display = 'none';
            return;
        }
        
        document.getElementById('cart-checkout-form').style.display = 'flex';
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            subtotal += item.price * item.qty;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-header">
                    <div>
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-option">${item.option}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <span class="cart-item-meta">${item.size}</span>
                    <span class="cart-item-meta" style="background: #E8F5E9; color: #2E7D32;">${item.frequency}</span>
                </div>
                <div class="cart-item-footer">
                    <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn minus-btn" data-index="${index}">-</button>
                        <span class="cart-qty-val">${item.qty}</span>
                        <button class="cart-qty-btn plus-btn" data-index="${index}">+</button>
                    </div>
                </div>
            `;
            list.appendChild(itemElement);
        });
        
        subtotalVal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

        // Bind Qty Buttons
        list.querySelectorAll('.minus-btn').forEach(btn => {
            btn.onclick = () => updateQty(parseInt(btn.getAttribute('data-index')), -1);
        });
        list.querySelectorAll('.plus-btn').forEach(btn => {
            btn.onclick = () => updateQty(parseInt(btn.getAttribute('data-index')), 1);
        });
    }

    // 4. WhatsApp Checkout Logic
    function handleCheckout() {
        const name = document.getElementById('checkout-name').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim();
        const address = document.getElementById('checkout-address').value.trim();
        
        if (!name || !phone || !address) return;
        
        const cart = getCart();
        let itemsSummary = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            itemsSummary += `*${index + 1}. ${item.name}*\n`;
            itemsSummary += `   • Option: ${item.option}\n`;
            itemsSummary += `   • Size: ${item.size}\n`;
            itemsSummary += `   • Freq: ${item.frequency}\n`;
            itemsSummary += `   • Price: ₹${item.price.toLocaleString('en-IN')} x ${item.qty}\n\n`;
        });
        
        const message = 
`*New Subscription Order - Fruit Lab* 🍒

*Customer Details:*
• Name: ${name}
• Phone: ${phone}
• Address: ${address}

*Order Summary:*
${itemsSummary}*Total Subscription Amount: ₹${total.toLocaleString('en-IN')}*

Please confirm my subscription order. Thank you!`;

        const whatsappUrl = `https://wa.me/918639247573?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset Cart
        saveCart([]);
        updateCartUI();
        drawerOverlay.classList.remove('active');
        
        // Success notification
        alert("Redirecting to WhatsApp to send order details. Thank you!");
    }

    // 5. DOM Event Bindings
    function setupEvents() {
        updateCartBadges();
        updateCartUI();
        
        // Open/Close bindings
        const cartButtons = document.querySelectorAll('.nav-cart-btn');
        cartButtons.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                drawerOverlay.classList.add('active');
                updateCartUI();
            };
        });
        
        const closeBtn = document.getElementById('cart-close-trigger');
        if (closeBtn) {
            closeBtn.onclick = () => drawerOverlay.classList.remove('active');
        }
        
        drawerOverlay.onclick = (e) => {
            if (e.target === drawerOverlay) drawerOverlay.classList.remove('active');
        };

        const viewCartBtn = document.getElementById('cart-toast-view-btn');
        if (viewCartBtn) {
            viewCartBtn.onclick = () => {
                toast.classList.remove('active');
                drawerOverlay.classList.add('active');
                updateCartUI();
            };
        }

        const checkoutForm = document.getElementById('cart-checkout-form');
        if (checkoutForm) {
            checkoutForm.onsubmit = (e) => {
                e.preventDefault();
                handleCheckout();
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEvents);
    } else {
        setupEvents();
    }
})();


    // --- Page Loader Hide Action ---
    const hidePageLoader = () => {
        const loader = document.getElementById('page-loader');
        if (loader && !loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
        }
    };

    if (document.readyState === 'complete') {
        hidePageLoader();
    } else {
        window.addEventListener('load', hidePageLoader);
    }

    // Safety timeout fallback (1.5 seconds)
    setTimeout(hidePageLoader, 1500);


    // --- Subscription Popup Modal System ---
    if (!window.location.pathname.includes('subscriptions.html') && localStorage.getItem('fruit-lab-popup-shown') !== 'true') {
        const popupOverlay = document.createElement('div');
        popupOverlay.id = 'subscription-popup';
        popupOverlay.className = 'sub-popup-overlay';
        popupOverlay.innerHTML = `
            <div class="sub-popup-content premium-layout">
                <button class="sub-popup-close" id="sub-popup-close-btn">&times;</button>
                <div class="sub-popup-grid">
                    <div class="sub-popup-media">
                        <img src="assets/all_five_bottles_real.jpg" alt="Fruit Lab Bottles" class="sub-popup-img-real">
                    </div>
                    <div class="sub-popup-info">
                        <div class="sub-popup-header-row">
                            <img src="assets/logo.png?v=70" alt="Fruit Lab Logo" class="sub-popup-logo">
                            <div class="sub-popup-badge"><i class="fa-solid fa-repeat"></i> Subscribe & Save</div>
                        </div>
                        <h3>Revitalize. Energize. Harmonize.</h3>
                        <p>Get fresh cold-pressed juices and wellness bowls delivered daily directly to your doorstep. Save 10% on every order!</p>
                        <div class="sub-popup-benefits">
                            <span><i class="fa-solid fa-check"></i> Free Daily Delivery</span>
                            <span><i class="fa-solid fa-check"></i> 100+ 5-Star Reviews</span>
                        </div>
                        <a href="subscriptions.html" class="sub-popup-cta" id="sub-popup-cta-btn">Subscription Plans <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(popupOverlay);

        let hasScrolled = false;

        const closeBtn = document.getElementById('sub-popup-close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => {
                popupOverlay.classList.remove('active');
                localStorage.setItem('fruit-lab-popup-shown', 'true');
                if (window.popupInterval) clearInterval(window.popupInterval);
            };
        }
        popupOverlay.onclick = (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
                localStorage.setItem('fruit-lab-popup-shown', 'true');
                if (window.popupInterval) clearInterval(window.popupInterval);
            }
        };

        const ctaBtn = document.getElementById('sub-popup-cta-btn');
        if (ctaBtn) {
            ctaBtn.onclick = () => {
                localStorage.setItem('fruit-lab-popup-shown', 'true');
                if (window.popupInterval) clearInterval(window.popupInterval);
            };
        }

        window.addEventListener('scroll', () => {
            hasScrolled = true;
        }, { passive: true });

        // Check every 20 seconds (20000ms)
        window.popupInterval = setInterval(() => {
            // Only trigger if user is scrolling and popup is closed
            if (hasScrolled && !popupOverlay.classList.contains('active')) {
                popupOverlay.classList.add('active');
                localStorage.setItem('fruit-lab-popup-shown', 'true');
                clearInterval(window.popupInterval);
            }
        }, 20000);
    }
