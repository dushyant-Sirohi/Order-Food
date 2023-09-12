import axios from "axios";
const Noty = require("noty");

const foodBtn = document.querySelectorAll(".add-to-cart");
const cartCounter = document.querySelector("#cartCounter");

function updateCart(food) {
  axios
    .post("/update-cart", food)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 1000,
        layout: "topRight",
        text: "Added to Cart",
        progressBar: false,
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        layout: "topRight",
        text: "Something went wrong",
        progressBar: false,
      }).show();
    });
}

foodBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    updateCart(JSON.parse(btn.dataset.food));
  });
});
