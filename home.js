// Fetch and load the navigation bar HTML
fetch('../assets/navbar.html') // Request the navbar HTML file
  .then(response => response.text()) // Convert the response to text
  .then(data => {
    // Insert the fetched HTML into the 'main-navbar' element
    document.getElementById('main-navbar').innerHTML = data;
  });

// Fetch and load the footer HTML
fetch('../assets/footer.html') // Request the footer HTML file
  .then(response => response.text()) // Convert the response to text
  .then(data => {
    // Insert the fetched HTML into the 'main-footer' element
    document.getElementById('main-footer').innerHTML = data;
  });
