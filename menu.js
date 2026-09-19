const foods = [
    {
        name: "Steamed Momos",
        category: "Veg",
        price: 180,
        calories: 190,
        image: "images/foodimage.1 - Copy.jpeg"
    },
    {
        name: "Korean Momos",
        category: "Veg",
        price: 250,
        calories: 300,
        image: "images/korean momos - Copy (2).jpeg"
    },
    {
        name: "Paneer Tikka",
        category: "Veg",
        price: 229,
        calories: 310,
        image: "images/paneer tikka - Copy.jpeg"
    },
    {
        name: "Masala Dosa",
        category: "Veg",
        price: 149,
        calories: 420,
        image: "images/masal dosa - Copy (2).jpeg"
    },
    {
        name: "Veg Hakka Noodles",
        category: "Veg",
        price: 189,
        calories: 470,
        image: "images/noodles - Copy.jpeg"
    },
    {
        name: "Veg Fried Rice",
        category: "Veg",
        price: 179,
        calories: 450,
        image: "images/veg rice - Copy.jpeg"
    },
    {
        name: "Chilli Paneer",
        category: "Veg",
        price: 219,
        calories: 330,
        image: "images/chilli paneer.jpeg"
    },
    {
        name: "Veg Spring Rolls",
        category: "Veg",
        price: 159,
        calories: 220,
        image: "images/veg roll - Copy.jpeg"
    },
    {
        name: "Mushroom Miso Soup",
        category: "Soups",
        price: 180,
        calories: 120,
        image: "images/mushroom soup - Copy.jpeg"
    },
    {
        name: "Tomato Soup",
        category: "Soups",
        price: 120,
        calories: 100,
        image: "images/tomato soup.jpeg"
    },
    {
        name: "Sweet Corn Soup",
        category: "Soups",
        price: 140,
        calories: 150,
        image: "images/corn soup - Copy.jpeg"
    },
    {
        name: "Tofu Meatball Soup",
        category: "Soups",
        price: 190,
        calories: 220,
        image: "images/tofu meatball soup.jpeg"
    },
    {
        name: "Hot & Sour Soup",
        category: "Soups",
        price: 150,
        calories: 140,
        image: "images/hot and sour soup - Copy.jpeg"
    },
    {
        name: "Vegetable Soup",
        category: "Soups",
        price: 130,
        calories: 110,
        image: "images/veg soup - Copy.jpeg"
    },
    {
        name: "Chicken Biryani",
        category: "Non-Veg",
        price: 289,
        calories: 650,
        image: "images/chicken briyani.jpeg"
    },
    {
        name: "Chicken 65",
        category: "Non-Veg",
        price: 249,
        calories: 380,
        image: "images/chicken 65.jpeg"
    },
    {
        name: "Chicken Tikka",
        category: "Non-Veg",
        price: 299,
        calories: 350,
        image: "images/chicken tikka.jpeg"
    },
    {
        name: "Butter Chicken",
        category: "Non-Veg",
        price: 329,
        calories: 520,
        image: "images/butter chicken.jpeg"
    },
    {
        name: "Signature Lobster Bisque",
        category: "Non-Veg",
        price: 450,
        calories: 320,
        image: "images/lobster bisque - Copy (2).jpeg"
    },
    {
        name: "Filet Mignon",
        category: "Non-Veg",
        price: 550,
        calories: 420,
        image: "images/filet mignon - Copy.jpeg"
    },
    {
        name: "Chocolate Brownie",
        category: "Offers",
        price: 139,
        calories: 410,
        image: "images/choco brownie.jpeg"
    },
    {
        name: "Gulab Jamun",
        category: "Offers",
        price: 99,
        calories: 300,
        image: "images/gulab jamun - Copy.jpeg"
    },
    {
        name: "Cheese Pizza",
        category: "Offers",
        price: 199,
        calories: 560,
        image: "images/cheese pizza.jpeg"
    },
    {
        name: "Veg Burger",
        category: "Offers",
        price: 159,
        calories: 390,
        image: "images/veg burger - Copy.jpeg"
    },
    {
        name: "Cold Coffee",
        category: "Offers",
        price: 99,
        calories: 190,
        image: "images/cold coffe.jpeg"
    },
    {
        name: "Fresh Lime Soda",
        category: "Offers",
        price: 79,
        calories: 90,
        image: "images/lime soda - Copy (2).jpeg"
    },
    {
        name: "Mango Lassi",
        category: "Offers",
        price: 109,
        calories: 210,
        image: "images/mango lassi - Copy (2).jpeg"
    }
];

let cart = [];
let tracker = [];

const foodContainer = document.querySelector(".food-container");
const searchInput = document.querySelector(".search-box input");
const categoryButtons = document.querySelectorAll(".categories button");

function displayFoods(foodList) {

    foodContainer.innerHTML = "";

    foodList.forEach(function(food) {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>₹${food.price} • ${food.calories} kcal</p>
            <span>${food.category === "Non-Veg" ? "🔴 Non-Veg" : "🟢 Veg"}</span>
            <button onclick="addToCart('${food.name}')">Add to Cart</button>
            <button onclick="addToTracker('${food.name}')">Add to Tracker</button>
        `;

        foodContainer.appendChild(card);
    });
}

function addToCart(foodName) {

    cart.push(foodName);

    alert(foodName + " added to cart!");

    console.log("Cart:", cart);
}

function addToTracker(foodName) {

    tracker.push(foodName);

    alert(foodName + " added to food tracker!");

    console.log("Tracker:", tracker);
}

searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredFoods = foods.filter(function(food) {

        return food.name.toLowerCase().includes(searchText);
    });

    displayFoods(filteredFoods);
});

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.textContent;

        if (category === "All") {

            displayFoods(foods);

        } else {

            const filteredFoods = foods.filter(function(food) {

                return food.category === category;
            });

            displayFoods(filteredFoods);
        }
    });
});

displayFoods(foods);