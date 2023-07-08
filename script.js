async function callProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    const gadgets = document.getElementById("gadgets");
    const fashion = document.getElementById("fashion");
    const itemBox = document.getElementById("item_box");
    const jewelery = document.getElementById("jewelery");
    const womenFashion = document.getElementById("womenFashion");
    // Event handle when click on gadgets
    // console.log(products);
    gadgets.addEventListener("click", () => {
      itemBox.innerHTML = "";
      const electronics = products.filter((eachItem) => {
        return eachItem.category === "electronics";
      });

      if (electronics.length > 0) {
        console.log(electronics);
        itemBox.innerHTML = electronics
          .map(
            (data) => `
           <div class="flex flex-col g-2 ph-1" style="width: 25rem">
           <img
            class="product-img"
            src="${data.image}"
            alt="iphone_img"
          />
          <h2>${data.title}</h2>
          <p>
            <span style="font-size: 2rem">$${data.price}</span> M.R.P:
            <del style="color: rgba(62, 72, 85, 0.59)">$2,00</del>
          </p>
          <p>Rating: ${data.rating.rate}</p>
          <button class="addTocart">Add to cart</button>
        </div>  
        `
          )
          .join("");
      } else {
        console.log(electronics.length);
      }
    });
    // men's fashion
    fashion.addEventListener("click", () => {
      itemBox.innerHTML = "";
      const checking = products.filter((eachItem) => {
        return eachItem.category === "men's clothing" && "women's clothing";
      });

      if (checking.length > 0) {
        console.log(checking);
        itemBox.innerHTML = checking
          .map(
            (data) => `
           <div class="flex flex-col g-2 ph-1" style="width: 25rem">
           <img
            class="product-img"
            src="${data.image}"
            alt="iphone_img"
          />
          <h2>${data.title}</h2>
          <p>
            <span style="font-size: 2rem">$${data.price}</span> M.R.P:
            <del style="color: rgba(62, 72, 85, 0.59)">$2,00</del>
          </p>
          <p>Rating: ${data.rating.rate}</p>
          <button class="addTocart">Add to cart</button>
        </div>  
        `
          )
          .join("");
      } else {
        console.log(checking.length);
      }
    });
    // jewelery section
    jewelery.addEventListener("click", () => {
      itemBox.innerHTML = "";
      const jeweleryItems = products.filter((eachItem) => {
        return eachItem.category === "jewelery";
      });

      if (jeweleryItems.length > 0) {
        console.log(jeweleryItems);
        itemBox.innerHTML = jeweleryItems
          .map(
            (data) => `
           <div class="flex flex-col g-2 ph-1" style="width: 25rem">
           <img
            class="product-img"
            src="${data.image}"
            alt="iphone_img"
          />
          <h2>${data.title}</h2>
          <p>
            <span style="font-size: 2rem">$${data.price}</span> M.R.P:
            <del style="color: rgba(62, 72, 85, 0.59)">$2,00</del>
          </p>
          <p>Rating: ${data.rating.rate}</p>
          <button class="addTocart">Add to cart</button>
        </div>  
        `
          )
          .join("");
      } else {
        console.log(jeweleryItems.length);
      }
    });

    // Women's Clothes section
    womenFashion.addEventListener("click", () => {
      itemBox.innerHTML = "";
      const womenFashionItems = products.filter((eachItem) => {
        return eachItem.category === "women's clothing";
      });

      if (womenFashionItems.length > 0) {
        console.log(womenFashionItems);
        itemBox.innerHTML = womenFashionItems
          .map(
            (data) => `
           <div class="flex flex-col g-2 ph-1" style="width: 25rem">
           <img
            class="product-img"
            src="${data.image}"
            alt="iphone_img"
          />
          <h2>${data.title}</h2>
          <p>
            <span style="font-size: 2rem">$${data.price}</span> M.R.P:
            <del style="color: rgba(62, 72, 85, 0.59)">$2,00</del>
          </p>
          <p>Rating: ${data.rating.rate}</p>
          <button class="addTocart">Add to cart</button>
        </div>  
        `
          )
          .join("");
      } else {
        console.log("error", womenFashionItems.length);
      }
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

callProducts();

/* // Fetches products from the API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch products from the API");
  }
}

// Filters products based on the provided category
function filterProductsByCategory(products, category) {
  return products.filter((product) => product.category === category);
}

// Renders the products on the page
function renderProducts(products) {
  const itemBox = document.getElementById("item_box");
  itemBox.innerHTML = "";

  if (products.length > 0) {
    itemBox.innerHTML = products
      .map(
        (data) => `
          <div class="flex flex-col g-2 ph-1" style="width: 25rem">
            <img class="product-img" src="${data.image}" alt="product_image" />
            <h2>${data.title}</h2>
            <p>
              <span style="font-size: 2rem">$${data.price}</span> M.R.P:
              <del style="color: rgba(62, 72, 85, 0.59)">$2,00</del>
            </p>
            <p>Rating: ${data.rating.rate}</p>
            <button class="addToCart">Add to Cart</button>
          </div>  
        `
      )
      .join("");
  } else {
    console.log("No products found.");
  }
}

// Event handler for category click
function handleCategoryClick(category) {
  return async () => {
    try {
      const products = await fetchProducts();
      const filteredProducts = filterProductsByCategory(products, category);
      renderProducts(filteredProducts);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
}

// Attach event listeners to category elements
function attachEventListeners() {
  const gadgets = document.getElementById("gadgets");
  const fashion = document.getElementById("fashion");
  const jewelery = document.getElementById("jewelery");
  const womenFashion = document.getElementById("womenFashion");

  gadgets.addEventListener("click", handleCategoryClick("electronics"));
  fashion.addEventListener("click", handleCategoryClick("men's clothing"));
  jewelery.addEventListener("click", handleCategoryClick("jewelery"));
  womenFashion.addEventListener("click", handleCategoryClick("women's clothing"));
}

// Entry point
function initialize() {
  attachEventListeners();
}

// Call the initialize function to start the application
initialize();
   */
