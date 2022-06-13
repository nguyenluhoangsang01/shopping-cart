const shop = $("#shop");

function generateItem(itemData, wrapper) {
  const data = itemData.map((item) => {
    let { id, name, price, desc, img } = item;
    const search = basket.find((item) => item.id === id);

    return `
			<div class="item" id="product-${id}">
				<div class="images">
					<img src="${img}" alt="${id + "-" + name}" />
				</div>
				<div class="details">
					<h3>${name}</h3>
					<p>${desc}</p>
					<div class="price-quantity">
						<h2 class="price">$ ${price}</h2>
						<div class="buttons">
							<i class="fa-solid fa-minus" onclick={decrement(${id})}></i>
							<p id="${id}" class="quantity">
								${search !== undefined ? search.quantity : 0}
							</p>
							<i class="fa-solid fa-plus" onclick={increment(${id})}></i>
						</div>
					</div>
				</div>
			</div>
		`;
  });

  wrapper.innerHTML = data.join("");
}

window.onload = () => {
  generateItem(shopItemsData, shop);

  calculation();
};
