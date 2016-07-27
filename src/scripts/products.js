$(function() {
  'use strict';
  console.log('sanity check');

  var urlProduct = 'http://galvanize-student-apis.herokuapp.com/gcommerce/products';
  var productObj = ajaxCall(urlProduct); //create promise object for ajax call

  fullProductList(productObj);//populate products;

  //grab on click from a size and return
  $('#sort-by-size li a').on('click', function(event){
    event.preventDefault();
    var key = parseInt($(this).attr('value'));
    clearOutputDiv();
    productObj.then(function(products){
      var sortedSize = products.filter(function(index){
        return key === index.size;
      });
      createProductElement(sortedSize);
    });
  });

  $('#sort-by-price li a').on('click', function(event){
    event.preventDefault();
    var key = parseFloat($(this).attr('value'));
    clearOutputDiv();
    productObj.then(function(products){
      var sortedPrice = products.filter(function(index){
        var noDollarSign = index.price.replace('$', '');
        return (noDollarSign <= (key + 20) && noDollarSign > key);
      });
      createProductElement(sortedPrice);
    });
  });
});

function ajaxCall(url){
  return Promise.resolve($.ajax(url));
}

function createProductElement(productObjArr){
  productObjArr.forEach(function(value){
    $('#product-display').append('<figure class="products float-left"><img src="assets/' + value.id + '.png" alt="foobar"><p class=""> <strong>Description:</strong> ' + value.description + '</p><p class="text-info"> <strong>Price:</strong> ' + value.price + '</p></figure>');
  });
}

function clearOutputDiv(){
  $('#product-display').empty();
}

//create full list of products and place on page
function fullProductList(productObj){
  productObj.then(function(products){
    createProductElement(products);
  });
}
