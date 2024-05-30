const container = document.querySelector("#product-container");
const cartConatiner = document.querySelector("#cartItem-container");
const totalCoseEl = document.querySelector("#total-cost");
const itemCountEl = document.querySelector("#item-count");

// fetch product data
async function fetchProduct() {
  const res = await fetch("https://dummyjson.com/products/search?q=play");
  const { products } = await res.json();

  products.forEach(
    ({
      id,
      title,
      description,
      price,
      discountPercentage,
      rating,
      thumbnail,
    }) => {
      container.innerHTML += `
      <div class="card max-w-96 mx-auto bg-gray-700 text-gray-100 relative">
      <div class="badge badge-light absolute z-10 right-6 top-4"> approx: ${Math.ceil(
        rating
      )}%</div>
      <figure>
        <img
          src=${thumbnail}
          alt=${title}
          class="h-64 w-full scale-90 object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
        ${title.length > 28 ? title.slice(0, 28) + "..." : title}
         
        </h2>
        <p class="leading-5 text-justify"> ${
          description.length > 150
            ? description.slice(0, 150) + "..."
            : description
        }</p>
        <p class="text-2xl">
        <span class="">${parseFloat(price - discountPercentage).toFixed(
          2
        )}$</span>
        <span class="line-through">${parseFloat(price).toFixed(2)}$</span>
        </p>
        <div class="card-actions justify-end">
         <button onclick="addToCart(${id})" class="uppercase p-2 text-md font-medium border-2 rounded-md bg-gray-700 w-full text-gray-200 hover:bg-gray-900 transition-colors duration-500">add to cart</button>
        </div>

      </div>
    </div>
      `;
    }
  );
  displayItem();
}

// add to cart
function addToCart(id) {
  const getCartItem = JSON.parse(localStorage.getItem("cart")) || {};
  if (getCartItem[id]) {
    getCartItem[id] += 1;
  } else {
    getCartItem[id] = 1;
  }
  localStorage.setItem("cart", JSON.stringify(getCartItem));
  window.location.reload();
  displayItem();
}

// delete Cart
function deleteCart(id) {
  // Retrieve the cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // If the product exists in the cart, decrease the quantity
  if (cart[id]) {
    cart[id] -= 1;

    // If the quantity reaches 0, remove the item from the cart
    if (cart[id] === 0) {
      delete cart[id];
    }
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
  displayItem();
}

function getitem() {
  const getCartItem = JSON.parse(localStorage.getItem("cart")) || {};
  return getCartItem;
}

async function displayItem() {
  const getCartItem = getitem();

  let cart = [];
  const res = await fetch("https://dummyjson.com/products/search?q=play");
  const { products } = await res.json();
  for (const key in getCartItem) {
    console.log();
    const cartItem = products.find((v) => v.id == key);
    cart.push({ quantity: getCartItem[key], ...cartItem });
  }
  console.log(cart);
  cart.forEach(
    ({ thumbnail, title, discountPercentage, price, quantity, id }) => {
      cartConatiner.innerHTML += `
  <div
  class="p-2 rounded-md text-white bg-gray-800 flex items-start gap-2"
>
  <!-- * cart image -->
  <div class="h-28 w-28 rounded-lg bg-gray-700">
    <img
      class="h-full w-full object-cover"
      src=${thumbnail}
      alt=""
    />
  </div>
  <!-- * cart text -->
  <div class="h-full font-medium text-xl space-y-2">
    <h1> ${title.length > 15 ? title.slice(0, 15) + "..." : title}</h1>
    <p class="text-lg">Price : <span>${parseFloat(
      (price - discountPercentage) * parseInt(quantity)
    ).toFixed(2)}$</span></p>
    <div
      class="flex justify-center  w-32 items-center gap-2 border-2 border-gray-600 rounded-md p-1"
    >
      <button class="text-2xl px-2" onclick="deleteCart(${id})">-</button>
      <input
        class="max-w-10 text-sm bg-transparent text-center focus:outline-none"
        type="text"
        value=${parseInt(quantity)}
        readonly
      />
      <button class="text-2xl px-2" onclick="addToCart(${id})">+</button>
    </div>
  </div>
</div>
  `;
    }
  );
  const totalCost = cart
    .reduce(
      (sum, { price, discountPercentage, quantity }) =>
        parseFloat((price - discountPercentage) * parseInt(quantity)) + sum,
      0
    )
    .toFixed(2);
  const itemCount = cart.reduce(
    (sum, { quantity }) => parseInt(quantity) + sum,
    0
  );
  // const itemCount = cart.map((item) => item.quantity);
  itemCountEl.innerHTML = itemCount;
  totalCoseEl.innerHTML = totalCost+"$";
}

fetchProduct();
