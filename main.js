var removeCartItemButtons = document.getElementsByClassName('btn-danger');





for (var i = 0; i < removeCartItemButtons.length; i++) {
   var button = removeCartItemButtons[i];
   button.addEventListener("click", function(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()
    
    updateCartTotal()
    
   })
    
}

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

document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

}


