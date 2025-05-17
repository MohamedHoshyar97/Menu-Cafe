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
    updateMenuCardQuantities();
}

function clearCart() {
    cart = [];
    saveCartToLocalStorage(cart);
    updateCartDisplay();
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