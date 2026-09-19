// =========================================
// DATA
// =========================================

// Foods currently being tracked (what shows up in "Tracked Foods")
let trackedFoods = [
  { id: "miso-soup", name: "Mushroom Miso Soup", calories: 120, quantity: 2, emoji: "🍲" },
  { id: "momos", name: "Steamed Momos", calories: 180, quantity: 1, emoji: "🥟" },
  { id: "beef-mignon", name: "Beef Mignon", calories: 420, quantity: 1, emoji: "🥩" }
];

// Every food available to add, used to fill the dropdown in "Add More Food"
const foodCatalog = [
  { id: "miso-soup", name: "Mushroom Miso Soup", calories: 120, emoji: "🍲" },
  { id: "momos", name: "Steamed Momos", calories: 180, emoji: "🥟" },
  { id: "beef-mignon", name: "Beef Mignon", calories: 420, emoji: "🥩" },
  { id: "salmon", name: "Grilled Salmon", calories: 350, emoji: "🐟" },
  { id: "caesar-salad", name: "Caesar Salad", calories: 220, emoji: "🥗" },
  { id: "margherita", name: "Margherita Pizza Slice", calories: 260, emoji: "🍕" },
  { id: "avocado-toast", name: "Avocado Toast", calories: 240, emoji: "🥑" },
  { id: "lava-cake", name: "Chocolate Lava Cake", calories: 310, emoji: "🍫" },
  { id: "matcha-latte", name: "Iced Matcha Latte", calories: 150, emoji: "🍵" }
];

const dailyGoal = 2000;
const STORAGE_KEY = "dinecomTrackedFoods";

// =========================================
// DOM ELEMENTS
// =========================================

const foodListEl = document.getElementById("foodList");
const emptyMessageEl = document.getElementById("emptyMessage");
const totalCaloriesEl = document.getElementById("totalCalories");
const progressFillEl = document.getElementById("progressFill");
const progressNoteEl = document.getElementById("progressNote");
const foodSelectEl = document.getElementById("foodSelect");
const foodSearchEl = document.getElementById("foodSearch");
const addFoodBtn = document.getElementById("addFoodBtn");
const clearTrackerBtn = document.getElementById("clearTrackerBtn");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

// =========================================
// LOCAL STORAGE
// =========================================

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trackedFoods));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    trackedFoods = JSON.parse(saved);
  }
}

// =========================================
// CALCULATIONS
// =========================================

function calculateFoodCalories(food) {
  return food.calories * food.quantity;
}

function calculateTotalCalories() {
  return trackedFoods.reduce((sum, food) => sum + calculateFoodCalories(food), 0);
}

// =========================================
// RENDERING
// =========================================

function renderFoods() {
  foodListEl.innerHTML = "";

  if (trackedFoods.length === 0) {
    emptyMessageEl.style.display = "block";
  } else {
    emptyMessageEl.style.display = "none";
  }

  trackedFoods.forEach(food => {
    const row = document.createElement("div");
    row.className = "food-row";

    row.innerHTML = `
      <div class="food-image">${food.emoji}</div>
      <div class="food-info">
        <p class="food-name">${food.name}</p>
        <p class="food-meta">${food.calories} kcal per serving</p>
      </div>
      <div class="quantity-control">
        <button class="qty-btn minus-btn" aria-label="Decrease quantity">−</button>
        <span class="qty-value">${food.quantity}</span>
        <button class="qty-btn plus-btn" aria-label="Increase quantity">+</button>
      </div>
      <div class="food-total">${calculateFoodCalories(food)} kcal</div>
      <button class="remove-btn">Remove</button>
    `;

    // Wire up the buttons for this specific row
    row.querySelector(".minus-btn").addEventListener("click", () => decreaseQuantity(food.id));
    row.querySelector(".plus-btn").addEventListener("click", () => increaseQuantity(food.id));
    row.querySelector(".remove-btn").addEventListener("click", () => removeFood(food.id));

    foodListEl.appendChild(row);
  });
}

function updateSummary() {
  const total = calculateTotalCalories();
  const percent = Math.min((total / dailyGoal) * 100, 100);

  totalCaloriesEl.textContent = `${total.toLocaleString()} kcal`;
  progressFillEl.style.width = `${percent}%`;
  progressNoteEl.textContent = `${Math.round(percent)}% of your daily goal`;

  if (total > dailyGoal) {
    progressFillEl.classList.add("over-goal");
  } else {
    progressFillEl.classList.remove("over-goal");
  }
}

function refreshPage() {
  renderFoods();
  updateSummary();
  saveToLocalStorage();
}

// =========================================
// QUANTITY / REMOVE / ADD
// =========================================

function increaseQuantity(id) {
  const food = trackedFoods.find(f => f.id === id);
  if (food) {
    food.quantity += 1;
    refreshPage();
  }
}

function decreaseQuantity(id) {
  const food = trackedFoods.find(f => f.id === id);
  if (food && food.quantity > 1) {
    food.quantity -= 1;
    refreshPage();
  }
}

function removeFood(id) {
  trackedFoods = trackedFoods.filter(f => f.id !== id);
  refreshPage();
}

function addFood() {
  const selectedId = foodSelectEl.value;
  if (!selectedId) return;

  const catalogFood = foodCatalog.find(f => f.id === selectedId);
  if (!catalogFood) return;

  const existing = trackedFoods.find(f => f.id === selectedId);

  if (existing) {
    existing.quantity += 1;
  } else {
    trackedFoods.push({
      id: catalogFood.id,
      name: catalogFood.name,
      calories: catalogFood.calories,
      quantity: 1,
      emoji: catalogFood.emoji
    });
  }

  refreshPage();
}

function clearTracker() {
  const confirmed = confirm("Remove all tracked foods?");
  if (confirmed) {
    trackedFoods = [];
    refreshPage();
  }
}

// =========================================
// ADD FOOD FORM (dropdown + search)
// =========================================

function populateFoodSelect(filterText = "") {
  const previousValue = foodSelectEl.value;
  foodSelectEl.innerHTML = "";

  const matches = foodCatalog.filter(food =>
    food.name.toLowerCase().includes(filterText.toLowerCase())
  );

  matches.forEach(food => {
    const option = document.createElement("option");
    option.value = food.id;
    option.textContent = `${food.name} (${food.calories} kcal)`;
    foodSelectEl.appendChild(option);
  });

  // Keep the previous selection if it's still in the filtered list
  if (matches.some(f => f.id === previousValue)) {
    foodSelectEl.value = previousValue;
  }
}

// =========================================
// EVENT LISTENERS
// =========================================

addFoodBtn.addEventListener("click", addFood);
clearTrackerBtn.addEventListener("click", clearTracker);

foodSearchEl.addEventListener("input", () => {
  populateFoodSelect(foodSearchEl.value);
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// =========================================
// INITIAL LOAD
// =========================================

loadFromLocalStorage();
populateFoodSelect();
refreshPage();
