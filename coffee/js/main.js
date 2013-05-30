$(document).ready(function() {
  $(document).on('init.slides', function() {
    additional_slides = $('#additional-slides').html();
    $(additional_slides).appendTo('#slides .slides-container');
    $('#slides').superslides('update');
  });

  $('#slides').superslides({
    slide_easing: 'easeInOutCubic',
    slide_speed: 1000,
    pagination: true,
    hashchange: true,
    scrollable: false
  });
});