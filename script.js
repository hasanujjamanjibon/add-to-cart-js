const container = document.querySelector("#product-container");

// fetch product data
async function fetchProduct() {
  const res = await fetch("https://dummyjson.com/products/search?q=play");
  const { products } = await res.json();
  console.log(products);
  console.log(products?.length);
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
      console.log(
        id,
        title,
        description,
        price,
        discountPercentage,
        rating,
        thumbnail
      );

      container.innerHTML += `
      <div class="card max-w-96 mx-auto bg-gray-700 text-gray-100 relative">
      <div class="badge badge-light absolute z-10 right-6 top-4"> approx: ${Math.ceil(rating)}%</div>
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
         <button class="uppercase p-2 text-md font-medium border-2 rounded-md bg-gray-700 w-full text-gray-200 hover:bg-gray-900 transition-colors duration-500">add to cart</button>
        </div>
      </div>
    </div>
      `;
    }
  );
}

fetchProduct();
