window.onload = function() {

    // **Shopping Cart Logic**

    // References to DOM elements for cart
    var cartItemsContainer = document.getElementById("cart-items");
    var totalPriceElement = document.getElementById("total-price");
    var clearCartButton = document.getElementById("clear-cart-btn");
    var checkoutButton = document.getElementById("checkout-btn");

    // Check if all necessary elements are present
    if (!cartItemsContainer || !totalPriceElement || !clearCartButton || !checkoutButton) {
        console.error("Cart elements not found in the DOM.");
        return; // Exit if any required element is missing
    }

    // Initialize cart items from sessionStorage or set as an empty array
    var cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    // Add event listeners to "Add to Cart" buttons
    var addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var itemName = this.getAttribute("data-item"); // Get item name from button
            var itemPrice = parseFloat(this.getAttribute("data-price")); // Get item price from button
            addToCart(itemName, itemPrice); // Add item to cart
            displayCartItems(); // Update cart display
            showModal("Item added to cart 🛒"); // Show confirmation message
        });
    });

    // Function to add items to the cart
    function addToCart(itemName, itemPrice) {
        // Find if the item already exists in the cart
        var existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            // Increase quantity if item exists
            existingItem.quantity += 1;
        } else {
            // Add new item to cart
            cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
        }
        // Update cart items in sessionStorage
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Function to display cart items and total price
    function displayCartItems() {
        cartItemsContainer.innerHTML = ""; // Clear current cart display
        var total = 0; // Initialize total price

        // Iterate through each item in the cart
        cartItems.forEach(function(item) {
            var listItem = document.createElement("li");
            // Format the display based on quantity
            var itemDisplay = item.quantity > 1
                ? `- x${item.quantity} ${item.name} <strong>${(item.price * item.quantity).toFixed(2)} $</strong>`
                : `- ${item.name} <strong>${item.price.toFixed(2)} $</strong>`;
            listItem.innerHTML = itemDisplay;
            cartItemsContainer.appendChild(listItem); // Add item to cart display
            total += item.price * item.quantity; // Accumulate total price
        });

        // Update the total price display
        totalPriceElement.innerHTML = `<strong>Total: ${total.toFixed(2)} $</strong>`;
    }

    // Add event listener to "Clear Cart" button
    clearCartButton.addEventListener("click", function() {
        cartItems = []; // Clear cart items
        sessionStorage.removeItem("cartItems"); // Remove cart from sessionStorage
        displayCartItems(); // Update cart display
        showModal("Cart has been cleared 🗑️"); // Show confirmation message
    });

    // Add event listener to "Checkout" button
    checkoutButton.addEventListener("click", function() {
        if (cartItems.length > 0) {
            // Calculate total price
            var total = cartItems.reduce(function(acc, item) {
                return acc + (item.price * item.quantity);
            }, 0);

            // Prepare receipt object with cart items and total price
            var receipt = {
                items: cartItems,
                totalPrice: total.toFixed(2) // Convert total price to string
            };

            // Save receipt to localStorage
            localStorage.setItem("receipts", JSON.stringify(receipt));

            // Clear the cart and sessionStorage
            cartItems = [];
            sessionStorage.removeItem("cartItems");
            displayCartItems(); // Update cart display

            // Show confirmation message
            showModal("Your order has been processed ✅");

            // Log saved receipt data (for debugging)
            var savedReceipt = JSON.parse(localStorage.getItem("receipts"));
            console.log("Saved receipt in localStorage:", savedReceipt);
        } else {
            showModal("Your cart is empty 🛒"); // Show message if cart is empty
        }
    });

    // Function to show a modal with a given message
    function showModal(message) {
        var modalElement = document.getElementById('shopping-modal'); // Get modal element
        var modalTitle = modalElement.querySelector('.modal-title'); // Get modal title
        modalTitle.textContent = message; // Set the message text
        var bootstrapModal = new bootstrap.Modal(modalElement); // Create Bootstrap modal instance
        bootstrapModal.show(); // Display the modal
    }

    // Initial call to display cart items when the page loads
    displayCartItems();


    
    // **Newsletter Subscription Logic**

    // Get elements
    var emailInput = document.getElementById("email-input");
    var subscribeButton = document.getElementById("subscribe-btn");
    var subscribeModalElement = document.getElementById("subscribe-modal");

    // Function to show the subscription modal with a given message
    function showSubscribeModal(message) {
        var modalTitle = subscribeModalElement.querySelector('.modal-title'); // Get modal title
        modalTitle.textContent = message; // Set the message text
        var bootstrapModal = new bootstrap.Modal(subscribeModalElement); // Create Bootstrap modal instance
        bootstrapModal.show(); // Display the modal
    }

    // Function to handle the subscription action
    function handleSubscribe() {
        var email = emailInput.value.trim(); // Get email value and trim whitespace
        if (email) {
            // Retrieve existing subscribers from localStorage
            var subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
            if (!subscribers.includes(email)) {
                // Add new email if it's not already in the list
                subscribers.push(email);
                localStorage.setItem("subscribers", JSON.stringify(subscribers));
            }
            showSubscribeModal("Thank you for subscribing! 🎉"); // Show success message
            emailInput.value = ""; // Clear input field
        } else {
            showSubscribeModal("Please enter a valid email address❗"); // Show error message
        }
    }

    // Add event listener to the subscribe button
    subscribeButton.addEventListener("click", handleSubscribe);
};
