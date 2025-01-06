// Select products

const btns = document.querySelectorAll('.btn');

let cart = []

btns.forEach(btn => {
    btn.addEventListener('click', function(e){
        cart.push(e.target.parentElement);
        console.log(cart)
    })
})