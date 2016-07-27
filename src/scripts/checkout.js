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
  });


});
