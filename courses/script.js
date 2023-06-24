const body = document.querySelector("body");
const html = document.querySelector("html");
let texts;
let freezer;
let fridge;
let pantry;
let receipes;
let foods;
let storageUnits;
let local;
let unitPreference;
let lastScreen;
let memoQty;
let memoFoodName;
let allOwnedFoods = [];

class Food {
  constructor(name, expiration) {
    this.name = name;
    this.expiration = expiration;
  }
}
class Receipe {
  constructor(name, totalPrepTime, nPeople, requiredFoods, instructions) {
    this.name = name;
    this.nPeople = nPeople;
    this.totalPrepTime = totalPrepTime;
    this.requiredFoods = requiredFoods;
    this.instructions = instructions;
  }
}

function setLocal() {
  for (k in storageUnits) {
    for (j in storageUnits[k].content) {
      if (storageUnits[k].content[j] == 0) {
        delete storageUnits[k].content[j];
      }
    }
  }
  localStorage.setItem("storageUnits", JSON.stringify(storageUnits));
  localStorage.setItem("unitPreference", JSON.stringify(unitPreference));
  localStorage.setItem("lastScreen", JSON.stringify(lastScreen));
}

function initialize() {
  freezer = {
    name: "freezer",
    brand: "",
    content: {},
  };

  fridge = {
    name: "fridge",
    brand: "",
    content: {},
  };

  pantry = {
    name: "pantry",
    content: {},
  };

  receipes = {};

  foods = {};

  storageUnits = {
    freezer,
    fridge,
    pantry,
    receipes,
    foods,
  };

  unitPreference = "pantry";
  lastScreen = "Storage";

  setLocal();
}

function buttonClickEvent() {
  let notReady = ["Meals", "Grocery list"];
  console.log(this.innerHTML); //le dom element qui a été clické
  if (notReady.includes(this.innerHTML)) {
    alert("this page isn't ready yet !");
    return;
  }
  if (this.innerHTML === "Reinitialize") {
    if (confirm("Are you sure you want to erase the database ?")) {
      initialize();
    } else {
      console.log("good choice");
    }
    return;
  }
  body.removeChild(document.querySelector(".display"));
  if (this.innerHTML === "Food") {
    food();
  }
  if (this.innerHTML === "Storage") {
    storage();
  }

  if (this.innerHTML === "Receipes"){
    receipe();
  }
}

if (localStorage.storageUnits == "undefined") {
  initialize();
}
function addButtons() {
  const buttons = document.createElement("div");
  buttons.id = "buttons";

  const button1 = document.createElement("button");
  button1.innerHTML = "Reinitialize";
  button1.classList = "but";
  buttons.appendChild(button1);

  const button2 = document.createElement("button");
  button2.classList = "but";
  button2.innerHTML = "Food";

  const button3 = document.createElement("button");
  button3.classList = "but";
  button3.innerHTML = "Receipes";

  const button4 = document.createElement("button");
  button4.classList = "but";
  button4.innerHTML = "Meals";

  const button5 = document.createElement("button");
  button5.classList = "but";
  button5.innerHTML = "Grocery list";

  const button6 = document.createElement("button");
  button6.classList = "but";
  button6.innerHTML = "Storage";

  let buttonList = [button1, button6, button2, button3, button4, button5];
  for (but in buttonList) {
    buttonList[but].addEventListener("click", buttonClickEvent);
    buttons.appendChild(buttonList[but]);
  }
  body.appendChild(buttons);
}
function start() {
  storageUnits = JSON.parse(localStorage.storageUnits);
  console.log(localStorage);
  freezer = storageUnits.freezer;
  fridge = storageUnits.fridge;
  pantry = storageUnits.pantry;
  foods = storageUnits.foods;
  receipes = storageUnits.receipes;
  unitPreference = JSON.parse(localStorage.unitPreference);
  lastScreen = JSON.parse(localStorage.lastScreen);
  console.log(lastScreen);
  addButtons();
}
start();

//storage display
function storage() {
  let storage = document.createElement("div");
  storage.id = "storage";
  storage.classList = "display";
  body.appendChild(storage);

  for (unit in storageUnits) {
    if (unit === "foods" || unit === "receipes") {
      continue;
    }
    const storageUnit = document.createElement("div");
    storageUnit.classList = "storageUnit";
    const unitName = document.createElement("div");
    unitName.innerHTML = unit;
    unitName.id = unit;
    unitName.classList = "unit";
    storageUnit.appendChild(unitName);
    const content = document.createElement("table");
    const heads = document.createElement("tr");
    const head1 = document.createElement("th");
    const head2 = document.createElement("th");
    head1.innerHTML = "food";
    head2.innerHTML = "quantity";
    heads.appendChild(head1);
    heads.appendChild(head2);
    content.appendChild(heads);
    for (key in storageUnits[unit].content) {
      let row = document.createElement("tr");
      let food = document.createElement("td");
      let quantity = document.createElement("td");
      food.innerHTML = key;
      quantity.innerHTML = storageUnits[unit].content[key];
      row.appendChild(food);
      row.appendChild(quantity);
      content.appendChild(row);
    }
    storageUnit.appendChild(content);
    storage.appendChild(storageUnit);
  }
}
function food() {
  lastScreen = "Food";
  let food = document.createElement("div");
  food.id = "food";
  food.classList = "display";
  body.appendChild(food);
  const division = document.createElement("div");
  division.classList = "division";
  for (unit in storageUnits) {
    if (unit === "foods" || unit === "receipes") {
      continue;
    }
    const storageUnit = document.createElement("div");
    storageUnit.classList = "storageUnit";
    const unitName = document.createElement("div");
    unitName.innerHTML = unit;
    unitName.id = unit;
    unitName.classList = "unit";
    storageUnit.appendChild(unitName);
    const content = document.createElement("table");
    content.classList = "content";
    const heads = document.createElement("tr");
    const head1 = document.createElement("th");
    const head2 = document.createElement("th");
    head1.innerHTML = "food";
    head2.innerHTML = "quantity";
    heads.appendChild(head1);
    heads.appendChild(head2);
    content.appendChild(heads);
    for (key in storageUnits[unit].content) {
      let row = document.createElement("tr");
      let food = document.createElement("td");
      let quantity = document.createElement("td");
      let value = document.createElement("input");
      value.type = "text";
      value.id = key;
      value.classList = "value";
      food.innerHTML = key;
      value.placeholder = storageUnits[unit].content[key];
      quantity.appendChild(value);
      row.appendChild(food);
      row.appendChild(quantity);
      content.appendChild(row);
    }
    storageUnit.appendChild(content);
    division.appendChild(storageUnit);
  }

  food.appendChild(division);
  const form = document.createElement("div");
  form.id = "addFood";
  const newFood = document.createElement("input");
  newFood.id = "newFood";
  newFood.type = "text";
  const newQty = document.createElement("input");
  newQty.id = "newQty";
  newQty.type = "text";
  const add = document.createElement("img");
  add.src =
    "https://tse2.mm.bing.net/th?id=OIP.b4I3KyyADoQ-G0FJzUY4bwHaHa&pid=Api";
  add.id = "greenBut";
  add.addEventListener("click", function () {
    memoFoodName = document.querySelector("#newFood").value;
    memoQty = document.querySelector("#newQty").value;
    if (memoFoodName && memoQty) {
      storageUnits[unitPreference].content[memoFoodName] = memoQty;
    }
    memoFoodName = undefined;
    memoFoodName = undefined;
  });

  const chooseStorage = document.createElement("div");
  let unitsNames = ["freezer", "fridge", "pantry"];
  for (n in unitsNames) {
    const radioButton = document.createElement("input");
    const radioLabel = document.createElement("label");
    radioButton.type = "radio";
    radioButton.innerHTML = unitsNames[n];
    radioLabel.innerHTML = unitsNames[n];
    radioButton.classList = "radio";
    radioButton.id = unitsNames[n];
    radioLabel.for = unitsNames[n];
    radioButton.name = "unitName";
    radioButton.value = unitsNames[n];
    if (unitsNames[n] === unitPreference) {
      radioButton.checked = "checked";
    }

    radioButton.addEventListener("click", function (e) {
      console.log(this);
      unitPreference = this.value;
    });

    chooseStorage.appendChild(radioButton);
    chooseStorage.appendChild(radioLabel);
  }

  form.appendChild(newFood);
  form.appendChild(newQty);
  form.appendChild(chooseStorage);
  form.appendChild(add);
  food.appendChild(form);
}

function receipe(){
  lastScreen = "Receipes";
  let food = document.createElement("div");
  food.id = "food";
  food.classList = "display";
  body.appendChild(food);
  const division = document.createElement("div");
  division.classList = "division";
  for (unit in storageUnits) {
    if (unit === "foods" || unit === "receipes") {
      continue;
    }
    const storageUnit = document.createElement("div");
    storageUnit.classList = "storageUnit";
    const unitName = document.createElement("div");
    unitName.innerHTML = unit;
    unitName.id = unit;
    unitName.classList = "unit";
    storageUnit.appendChild(unitName);
    const content = document.createElement("table");
    content.classList = "content";
    const heads = document.createElement("tr");
    const head1 = document.createElement("th");
    const head2 = document.createElement("th");
    head1.innerHTML = "food";
    head2.innerHTML = "quantity";
    heads.appendChild(head1);
    heads.appendChild(head2);
    content.appendChild(heads);
    for (key in storageUnits[unit].content) {
      let row = document.createElement("tr");
      let food = document.createElement("td");
      let quantity = document.createElement("td");
      let value = document.createElement("input");
      value.type = "text";
      value.id = key;
      value.classList = "value";
      food.innerHTML = key;
      value.placeholder = storageUnits[unit].content[key];
      quantity.appendChild(value);
      row.appendChild(food);
      row.appendChild(quantity);
      content.appendChild(row);
    }
    storageUnit.appendChild(content);
    division.appendChild(storageUnit);
  }

  food.appendChild(division);
  const form = document.createElement("div");
  form.id = "addFood";
  const newFood = document.createElement("input");
  newFood.id = "newFood";
  newFood.type = "text";
  const newQty = document.createElement("input");
  newQty.id = "newQty";
  newQty.type = "text";
  const add = document.createElement("img");
  add.src =
    "https://tse2.mm.bing.net/th?id=OIP.b4I3KyyADoQ-G0FJzUY4bwHaHa&pid=Api";
  add.id = "greenBut";
  add.addEventListener("click", function () {
    memoFoodName = document.querySelector("#newFood").value;
    memoQty = document.querySelector("#newQty").value;
    if (memoFoodName && memoQty) {
      storageUnits[unitPreference].content[memoFoodName] = memoQty;
    }
    memoFoodName = undefined;
    memoFoodName = undefined;
  });

  const chooseStorage = document.createElement("div");
  let unitsNames = ["freezer", "fridge", "pantry"];
  for (n in unitsNames) {
    const radioButton = document.createElement("input");
    const radioLabel = document.createElement("label");
    radioButton.type = "radio";
    radioButton.innerHTML = unitsNames[n];
    radioLabel.innerHTML = unitsNames[n];
    radioButton.classList = "radio";
    radioButton.id = unitsNames[n];
    radioLabel.for = unitsNames[n];
    radioButton.name = "unitName";
    radioButton.value = unitsNames[n];
    if (unitsNames[n] === unitPreference) {
      radioButton.checked = "checked";
    }

    radioButton.addEventListener("click", function (e) {
      console.log(this);
      unitPreference = this.value;
    });

    chooseStorage.appendChild(radioButton);
    chooseStorage.appendChild(radioLabel);
  }

  form.appendChild(newFood);
  form.appendChild(newQty);
  form.appendChild(chooseStorage);
  form.appendChild(add);
  food.appendChild(form);
}

function displayLastScreen() {
  console.log("lastScreen :", lastScreen);
  if (lastScreen === "Food") {
    food();
    document.querySelector("#newFood").focus();
  }
  if (lastScreen === "Storage") {
    storage();
  }
  if(lastScreen ==="Receipes"){
    receipe();
  }
}
displayLastScreen();

function editFoodEvent(e) {
  if (e.key === "Enter") {
    console.log("enter has been pressed");
    texts = document.querySelectorAll("input[type='text']");
    texts.forEach(function (e) {
      if (e.value) {
        console.log(e.id);
        if (e.id == "newQty") {
          memoQty = e.value;
        }
        if (e.id === "newFood") {
          memoFoodName = e.value;
        }
        if (memoFoodName && memoQty) {
          storageUnits[unitPreference].content[memoFoodName] = memoQty;
          console.log(storageUnits[unitPreference].content[memoFoodName]);
          memoFoodName = undefined;
          memoFoodName = undefined;
        }
        if (allOwnedFoods.includes(e.id)) {
          let currentUnit =
            e.parentElement.parentElement.parentElement.previousSibling.id;
          storageUnits[currentUnit].content[e.id] = e.value;
        }
      }
    });
    window.location.reload();
  }
}

window.addEventListener("keydown", editFoodEvent);
window.addEventListener("beforeunload", setLocal);
window.addEventListener("load", () => {
  for (key in storageUnits) {
    if (key === "foods" || key === "receipes") {
      continue;
    }
    for (k in storageUnits[key].content) {
      allOwnedFoods.push(k);
    }
  }
});
