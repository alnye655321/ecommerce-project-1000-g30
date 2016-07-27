$(function() {
  'use strict';
  console.log('sanity check');
  Stripe.setPublishableKey('pk_test_IDkwCdtBuXpEeMz1Nq5JOHe1');

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
//$("#warning").hide(); //hide warning div to begin with
//Start Form Validation
//Start Credit Validation
$('form').on('submit', function(event){
  event.preventDefault();
  console.log('hijacked');
  var creditNumber = $('#creditNumber').val();
  var creditExpiration = $('#creditExpiration').val();
  var creditCvc = $('#creditCvc').val();

  var errorsPresent = false; // if any error is triggered record, if not display success message at bottom

  if (Stripe.card.validateCardNumber($('#creditNumber').val()) === false) {
    errorsPresent = true;
    $("#warning").append('<p>Not a Valid Credit Card Number</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (Stripe.card.validateExpiry($('#creditExpiration').val()) === false) {
    errorsPresent = true;
    $("#warning").append('<p>Not a Valid Credit Card Expiration</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (Stripe.card.validateCVC($('#creditCvc').val()) === false) {
    errorsPresent = true;
    $("#warning").append('<p>Not a Valid Credit Card CVC</p>');
    $("#warning").show().delay(5000).fadeOut();
  }
//End Credit Validation

//Start Regular Form Shipping Validation
  if (($('#firstNameShipping').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a First Name for Shipping</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#lastNameShipping').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a Last Name for Shipping</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#address1Shipping').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include an Address Line 1 for Shipping</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#cityShipping').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a City for Shipping</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#stateShipping').val()) == "NULL") {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a State for Shipping</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#zipShipping').val()).length < 5) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a Zip for Shipping</p>');
    $("#warning").show().delay(5000).fadeOut();
  }
//End Regular Form Shipping Validation

//Start Regular Form Billing Validation
  if (($('#firstNameBilling').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a First Name for Billing</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#lastNameBilling').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a Last Name for Billing</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#address1Billing').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include an Address Line 1 for Billing</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#cityBilling').val()).length < 1) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a City for Billing</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#stateBilling').val()) == "NULL") {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a State for Billing</p>');
    $("#warning").show().delay(5000).fadeOut();
  }

  if (($('#zipBilling').val()).length < 5) {
    errorsPresent = true;
    $("#warning").append('<p>Please Include a Zip for Billing</p>');
    $("#warning").show().delay(5000).fadeOut();
  }
//End Regular Form Billing Validation

  if (errorsPresent === false) { //show success message if no errors
    $("#success").append('<p>Your Order has Been Submitted for Proccessing</p>');
    $("#success").show().delay(5000).fadeOut();
    // $("#success p").remove(); //clear success message for re-submit
  }


  setTimeout( //wait 10 seconds for success/error message generation, then clear out messages for new submit
  function()
  {
    $("#warning p").remove(); // clear warning messages for re-submit
    $("#success p").remove(); //clear success message for re-submit
  }, 10000); // Ten second timeout setting, maybe could be less? Or a complicated promise...

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
