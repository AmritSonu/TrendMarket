"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let open = document.querySelector(".show");

  open.addEventListener("click", () => {
    let toggleBar = document.querySelector(".toggle_bar");
    console.log("clicked!");
    toggleBar.classList.toggle("hide");
  });
});
