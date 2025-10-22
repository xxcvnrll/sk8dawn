function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCount').textContent = cart.length;
}

updateCartCount();

const cartIcons = document.querySelectorAll('.cart-icon');
cartIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const card = icon.closest('div');
        const name = card.querySelector('.text-card').innerText;
        const price = card.querySelector('.price').innerText;
        const image = card.querySelector('.i').getAttribute('src');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name, price, image });
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        alert('✅ Added to cart!');
    });
});

