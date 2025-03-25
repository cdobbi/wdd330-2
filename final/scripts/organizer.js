document.addEventListener("DOMContentLoaded", function () {
    const saveShowButton = document.getElementById("save-show");
    const beginShowButton = document.getElementById("begin-show");
    const rabbitList = document.getElementById("rabbit-list");

    // Fetch Rabbit Breeds from data.json
    fetch("../data/data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch rabbit breeds.");
            }
            return response.json();
        })
        .then((data) => {
            const entries = data.entries; // Access the "entries" key
            rabbitList.innerHTML = ""; // Clear placeholder rabbits

            // Populate the rabbit list dynamically
            entries.forEach((entry) => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item breed-button";
                listItem.dataset.breed = entry.breed;
                listItem.textContent = entry.breed;
                rabbitList.appendChild(listItem);
            });

            // Attach event listeners to dynamically created breed buttons
            const dynamicBreedButtons = document.querySelectorAll(".breed-button");
            dynamicBreedButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const breed = button.dataset.breed;
                    console.log(`Breed selected for lineup: ${breed}`);
                    // Add logic here to add the breed to the lineup
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching rabbit breeds:", error);
            rabbitList.innerHTML = "<li class='list-group-item text-danger'>Failed to load rabbit breeds.</li>";
        });

    // Save Show
    if (saveShowButton) {
        saveShowButton.addEventListener("click", async () => {
            const category = document.getElementById("category").value;
            const table = document.getElementById("table").value;
            const selectedBreeds = Array.from(
                document.querySelectorAll(".breed-checkbox:checked")
            ).map((checkbox) => checkbox.value);

            if (!category || !table || selectedBreeds.length === 0) {
                alert("Please select a category, table, and at least one breed.");
                return;
            }

            try {
                const response = await fetch("https://wdd330-owtb.onrender.com/api/save-show", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ category, table, breeds: selectedBreeds }),
                });
                const data = await response.json();
                alert(`Show saved successfully!\nCategory: ${category}\nTable: ${table}\nBreeds: ${selectedBreeds.join(", ")}`);
            } catch (error) {
                console.error("Error saving show:", error);
                alert("An error occurred while saving the show. Please try again.");
            }
        });
    }

    // Begin Show
    if (beginShowButton) {
        beginShowButton.addEventListener("click", () => {
            window.location.href = "lineup.html";
        });
    }
});