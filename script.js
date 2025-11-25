let cart = [];

function addToCart(button) {
  const product = button.parentElement;
  const name = product.dataset.name;
  const price = parseInt(product.dataset.price);

  const existing = cart.find(item => item.name === name);
  if(existing) { existing.quantity += 1; }
  else { cart.push({name: name, price: price, quantity: 1}); }

  updateCart();
  alert(`${name} ajouté au panier!`);
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.quantity} - ${item.price*item.quantity}€ 
      <button onclick="changeQuantity('${item.name}',1)">+</button>
      <button onclick="changeQuantity('${item.name}',-1)">-</button>`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  totalPrice.innerText = `Total: ${total}€`;
}

function changeQuantity(name, change) {
  const product = cart.find(item => item.name === name);
  if(product) {
    product.quantity += change;
    if(product.quantity <=0){ cart = cart.filter(item => item.name !== name); }
  }
  updateCart();
}

document.getElementById("cartToggle").addEventListener("click", ()=>{
  const cartDiv = document.getElementById("cart");
  cartDiv.style.display = cartDiv.style.display === "block" ? "none" : "block";
});

function clearCart() {
  cart = [];
  updateCart();
}

function showCheckout() {
  if(cart.length === 0) { alert("Le panier est vide !"); return; }
  document.getElementById("checkoutModal").style.display = "block";
}

function closeCheckout() { document.getElementById("checkoutModal").style.display = "none"; }

document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;
  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);

  alert(`Merci ${name} pour votre achat !
Adresse: ${address}
Email: ${email}
Méthode de paiement: ${payment}
Total: ${total}€`);

  cart = [];
  updateCart();
  closeCheckout();
});

function filterCategory(category, button) {
  const products = document.querySelectorAll(".product");
  products.forEach(product => {
    if(category==='all' || product.dataset.category===category){ product.style.display="block"; }
    else { product.style.display="none"; }
  });

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if(button) button.classList.add('active');
}
