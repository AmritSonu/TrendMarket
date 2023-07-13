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
// Image scroll-X bar
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
function mainProducts() {}
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
         <div class="flex flex-col g-2 ph-1" style="width: 25rem" data-product-cart>
           <img
            class="product-img"
            src="${data.image}"
            alt="iphone_img"
          />
          <h2>${data.title}</h2>
          <div class="flex space-between">
         <div>
          <p>
            <span style="font-size: 2rem">$${data.price}</span> M.R.P:
            <del style="color: rgba(62, 72, 85, 0.59)">$2,00</del>
          </p>
          </div>
          <div>
         <a href="#">
         <svg id="addToFav" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=".5" stroke="currentColor" class="w-6 h-6 header-svg">
         <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
         </svg>
         </a>
          </div>
          </div>
          <p>Rating: ${data.rating.rate}</p>
          <button class="addTocart">Add to cart</button>
        </div>  
        `
      )
      .join("");
    WishList();
    // Wait for the next event loop iteration before accessing the productCart element
    setTimeout(() => {
      const productCart = document.querySelector("[data-product-cart]");
      console.log(productCart.innerHTML);
      // You can now use the productCart element and its value as needed
    }, 0);
  } else {
    console.log("No products found.");
  }
}

// Event handler for category click
function handleCategoryClick(category) {
  return async (event) => {
    event.preventDefault();
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
// Add the feature of to Favourite category
function WishList() {
  const addToFav = document.querySelectorAll("#addToFav");
  let wishlist_count = document.querySelector(".wishlist_count");
  let countFav = 0;
  // handle counting items...
  handleAddToFav(addToFav, countFav, wishlist_count);
}
// Add item to Wishlist
function handleAddToFav(addToFav, countFav, wishlist_count) {
  addToFav.forEach((eachFav) => {
    eachFav.addEventListener("click", (event) => {
      event.preventDefault();
      const computedStyle = window.getComputedStyle(eachFav);
      const fillStyle = computedStyle.getPropertyValue("fill");

      // check item is Select or not
      if (fillStyle === "none") {
        eachFav.style.fill = "red";
        countFav += 1;
      } else {
        eachFav.style.fill = "none";
        countFav -= 1;
      }
      // add counting of favourite item inside wishlist
      wishlist_count.textContent = countFav;
    });
  });
}
//  toggle wishlist button when click on it.
function handleWishlistPage() {
  const wishlistIcon = document.querySelector("#wishlist_icon");
  const wishlistBox = document.querySelector(".wishlist");

  wishlistIcon.addEventListener("click", () => {
    console.log("clicked!");
    wishlistBox.classList.toggle("disNone");
  });
}
handleWishlistPage();

// Entry point
function initialize() {
  attachEventListeners();
}
// Call the initialize function to start the application
initialize();
