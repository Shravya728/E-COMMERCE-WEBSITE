document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('#addToCart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Display a simple alert for demonstration purposes
            alert('Product added to cart!');
        });
    });
});

document.querySelectorAll('#addToCart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productName = document.querySelectorAll('h2')[index].textContent;
        const productPrice = document.querySelectorAll('.product-price')[index].textContent;
        
        // Retrieve existing cart data from localStorage or initialize an empty array.
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the selected product to the cart.
        cart.push({ name: productName, price: productPrice });

        // Store the updated cart data in localStorage.
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});



// Retrieve the cart data from localStorage.
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display the cart and calculate the total.
const cartContainer = document.getElementById('cart');
const totalContainer = document.getElementById('cart-total');

let totalCost = 0;

cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.textContent = `${item.name} - ${item.price}`;
    cartContainer.appendChild(cartItem);

    totalCost += parseFloat(item.price.replace('₹', ''));
});

totalContainer.textContent =` Total: ₹${totalCost.toFixed(2)}`;

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateLocalStorage();
}

// Function to update the cart display
function updateCartDisplay() {
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.name} - ${item.price} <button class="remove-btn" onclick="removeItem(${index})">Remove</button>`;
        cartContainer.appendChild(cartItem);

        // totalCost += parseFloat(item.price.replace('₹', ''));
    });

    totalContainer.textContent = `Total: ₹${totalCost.toFixed(2)}`;
}

// Function to update localStorage with the latest cart data
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

updateCartDisplay();

// Add event listener for the checkout button
checkoutButton.addEventListener('click', () => {
    // You can implement the checkout logic here, such as payment processing, order confirmation, etc.
    alert('Checkout process goes here');
});

// Function to remove an item from the cart
function removeItem(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);

    // Subtract the price of the removed item from the total cost
    totalCost -= parseFloat(removedItem.price.replace('₹', ''));

    updateCartDisplay();
    updateLocalStorage();
}