const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let basket = JSON.parse(localStorage.getItem("basket")) || [];
const cartAmount = $("#cart-amount");

const calculation = () => {
  const amount = basket.map((item) => item.quantity).reduce((x, y) => x + y, 0);
  cartAmount.innerText = amount;
};

const decrement = (id) => {
  const selectedItem = id;
  const search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) return;
  else {
    if (search.quantity === 0) return;
    else {
      search.quantity--;
    }
  }

  basket = basket.filter((item) => item.quantity !== 0);

  window.location.pathname === "/cart.html" && generateCart();
  window.location.pathname === "/cart.html" && totalAmount();

  update(selectedItem.id);

  localStorage.setItem("basket", JSON.stringify(basket));
};

const increment = (id) => {
  const selectedItem = id;
  const search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      quantity: 1,
    });
  } else {
    search.quantity++;
  }

  window.location.pathname === "/cart.html" && generateCart();
  window.location.pathname === "/cart.html" && totalAmount();

  update(selectedItem.id);

  localStorage.setItem("basket", JSON.stringify(basket));
};

const update = (id) => {
  const search = basket.find((item) => item.id === id);

  search !== undefined
    ? ($(`#${id}`).innerText = search.quantity)
    : ($(`#${id}`).innerText = 0);

  calculation();
};
