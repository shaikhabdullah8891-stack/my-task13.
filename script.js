const addButtons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalElement = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

// Add product to cart
function addToCart(name, price) {

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}

// Display cart
function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p id="emptyCart">Your cart is empty.</p>
        `;
    }

    cart.forEach(function (item, index) {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price}</p>
            </div>

            <div class="quantity">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button 
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    updateCart();
}

// Change quantity
function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// Remove product
function removeItem(index) {

    cart.splice(index, 1);

    displayCart();
}

// Update cart count and total
function updateCart() {

    let itemCount = 0;

    const total = cart.reduce(function (sum, item) {

        itemCount += item.quantity;

        return sum + item.price * item.quantity;

    }, 0);

    cartCount.textContent = itemCount;

    totalElement.textContent = total.toFixed(2);
}

// Add button functionality
addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        addToCart(name, price);

    });

});

// Checkout
checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase!");

});

// Initial display
displayCart();