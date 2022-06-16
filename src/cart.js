const label = $("#label");
const shoppingCart = $("#shopping-cart");

setTimeout(() => {
  basket.reverse();
}, 0);

function generateCart() {
  if (basket.length > 0) {
    const data = basket.map((item) => {
      const search = shopItemsData.find((itemB) => itemB.id === item.id) || [];
      const { id, name, price, img } = search;

      return `
			<div class="cart-item">
				<img src="${img}" alt="${id + "-" + name}" />
				<div class="details">
					<div class="title-price-x">
						<h4 class="title-price">
							<p>${name}</p>
							<div class="cart-item-price">$ ${price}</div>
						</h4>
						<i class="fa-solid fa-xmark" onclick="removeItem(${id})"></i>
					</div>
					<div class="cart-buttons">
						<i class="fa-solid fa-minus" onclick={decrement(${id})}></i>
						<p id="${id}" class="quantity"> ${item.quantity} </p>
						<i class="fa-solid fa-plus" onclick={increment(${id})}></i>
					</div>
					<h3>$ ${price * item.quantity}</h3>
				</div>
			</div>
		`;
    });

    shoppingCart.innerHTML = data.join("");
  } else {
    label.innerHTML = `
		<h2>Your cart is empty</h2>
		<p class="n-c-description">Please add some products to your cart</p>
		<a href="index.html" class="n-c-button">Back to homepage</a>
	`;
    shoppingCart.innerHTML = "";
  }
}

const removeItem = (id) => {
  const selectedItem = id;

  basket = basket.filter((item) => item.id !== selectedItem.id);

  calculation();

  generateCart();

  totalAmount();

  localStorage.setItem("basket", JSON.stringify(basket));
};

const removeItemAll = () => {
  basket = [];

  calculation();

  generateCart();

  localStorage.setItem("basket", JSON.stringify(basket));
};

const totalAmount = () => {
  if (basket.length > 0) {
    const amount = basket
      .map((item) => {
        const { id, quantity } = item;
        const search = shopItemsData.find((itemB) => itemB.id === id) || [];

        return search.price * quantity;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
			<h2>Total Bill: $ ${amount}</h2>
			<button id="checkout">Checkout</button>
			<button id="remove-all" onclick="removeItemAll()">Clear Cart</button>
		`;
  } else return;
};

window.onload = () => {
  generateCart();

  calculation();

  totalAmount();
};
