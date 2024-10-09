// script.js

let cart = [];
let totalPrice = 0;

// Inicjalizacja koszyka z localStorage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
        updateCartDisplay();
    }
    updateCartCount();
});

// Dodawanie produktu do koszyka
function addToCart(product, price) {
    cart.push({ product, price });
    totalPrice += price;
    saveCart();
    updateCartCount();
    alert(`${product} dodany do koszyka.`);
}

// Usuwanie produktu z koszyka
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Zapisywanie koszyka do localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice);
}

// Aktualizacja wyświetlania liczby przedmiotów w koszyku
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = cart.length;
    });
}

// Aktualizacja zawartości koszyka na stronie koszyka
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.product} - ${item.price} zł <button onclick="removeFromCart(${index})" style="background:none;border:none;color:red;cursor:pointer;">&times;</button>`;
        cartItems.appendChild(li);
    });
    totalPriceElement.textContent = totalPrice;
}

// Finalizacja zakupu
function checkout() {
    if (cart.length === 0) {
        alert("Twój koszyk jest pusty.");
        return;
    }
    alert(`Dziękujemy za zakupy! Łączna kwota do zapłaty: ${totalPrice} zł.`);
    cart = [];
    totalPrice = 0;
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Formularz kontaktowy (opcjonalnie)
function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const message = document.getElementById('contactMessage').value;
    alert(`Dziękujemy, ${name}! Twoja wiadomość została wysłana.`);
    document.getElementById('contactForm').reset();
}
