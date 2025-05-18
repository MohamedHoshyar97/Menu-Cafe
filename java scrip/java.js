// cart.js - Include this in all pages
// Cart functionality
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('shoppingCart');
    return storedCart ? JSON.parse(storedCart) : [];
}

function saveCartToLocalStorage(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

let cart = loadCartFromLocalStorage();
let cartOpen = false;

// Cross-tab synchronization
window.addEventListener('storage', function(e) {
    if (e.key === 'shoppingCart') {
        cart = loadCartFromLocalStorage();
        updateCartDisplay();
        updateMenuCardQuantities();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    updateCartDisplay();
    setupMenuCards();
}

function setupMenuCards() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach(card => {
        const priceElement = card.querySelector('.card-price');
        const price = parseInt(priceElement.dataset.price);
        const quantityElement = card.querySelector('.quantity');
        const totalPriceElement = card.querySelector('.total-price');
        const minusBtn = card.querySelector('.minus');
        const plusBtn = card.querySelector('.plus');
        const name = card.querySelector('.card-category').textContent;
        const image = card.querySelector('.card-image')?.src || '';

        // Initialize from cart
        const cartItem = cart.find(item => item.name === name);
        let quantity = cartItem?.quantity || 0;
        quantityElement.textContent = quantity;
        
        if (totalPriceElement) {
            totalPriceElement.textContent = `${(quantity * price).toLocaleString()} IQD`;
        }

        plusBtn.addEventListener('click', () => updateQuantity(1));
        minusBtn.addEventListener('click', () => updateQuantity(-1));

        function updateQuantity(change) {
            quantity = Math.max(0, quantity + change);
            quantityElement.textContent = quantity;
            if (totalPriceElement) {
                totalPriceElement.textContent = `${(quantity * price).toLocaleString()} IQD`;
            }
            updateCart(name, price, image, quantity);
        }
    });
}

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    
    if (!cartItemsContainer || !cartCountElement || !cartTotalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalCount += item.quantity;
        totalPrice += item.price * item.quantity;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} IQD</div>
                <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                <div class="cart-item-subtotal">Subtotal: ${(item.price * item.quantity).toLocaleString()} IQD</div>
            </div>
            <button class="remove-item" onclick="removeCartItem('${item.name}')">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartCountElement.textContent = totalCount;
    cartTotalPriceElement.textContent = `${totalPrice.toLocaleString()} IQD`;
    saveCartToLocalStorage(cart);

    // Manage Remove All button
    const existingRemoveAll = document.querySelector('#remove-all-items');
    if (cart.length > 0 && !existingRemoveAll) {
        const removeAllBtn = document.createElement('button');
        removeAllBtn.id = 'remove-all-items';
        removeAllBtn.textContent = 'Remove All Items';
        removeAllBtn.addEventListener('click', clearCart);
        cartItemsContainer.after(removeAllBtn);
    } else if (cart.length === 0 && existingRemoveAll) {
        existingRemoveAll.remove();
    }
}

function updateCart(name, price, image, quantity) {
    const index = cart.findIndex(item => item.name === name);
    
    if (quantity > 0) {
        if (index > -1) {
            cart[index].quantity = quantity;
        } else {
            cart.push({ name, price, image, quantity });
        }
    } else if (index > -1) {
        cart.splice(index, 1);
    }
    
    saveCartToLocalStorage(cart);
    updateCartDisplay();
}

function removeCartItem(name) {
    cart = cart.filter(item => item.name !== name);
    saveCartToLocalStorage(cart);
    updateCartDisplay();
    // Reset menu card quantities
    setupMenuCards(); // Add this line
    updateMenuCardQuantities();
}

function clearCart() {
    cart = [];
    saveCartToLocalStorage(cart);
    updateCartDisplay();
    // Reset menu card quantities
    setupMenuCards(); // Add this line
    updateMenuCardQuantities();
}

function updateMenuCardQuantities() {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        const name = card.querySelector('.card-category').textContent;
        const cartItem = cart.find(item => item.name === name);
        const quantity = cartItem?.quantity || 0;
        
        card.querySelector('.quantity').textContent = quantity;
        const price = parseInt(card.querySelector('.card-price').dataset.price);
        const totalElement = card.querySelector('.total-price');
        if (totalElement) {
            totalElement.textContent = `${(quantity * price).toLocaleString()} IQD`;
        }
    });
}











////Index Translate
const translations = {
    ku: {    

        ////Index Translate
        "meta.title": "برو و بایتس | کافێی کارەسەنگ",
        "hero.title": "بەخێربێن بۆ برو و بایتس",
        "hero.subtitle": "فێری قاوەی کارەسەنگ و خواردنە دەستکاریکراوەکان لە جێگەیەکی گەرمدا ببە",
        "menu.view": "بینینی مینو",
        "menu.coffee": "قاوە",
        "menu.drinks": "خواردنەوە",
        "menu.food": "خواردن",
        "menu.milkshake": "مێڵک شەیک",
        "menu.sweets": "شیرینی",
        "menu.bubble": "بابڵ",
        "about.title": "چیرۆکی ئێمە",
        "about.p1": "لە ساڵی ٢٠١٥، برو و بایتس دەست بە کار کرد وەک کافێیەکی ناوچەیی بە ھەوڵی قاوەی باش و خواردنی ماڵی.",
        "about.p2": "ئاڕاستەی قاوەکان بە شێوەیەکی ڕاستەوخۆ لە کێڵگەی پایەدار دەگرین و لە ناو شوێنەکەمان دەبوخین.",
        "about.p3": "خواردنەکان لە ماددەی ماڵی درووست دەکرێن بۆ درووستکردنی خواردنە تازە و خۆشەویست.",
        "about.p4": "لە برو و بایتس، دڵنیاین لە درووستکردنی جێگەیەکی گەرم کە خەڵک بتوانێت بۆ خۆراک و خواردنەوە کۆببنەوە.",
        "about.imageAlt": "کافێکەمان",
        "footer.hours": "کاتەکانی کراوەبوون",
        "footer.weekdays": "دووشەممە - ھەینی: ٧ی بەیانی - ٧ی ئێوارە",
        "footer.weekend": "شەممە - یەکشەممە: ٨ی بەیانی - ٦ی ئێوارە",
        "footer.visit": "سەردانمان بکە",
        "footer.address": "١٢٣ شەقامی قاوە",
        "footer.city": "بروڤیل، BV 12345",
        "footer.phone": "(١٢٣) ٤٥٦-٧٨٩٠",
        "footer.copyright": "&copy; ٢٠٢٣ برو و بایتس. ھەموو مافەکان پارێزراون.",




        ////coffe Translate
        
        "hero.title2": "هەڵبژاردەی قاوە جیهانییەکان",
        "hero.subtitle2":"١٦ جۆری قاوەی جۆراو جۆر و تایبەت و هەمەڕەنگ دەتوانی تاقیبکەیتەوە ",

        "coffee.espresso.name": "ئەسپرسۆ",
        "coffee.espresso.desc": "شۆتیەکی توند و بۆنەدار",

        "coffee.double.name": "دەبڵ ئەسپرسۆ",
        "coffee.double.desc": "دوو هێز، دوو خۆشی",

        "coffee.cappuccino.name": "کاپوچینو",
        "coffee.cappuccino.desc": "هاوەنگی قاوە، شێر و فۆم",

        "coffee.latte.name": "لەیت",
        "coffee.latte.desc": "قاوەی نەرم بە شیر",

        "coffee.flatwhite.name": "فڵات وایت",
        "coffee.flatwhite.desc": "فۆمی نەرم لەسەر قاوەی دەرووندار",

        "coffee.mocha.name": "موکا",
        "coffee.mocha.desc": "قاوەیەک بە چەکڵەتی ڕەق",

        "coffee.americano.name": "ئامێریکانۆ",
        "coffee.americano.name": "قاوەی درێژکراو بە ئاو",

        "coffee.macchiato.name": "ماکیاتۆ",
        "coffee.macchiato.desc": "قاوەیەک بە فۆمی شێر",

        "coffee.cortado.name": "کۆرتادۆ",
        "coffee.cortado.desc": "بەڕابەری قاوە و شێری گەرمیەوە",

        "coffee.coldbrew.name": "کۆلد برو",
        "coffee.coldbrew.desc": "قاوەی ساردی پەخراو بۆ ١٨ کاتژمێر",

        "coffee.icedlatte.name": "لەیتی سارد",
        "coffee.icedlatte.desc": "ئەسپرسۆی سارد بە شێر و بەفر",

        "coffee.affogato.name": "ئاڤۆگاتۆ",
        "coffee.affogato.desc": "دەریای ئەسپرسۆی گەرەم لەسەر ئایس کریمی ڕەق",
        "text":"تامێکی نایاب",
        "explore":"بینینی قاوەکان",
        "text2":"بینینی لیستی بەرهەم"

    },
    ar: {

         ////Index Translate
        "meta.title": "برو آند بايتس | مقهى الحرفيين",
        "hero.title": "مرحبًا بكم في برو آند بايتس",
        "hero.subtitle": "اكتشف قهوتنا الحرفية ووجباتنا المصنوعة يدويًا في أجواء دافئة",
        "menu.view": "عرض القائمة",
        "menu.coffee": "قهوة",
        "menu.drinks": "مشروبات",
        "menu.food": "طعام",
        "menu.milkshake": "ميلك شيك",
        "menu.sweets": "حلويات",
        "menu.bubble": "فقاعات",
        "about.title": "قصتنا",
        "about.p1": "تأسس برو آند بايتس في عام 2015 كمقهى صغير يهتم بالقهوة عالية الجودة والطعام المنزلي.",
        "about.p2": "نستورد حبوب القهوة مباشرة من المزارع المستدامة ونحمصها داخليًا لإبراز نكهاتها الفريدة.",
        "about.p3": "نستخدم مكونات محلية لصنع أطباق موسمية طازجة تكمل مشروباتنا تمامًا.",
        "about.p4": "نؤمن في برو آند بايتس بخلق مساحة دافئة ترحب بالمجتمع حول الطعام والشراب الجيد.",
        "about.imageAlt": "مقهانا",
        "footer.hours": "ساعات العمل",
        "footer.weekdays": "الإثنين - الجمعة: ٧ صباحًا - ٧ مساءً",
        "footer.weekend": "السبت - الأحد: ٨ صباحًا - ٦ مساءً",
        "footer.visit": "قم بزيارتنا",
        "footer.address": "123 شارع القهوة",
        "footer.city": "بروفيل، BV 12345",
        "footer.phone": "(123) ٤٥٦-٧٨٩",
        "footer.copyright": "&copy; 2023 برو آند بايتس. جميع الحقوق محفوظة.",




        ////coffe Translate
        "hero.title2": "تشكيلة القهوة الحرفية",
"hero.subtitle2": "اكتشف ١٦ تجربة قهوة فاخرة من إعداد خبرائنا",

"coffee.espresso.name": "إسبريسو",
"coffee.espresso.desc": "قهوة مركزة وعطرية بطلقة واحدة",

"coffee.double.name": "إسبريسو مزدوج",
"coffee.double.desc": "مرتين القوة، مرتين المتعة",

"coffee.cappuccino.name": "كابتشينو",
"coffee.cappuccino.desc": "توازن مثالي بين الإسبريسو والحليب والرغوة",

"coffee.latte.name": "لاتيه",
"coffee.latte.desc": "إسبريسو ناعم مع حليب مخملي",

"coffee.flatwhite.name": "فلات وايت",
"coffee.flatwhite.desc": "رغوة ناعمة على إسبريسو غني",

"coffee.mocha.name": "موكا",
"coffee.mocha.desc": "إسبريسو مع طعم الشوكولاتة",

"coffee.americano.name": "أمريكانو",
"coffee.americano.desc": "إسبريسو ممدد بالماء الساخن",

"coffee.macchiato.name": "ماكياتو",
"coffee.macchiato.desc": "إسبريسو مع لمسة من رغوة الحليب",

"coffee.cortado.name": "كورتادو",
"coffee.cortado.desc": "نصف إسبريسو ونصف حليب دافئ",

"coffee.coldbrew.name": "كولد برو",
"coffee.coldbrew.desc": "منقوع ببطء لمدة 18 ساعة",

"coffee.icedlatte.name": "لاتيه مثلج",
"coffee.icedlatte.desc": "إسبريسو بارد مع حليب ومكعبات ثلج",

"coffee.affogato.name": "أفوقاتو",
"coffee.affogato.desc": "آيس كريم فانيليا يغمر بإسبريسو ساخن",

"coffee.turkish.name": "قهوة تركية",
"coffee.turkish.desc": "قهوة تقليدية غير مفلترة بالهيل",

"coffee.vietnamese.name": "قهوة فيتنامية مثلجة",
"coffee.vietnamese.desc": "حليب مكثف محلى مع قهوة قوية على الثلج",

"coffee.pourover.name": "بور أوفر",
"coffee.pourover.desc": "قهوة يدوية من مصدر واحد",

"coffee.frenchpress.name": "فرنش بريس",
"coffee.frenchpress.desc": "قهوة كاملة الجسم بطريقة النقع",
 "text": "طعم نادر",
  "explore": "عرض القهوة",
  "text2": "عرض قائمة المنتجات"

    },
    en: {

         ////Index Translate
        "meta.title": "Brew & Bites | Artisan Cafe",
        "hero.title": "Welcome to Brew & Bites",
        "hero.subtitle": "Discover our artisan coffee and handcrafted meals in a cozy atmosphere",
        "menu.view": "View Menu",
        "menu.coffee": "Coffee",
        "menu.drinks": "Drinks",
        "menu.food": "Food",
        "menu.milkshake": "Milk Shake",
        "menu.sweets": "Sweet",
        "menu.bubble": "Bubble",
        "about.title": "Our Story",
        "about.p1": "Founded in 2015, Brew & Bites began as a small neighborhood cafe with a passion for quality coffee and homemade food.",
        "about.p2": "We source our coffee beans directly from sustainable farms and roast them in-house to bring out their unique flavors.",
        "about.p3": "Our kitchen uses locally-sourced ingredients to create fresh, seasonal dishes that complement our beverages perfectly.",
        "about.p4": "At Brew & Bites, we believe in creating a warm, welcoming space where community can flourish over great food and drink.",
        "about.imageAlt": "Our Cafe",
        "footer.hours": "Opening Hours",
        "footer.weekdays": "Monday - Friday: 7am - 7pm",
        "footer.weekend": "Saturday - Sunday: 8am - 6pm",
        "footer.visit": "Visit Us",
        "footer.address": "123 Coffee Street",
        "footer.city": "Brewville, BV 12345",
        "footer.phone": "(123) 456-7890",
        "footer.copyright": "&copy; 2023 Brew & Bites. All rights reserved.",




        ////coffe Translate
        "hero.title2": "Artisan Coffee Selection",
"hero.subtitle2": "Discover 16 premium coffee experiences crafted by our master baristas",

"coffee.espresso.name": "Espresso",
"coffee.espresso.desc": "Intense and aromatic single shot",

"coffee.double.name": "Double Espresso",
"coffee.double.desc": "Twice the intensity, twice the pleasure",

"coffee.cappuccino.name": "Cappuccino",
"coffee.cappuccino.desc": "Perfect espresso, milk and foam balance",

"coffee.latte.name": "Latte",
"coffee.latte.desc": "Smooth espresso with velvety milk",

"coffee.flatwhite.name": "Flat White",
"coffee.flatwhite.desc": "Microfoam over rich espresso",

"coffee.mocha.name": "Mocha",
"coffee.mocha.desc": "Espresso with chocolate indulgence",

"coffee.americano.name": "Americano",
"coffee.americano.desc": "Espresso lengthened with hot water",

"coffee.macchiato.name": "Macchiato",
"coffee.macchiato.desc": "Espresso \"stained\" with milk foam",

"coffee.cortado.name": "Cortado",
"coffee.cortado.desc": "Equal parts espresso and warm milk",

"coffee.coldbrew.name": "Cold Brew",
"coffee.coldbrew.desc": "Slow-steeped for 18 hours",

"coffee.icedlatte.name": "Iced Latte",
"coffee.icedlatte.desc": "Chilled espresso with cold milk and ice",

"coffee.affogato.name": "Affogato",
"coffee.affogato.desc": "Vanilla ice cream drowned in hot espresso",

"coffee.turkish.name": "Turkish Coffee",
"coffee.turkish.desc": "Traditional unfiltered coffee with cardamom",

"coffee.vietnamese.name": "Vietnamese Iced Coffee",
"coffee.vietnamese.desc": "Sweetened condensed milk with strong coffee over ice",

"coffee.pourover.name": "Pour Over",
"coffee.pourover.desc": "Handcrafted single-origin coffee",

"coffee.frenchpress.name": "French Press",
"coffee.frenchpress.desc": "Full-bodied immersion brew"

    },
}
function setLanguage(lang) {
    localStorage.setItem("selectedLanguage", lang);
    translatePage(lang);
}

function translatePage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
}

// Auto-load saved language on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    setLanguage(savedLang);
    const select = document.getElementById("languageSelect");
    if (select) select.value = savedLang;
});