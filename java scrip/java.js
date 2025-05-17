 

    document.addEventListener('DOMContentLoaded', function() {
        const menuCards = document.querySelectorAll('.menu-card');
        
        menuCards.forEach(card => {
            const priceElement = card.querySelector('.card-price');
            const price = parseInt(priceElement.getAttribute('data-price'));
            const quantityElement = card.querySelector('.quantity');
            const totalPriceElement = card.querySelector('.total-price');
            const minusBtn = card.querySelector('.minus');
            const plusBtn = card.querySelector('.plus');
            
            let quantity = 0;
            
            function updateDisplay() {
                quantityElement.textContent = quantity;
                totalPriceElement.textContent = (quantity * price) + ' IQD';
            }
            
            plusBtn.addEventListener('click', function() {
                quantity++;
                updateDisplay();
            });
            
            minusBtn.addEventListener('click', function() {
                if (quantity > 0) {
                    quantity--;
                    updateDisplay();
                }
            });
            
            updateDisplay();
        });
    });

    let cart = [];
    let cartOpen = false;

    function toggleCart() {
        cartOpen = !cartOpen;
        document.querySelector('.cart-sidebar').classList.toggle('active');
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalPriceElement = document.getElementById('cart-total-price');
        
        // Clear current items
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
                    <div class="cart-item-price">${item.price.toLocaleString()} IQD x ${item.quantity}</div>
                    <div class="cart-item-quantity">
                        <button onclick="updateCartItem('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItem('${item.name}', 1)">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartCount.textContent = totalCount;
        totalPriceElement.textContent = `${totalPrice.toLocaleString()} IQD`;
    }

    function updateCartItem(name, change) {
        const itemIndex = cart.findIndex(item => item.name === name);
        
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            
            if (cart[itemIndex].quantity < 1) {
                cart.splice(itemIndex, 1);
            }
        }
        
        updateCartDisplay();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const menuCards = document.querySelectorAll('.menu-card');
        
        menuCards.forEach(card => {
            const priceElement = card.querySelector('.card-price');
            const price = parseInt(priceElement.getAttribute('data-price'));
            const name = card.querySelector('.card-category').textContent;
            const image = card.querySelector('.card-image').src;
            const quantityElement = card.querySelector('.quantity');
            const minusBtn = card.querySelector('.minus');
            const plusBtn = card.querySelector('.plus');
            
            let quantity = 0;
            
            function updateCart() {
                const existingItem = cart.find(item => item.name === name);
                
                if (quantity > 0) {
                    if (existingItem) {
                        existingItem.quantity = quantity;
                    } else {
                        cart.push({
                            name: name,
                            price: price,
                            quantity: quantity,
                            image: image
                        });
                    }
                } else {
                    if (existingItem) {
                        cart = cart.filter(item => item.name !== name);
                    }
                }
                
                updateCartDisplay();
            }
            
            plusBtn.addEventListener('click', function() {
                quantity++;
                quantityElement.textContent = quantity;
                updateCart();
            });
            
            minusBtn.addEventListener('click', function() {
                if (quantity > 0) {
                    quantity--;
                    quantityElement.textContent = quantity;
                    updateCart();
                }
            });
        });
    });
