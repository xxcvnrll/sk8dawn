document.addEventListener("DOMContentLoaded", () => {
  let cartItemsContainer = document.getElementById("cartItems");
  let totalElem = document.getElementById("total");
  let orderBtn = document.getElementById("orderBtn");
  let orderForm = document.getElementById("orderForm");
  let confirmBtn = document.getElementById("confirmBtn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Добавляем quantity к каждому товару, если его нет
  cart = cart.map(item => {
    return {
      ...item,
      quantity: item.quantity || 1
    };
  });

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
    } else {
      cart.forEach((item, index) => {
        let price = parseFloat(item.price.replace("$", ""));
        let itemTotal = price * item.quantity;
        total += itemTotal;
        totalItems += item.quantity;

        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-info">
            <p>${item.name}</p>
           
          </div>
          <div class="quantity-controls">
            <button class="decrease">−</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase">+</button>
          </div>
          <button class="remove">✖</button>
        `;

        // Увеличить количество
        div.querySelector(".increase").addEventListener("click", () => {
          cart[index].quantity += 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });

        // Уменьшить количество
        div.querySelector(".decrease").addEventListener("click", () => {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
          }
        });

        // Удалить товар
        div.querySelector(".remove").addEventListener("click", () => {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        });

        cartItemsContainer.appendChild(div);
      });
    }

    totalElem.textContent = `Order amount: $${total.toFixed(2)} (${totalItems} items)`;
  }

  renderCart();

  orderBtn.addEventListener("click", () => {
    orderForm.classList.toggle("open");
  });

  confirmBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Получаем все поля формы
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");

    // Проверяем, заполнены ли все поля
    if (!nameInput.value.trim()) {
      alert("Please enter your name");
      nameInput.focus();
      return;
    }

    if (!phoneInput.value.trim()) {
      alert("Please enter your phone number");
      phoneInput.focus();
      return;
    }

    if (!addressInput.value.trim()) {
      alert("Please enter your address");
      addressInput.focus();
      return;
    }

    // Если все поля заполнены
    alert("✅ Thank you for your order! We will contact you soon.");
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
    orderForm.classList.remove("open");
    
    // Очищаем поля формы после успешного заказа
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
  });
});