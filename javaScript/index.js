eventListeners();
function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    loadJson();
  });

  window.addEventListener("DOMContentLoaded", () => {
    loadJson();

    //Toggle nav bar
    togglerBtn.addEventListener("click", () => {
      navBarCollapse.classList.toggle("show-navbar");
    });

    //show/hide cart
    cartBtnOpen.addEventListener("click", () => {
      shoppingCartContainer.classList.toggle("show-shopping-cart-container");
      toggleShoppingCart();
    });
  });
}
//  Fetch
const iphoneContainer = document.querySelector(".iphone-container");

const url =
  "https://gist.githubusercontent.com/MaorOvadya/a845d52840589b775eaa6c5cee8073be/raw/319b50c9468c0d37c8579cce75c0c3a815029ffb/iPhone.json";

const loadJson = function loadJson() {};
fetch(url)
  .then((Response) => Response.json())
  .then((data) => {
    addData(data);
  })
  .catch((error) => {
    console.log(error);
  });

const addData = function addData(data) {
  console.log(data);
  let html = "";
  data.forEach((iphone) => {
    html += `<div class="item-iphone" id="${iphone.id}">
    <div class="id"></div>
    <div class="iphone-img"><img src="${iphone.iphoneimg}" alt=""></div>
      <div class="iphone-item-info">
        <div class="iphone-title">${iphone.iphonetitle}</div>
        <div class="iphone-description1">${iphone.iphonedescription1}</div>
        <div class="iphone-description2">${iphone.iphonedescription2}</div>
        <div class="iphone-description3">${iphone.iphonedescription3}</div>
        <div class="iphone-price"><span>Price: $${iphone.iphoneprice}</span></div>
      </div>

      <div class="iphone-item-quantity">
        <button type="button" class="iphone-add-btn"><i class="bi bi-plus-square-fill"></i></button>
        <input type="number" value="1" min="1" class="iphone-inputBox">
        <button type="button" class="iphone-reduce-btn"><i class="bi bi-dash-square-fill"></i></button>
      </div>
      <div class="iphone-add-container">
        <button type="button" class="iphone-add-btn"><i class="bi bi-cart-plus-fill"></i>
        </button>
      </div>
    </div>`;
  });

  iphoneContainer.innerHTML = html;
  addShoppingCart(data);
};

//Toggle Menu Bar
const togglerBtn = document.querySelector(".nav-bar-toggler[type=button]");
const navBarCollapse = document.querySelector(".navBar-collapse");

//Toggle Shopping Cart
const cartBtnOpen = document.querySelector(".cart-btn");
const shoppingCartContainer = document.querySelector(
  ".shopping-cart-container"
);
const cartBtnExit = document.querySelector(".cart-exit-btn");

function toggleShoppingCart() {
  if (shoppingCartContainer.style.display === "none") {
    shoppingCartContainer.style.display = "block";
  } else {
    shoppingCartContainer.style.display = "none";
  }
}

//Remove item from cart
const itemBox = document.querySelector(".item-box");

//Add item to shopping cart
function makeNewEl(iphone, clickedId) {
  const iphonecartItem = document.createElement("div");

  iphonecartItem.classList.add("itemBox");
  iphonecartItem.innerHTML = `<div class="cart-item">
  <div class="iphone-img"><img src="${iphone[clickedId].iphoneimg}" alt=""></div>
  <div class="cart-item-info">
    <div class="item-title">${iphone[clickedId].iphonetitle}</div>
    <div class="item-description">${iphone[clickedId].iphonedescription1}</div>
    <div class="item-description">${iphone[clickedId].iphonedescription2}</div>
    <div class="item-description">${iphone[clickedId].iphonedescription3}</div>
  </div>
  <div class="cart-item-price">
    <div class="item-price">$${iphone[clickedId].iphoneprice}</div>
  </div>
  <div class="cart-item-quantity">
    <button type="button" class="item-add-btn"><i class="bi bi-plus-square-fill"></i></button>
    <input type="number" value="1" min="1" class="item-inputBox">
    <button type="button" class="item-reduce-btn"><i class="bi bi-dash-square-fill"></i></button>
  </div>

<div class="item-delete-container">
  <button class="item-delete-btn"><i class="bi bi-bag-x-fill"></i></button>
</div>
</div> `;

  itemBox.appendChild(iphonecartItem);
  removeItemFromCart();

  calcCost(iphone[clickedId].iphoneprice); // added new function
}

function addShoppingCart(data) {
  const addItemBtn = document.querySelectorAll(".iphone-add-btn");
  const itemCountInfo = document.querySelector(".cart-count-info");
  // const totalCost = document.querySelector('.total-cost h3 span') // not here

  addItemBtn.forEach((addItemBtn) => {
    addItemBtn.addEventListener("click", () => {
      if (addItemBtn) {
        // calculate() // No need anymore
        itemCountInfo.innerHTML++;
        makeNewEl(
          data,
          addItemBtn.parentNode.parentNode.getAttribute("id") - 1
        );
      }
    });
  });
}

function removeItemFromCart() {
  const removeItemBtn = document.querySelectorAll(".item-delete-btn");
  const itemCountInfo = document.querySelector(".cart-count-info");
  removeItemBtn.forEach((removeItemBtn) => {
    removeItemBtn.addEventListener("click", () => {
      if (removeItemBtn) {
        itemCountInfo.innerHTML--;
        removeItemBtn.parentElement.parentElement.remove();
      }
    });
  });
}

// new calc function

let sum = 0;
function calcCost(itemPrice) {
  const totalCost2 = document.querySelector(
    ".item-total-cost .total-cost span"
  ); // changed

  sum += itemPrice;
  console.log(sum);
  totalCost2.textContent = sum;
}
