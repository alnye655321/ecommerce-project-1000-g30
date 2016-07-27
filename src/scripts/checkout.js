$(function() {
  'use strict';
  console.log('sanity check');

  $( "#copy" ).click(function() { //copy shipping to billing
    $('#firstNameBilling').val($('#firstNameShipping').val());
    $('#lastNameBilling').val($('#lastNameShipping').val());
    $('#companyBilling').val($('#companyShipping').val());
    $('#address1Billing').val($('#address1Shipping').val());
    $('#address2Billing').val($('#address2Shipping').val());
    $('#stateBilling').val($('#stateShipping').val());
    $('#zipBilling').val($('#zipShipping').val());
    $('#cityBilling').val($('#cityShipping').val());
  });

});
//Close doc ready

//Start Form Validation
$('form').on('submit', function(event){
  event.preventDefault();
  console.log('hijacked');

});
//End Form Validation


//Start Zipcode Autocomplete
//Will take a zip code and autofill state and city data
//Also a possibility from just address, but that might be a little wonky.....
//zip code api source: https://smartystreets.com/docs/us-zipcode-api
$("#zipShipping").focus(function() { //selecting zip, entering data, then leaving will trigger the zip ajax call. Do nothing focus, but fire ajax on blur. Maybe we don't need focus?? I was too scared to change
    console.log('in');
}).blur(function() { // blur means a deselect of zip input, fires ajax call to zip code api
    console.log('out'); // Install Postman! on google chrome
    var id = $(this).val();
    var ajaxCall = new Promise(function(resolve) { //declare a promise, wait for variables to set before appending state/city form fields
      var state, state_abbreviation, city;
      var ajaxArr = [];
      $.ajax({ // build an object pass into promise function
      method: 'GET',
      dataType: 'json',
      url: 'https://us-zipcode.api.smartystreets.com/lookup?auth-id=d2e53a05-7def-56b1-e9c4-bcd4315c4e43&auth-token=2UPToivZOHdNv903mqV8&zipcode=' + id
      }).done(function (result){
        //state = result[0]['city_states'][0]['state'];
        state_abbreviation = result[0]['city_states'][0]['state_abbreviation'];
        city = result[0]['city_states'][0].city;
        ajaxArr = [state_abbreviation, city];
        resolve(ajaxArr);
      });

    });

    ajaxCall.then(function(value) { //after we get array variables set form field values
      console.log(value); // Success!
      $('#stateShipping').val(value[0]);
      $('#cityShipping').val(value[1]);
    }, function(reason) {
      console.log(reason); // Error!
    });

});
//End Zipcode Autocomplete
