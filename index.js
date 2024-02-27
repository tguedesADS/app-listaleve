import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://my-first-project-whattobuy-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addButton = document.getElementById("add-button");
const inputField = document.getElementById("input-field");
const itemList = document.getElementById("shopping-list");

addButton.addEventListener("click", function () {
  let inputValue = inputField.value;

  push(shoppingListInDB, inputValue);

  clearInputField();
});

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearItemList();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      addItemList(currentItem);
    }
  } else {
    itemList.innerHTML = "Ainda não há item...";
  }
});

function clearItemList() {
  itemList.innerHTML = "";
}

function clearInputField() {
  inputField.value = "";
}

function addItemList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newList = document.createElement("li");

  newList.textContent = itemValue;

  itemList.append(newList);
  newList.addEventListener("click", function () {
    let exactLocationShoppingListInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationShoppingListInDB);
  });
}
