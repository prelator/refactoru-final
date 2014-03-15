//========= Globals ==================

//Time validation function
var validateTime = function (str) {
  var timeMatch = /(\d|\d\d):\d\d\ (AM|PM)/i;
  return str.match(timeMatch) ? true : false;
};

$(document).ready(function() {
  
//========== New project form =================

  ////////// Event handlers ///////////

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