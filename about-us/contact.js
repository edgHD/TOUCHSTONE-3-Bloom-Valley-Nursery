function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const comment = document.getElementById("comment").value;

    // Check if name, email, and comment are not empty
    if (!name || !email || !comment) {
        alert("Please fill out all required fields");
        return; // Exit the function if any required field is empty
    }

    const customerInfo = {
        name, email, phone, comment
    };

    const keyValue = name;
    // Save customer information to localStorage
    localStorage.setItem(keyValue, JSON.stringify(customerInfo));

    // Access and parse local data back out of localStorage
    const who = JSON.parse(localStorage.getItem(name));
    alert("Thank you for reaching us, " + who.name + "!");
}
