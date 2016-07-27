$(function() {
  'use strict';

  //console.log('sanity check');
  // $.ajax({
  //     url: 'http://galvanize-student-apis.herokuapp.com/gcommerce/products/',
  //     method: 'GET',
  //   }).done(function(results) {
  //     //console.log(results);
  //     for (var i = 0; i < 3; i++) {
  //       var productPick = results[Math.floor(Math.random() * results.length)]
  //       $('#carousel').append('<p>' + productPick.description + '</p>')
  //       //console.log(productPick.description);
  //    }
  //   });

  //<----Image Carousel Start---->//
  //Set carousel variables and transition time
  var $carousel = $('.carousel');
  var $slide = 'li';
  var $transition_time = 1000;
  var $time_between_slides = 4000;
  //Slides function defines where carousel starts
  function slides() {
    return $carousel.find($slide);
  }
    slides().fadeOut();
      //Set active classes
      slides().first().addClass('active');
      slides().first().fadeIn($transition_time);
        //Set up auto scroll function
        var $interval = setInterval(function() {
          var $i = $carousel.find($slide + '.active').index();
          slides().eq($i).removeClass('active');
          slides().eq($i).fadeOut($transition_time);
             //Start looping through images
            if (slides().length === $i + 1) $i = -1;
              slides().eq($i + 1).fadeIn($transition_time);
              slides().eq($i + 1).addClass('active');
        }, $transition_time +  $time_between_slides);
  //<----Image Carousel Finish---->//

  //<----Back and Next Click Listeners---->
    $('#back').on('click', function (event) {
    //console.log('Button Werks');


  });
});
