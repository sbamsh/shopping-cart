//bc we wrote async in script link we gonna do that to make sure our page is downloading
//async = tells it will load in background while body elemts are loading 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityinputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityinputs.length; i++) {
    var input = quantityinputs[i]
    input.addEventListener('change', quantitychange)
}

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addtocartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('thank you for your purchase')
    var cartitem = document.getElementsByClassName('cart-items')[0]
    while (cartitem.hasChildNodes()) {
        cartitem.removeChild(cartitem.firstChild)
    }
    updateCartTotal()
}



function addtocartClicked(event) {
    var button = event.target;
    var shopitem = button.parentElement.parentElement
    var title = shopitem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopitem.getElementsByClassName('shop-item-price')[0].innerText
    var imagesrc = shopitem.getElementsByClassName('shop-item-image')[0].src
    additemToCart(title,price,imagesrc)
    updateCartTotal()
}


function additemToCart(title,price,imagesrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartitem = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartitem.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title) {
            alert('this item is already added to the cart')
            return
        }
    }
    var cartrowContents = `
    <div class="cart-item cart-column">
    <img  class="cart-item-image" src="${imagesrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">Remove</button>
</div> `
    cartRow.innerHTML = cartrowContents;
    cartitem.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantitychange)
}



function quantitychange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal()
}






function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal
}


//selectors

var removeCartItemButtons = document.getElementsByClassName('btn-danger');



//eventlisteners

for (var i = 0; i < removeCartItemButtons.length; i++) {
   var button = removeCartItemButtons[i];
   button.addEventListener("click", function(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    
    updateCartTotal()
    
   })
    
}


//function


function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart-items')[0];
var cartRow = cartItemContainer.getElementsByClassName('cart-row');
var total = 0;
for (var i = 0; i < cartRow.length; i++) {
    var cartRow = cartRow[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + (price * quantity);   
}

total = Math.round(total * 100) / 100;
document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

}


