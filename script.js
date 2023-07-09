"use-strict";
// Fetches products from the API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch products from the API");
  }
}
const itemBox = document.getElementById("item_box");
const slideImages = [
  {
    img: "https://assets.ajio.com/cms/AJIO/WEB/09072023-UHP-D-MAIN-P5-ivocDennislingo-starting499extraupto35.jpg",
  },

  {
    img: "https://assets.ajio.com/cms/AJIO/WEB/09072023-UHP-D-Top-P4-budajeansfyrerose-min50.jpg ",
  },
  {
    img: "https://assets.ajio.com/cms/AJIO/WEB/09072023-UHP-D-Top-P4-budajeansfyrerose-min50.jpg ",
  },
  {
    img: "https://assets.ajio.com/cms/AJIO/WEB/09072023-UHP-D-MAIN-P5-ivocDennislingo-starting499extraupto35.jpg",
  },
  {
    img: "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618571140235/mobile-offers.jpg",
  },
];
function ImageSlider() {
  const itemBox = document.getElementById("img_box"); // Updated to match the HTML id
  slideImages.map((eachImage) => {
    const img = document.createElement("img");
    img.src = eachImage.img;
    img.alt = "img";
    img.classList.add("slide_img");
    itemBox.appendChild(img);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  ImageSlider();
});

// Filters products based on the provided category
function filterProductsByCategory(products, category) {
  return products.filter((product) => product.category === category);
}

// Renders the products on the page
function renderProducts(products) {
  itemBox.innerHTML = "";

  if (products.length > 0) {
    itemBox.innerHTML = products
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
  womenFashion.addEventListener(
    "click",
    handleCategoryClick("women's clothing")
  );
}

// Entry point
function initialize() {
  attachEventListeners();
}
// Call the initialize function to start the application
initialize();
