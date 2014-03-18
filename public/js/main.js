//========= Globals ==================
var geocoder;
var validLocation = true;
//Time validation function
var validateTime = function (str) {
  var timeMatch = /(\d|\d\d):\d\d\ (AM|PM)/i;
  return str.match(timeMatch) ? true : false;
};


//======== Document ready ============
$(document).ready(function() {
  



  //========== New project form =================

  //Home page carousel
  $('.carousel').carousel({
  interval: 5000
  });

  //Enable datepicker
  $('.date').datepicker();

  //Show/hide end-date field
  $('#multi-day').click(function(event) {
    if ($(this).prop("checked") === true) {
      $('#end-date').show();
    } else {$("#end-date").hide();}
  });

  //On start date change, set end-date equal to start date
  $('#start-date').datepicker()
    .on('changeDate', function(ev){
      $("#checkout").val($("#checkin").val());
    });

  //Project form validation
  $('#project-form').submit(function(event) {
    if (validateTime($('#start-time').val()) === false || validateTime($('#end-time').val()) === false) {
      event.preventDefault();
      alert('All times must match format: "h:mm AM/PM" or "hh:mm AM/PM"');
    }
    if (validLocation === false) {
      event.preventDefault();
      alert("You must enter a valid location before submitting the form.");
    }
  });

  $('#location-field').change(function() {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': $(this).val()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        validLocation = true;
        alert("Location found: " + results[0].formatted_address + ". If this is not correct, enter a more specific location.");
      } else {
        validLocation = false;
        alert("No matching location found. Please enter a more specific location.");
      }
    });

  });

//======== My projects page =====================
  
  //Show/hide project panel content
  $(document).on('click', '.panel-heading', function(event) {
    $(this).closest('.panel').find('.panel-body').slideToggle("fast");
  });

  //Delete project
  $(document).on('click', '.btn-delete', function(event) {
    var confirmation = confirm("Are you sure you want to delete this project?");
    if (confirmation === true) {
      var ID = $(this).closest('.panel').attr('id');
      $.ajax({
        url: '/delete/'+ID,
        type: 'DELETE'
      })
      .done(function(response) {
        console.log(response);
      })
      .fail(function() {
        console.log("error");
      });    
      $(this).closest('.panel').remove();
    }
  });





});