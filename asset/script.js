document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    document.querySelectorAll(".purchase-btn").forEach(button => {
        button.addEventListener("click", () => {
            let course = button.dataset.course;
            let price = +button.dataset.price;

            if (cart.some(item => item.course === course)) {
                alert(`${course} is already in your cart.`);
                return;
            }

            cart.push({ course, price });
            alert(`${course} added to cart!`);
            updateCart();
        });
    });

    function updateCart() {
        let cartSection = document.getElementById("checkout-section");
        let courseList = document.getElementById("selected-courses-list");
        let totalPrice = document.getElementById("total-price");

        cartSection.classList.toggle("d-none", cart.length === 0);
        courseList.innerHTML = cart.map((item, i) =>
            `<li>${item.course} - ₹${item.price} 
                <button class="remove-btn" data-index="${i}">Remove</button>
            </li>`).join("");

        totalPrice.textContent = cart.reduce((sum, item) => sum + item.price, 0);

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                cart.splice(this.dataset.index, 1);
                updateCart();
            });
        });
    }

    document.getElementById("checkout-form").addEventListener("submit", event => {
        event.preventDefault();
        let name = document.getElementById("user-name").value;
        let email = document.getElementById("user-email").value;

        localStorage.setItem("purchase", JSON.stringify({ name, email, cart }));
        alert(`Thank you, ${name}! Your order is placed.`);

        cart = [];
        updateCart();
        event.target.reset();
    });
});
