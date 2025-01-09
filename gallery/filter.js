document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded, initializing filter functionality.");

    // Get the filter buttons and product cards
    var treesSel = document.getElementById("trees-sel");
    var plantsSel = document.getElementById("plants-sel");
    var toolsSel = document.getElementById("tools-sel");
    var productCards = document.querySelectorAll(".card");

    console.log("Filter Buttons:", {
        treesSel, plantsSel, toolsSel
    });
    console.log("Product Cards:", productCards.length);

    // Function to filter cards
    function filterCards() {
        // Initialize selected categories array
        var selectedCategories = [];

        // Collect selected categories
        if (treesSel.checked) selectedCategories.push("trees");
        if (plantsSel.checked) selectedCategories.push("plants");
        if (toolsSel.checked) selectedCategories.push("tools");

        // Filter cards
        productCards.forEach(card => {
            var category = card.getAttribute("data-category");
            if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        console.log("Selected Categories:", selectedCategories);
    }

    // Function to apply filter based on URL hash
    function applyFilterFromHash() {
        var hash = window.location.hash.substring(1); // Remove the '#' from the hash
        console.log("Applying filter from hash:", hash);

        // Uncheck all filters
        treesSel.checked = false;
        plantsSel.checked = false;
        toolsSel.checked = false;

        // Check the filter based on the hash
        if (hash === "trees") treesSel.checked = true;
        if (hash === "plants") plantsSel.checked = true;
        if (hash === "tools") toolsSel.checked = true;

        // Apply the filter
        filterCards();
    }

    // Attach event listeners
    treesSel.addEventListener("change", filterCards);
    plantsSel.addEventListener("change", filterCards);
    toolsSel.addEventListener("change", filterCards);

    // Apply filter based on URL hash on initial load
    applyFilterFromHash();

    // Apply filter when the hash changes
    window.addEventListener("hashchange", applyFilterFromHash);
});