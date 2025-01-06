
document.addEventListener('DOMContentLoaded', () => {
    // Initilises the cart from local storage or creates an empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fucntion to update the cart in local storage
    function updateCart() {
        
        localStorage.setItem('cart', JSON.stringify(cart));

        const cartIcon = document.querySelector('#cart img');
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartIcon.setAttribute('data-items', cartCount);
    }

    // Function to add a product to the cart
    function addToCart(product) {
        
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    // Event listener for add to cart buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (event) => {
            
            const productElement = event.target.closest('.product');
            const product = {
                id: productElement.querySelector('.name').textContent,
                name: productElement.querySelector('.name').textContent,
                price: parseFloat(productElement.querySelector('.Price').textContent.replace('₹', '')),
            };

            addToCart(product);
        });
    });

    // Function to render the cart on the cart page
    function renderCart() {
        
        const cartItemsElement = document.querySelector('.cart-items');
        
        const cartSubtotalElement = document.querySelector('.cart-subtotal .price');
        if (cartItemsElement && cartSubtotalElement) {
            cartItemsElement.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">
                        <select data-id="${item.id}">
                            ${[...Array(10).keys()].map(i => `<option value="${i + 1}" ${item.quantity === (i + 1) ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                    </div>
                    <div class="item-price">₹${item.price}</div>
                `;
        
                cartItemsElement.appendChild(cartItemElement);
                total += item.price * item.quantity;
            });
        
            cartSubtotalElement.textContent = `₹${total.toFixed(2)}`;
        }
    }

    
    
    // Event listeners for quantity change on the cart page
    document.addEventListener('change', (event) => {
        
        if (event.target.matches('.item-quantity select')) {
        
            const itemId = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value);
            const item = cart.find(item => item.id === itemId);
            if (item) {
                item.quantity = newQuantity;
                updateCart();
                renderCart();
            }
        }
    });

    // Initial render of the cart on the cart page
    renderCart();
    updateCart();
});