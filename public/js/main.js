$(document).ready(function() {
  
  $('.date').datepicker();

  $('#multi-day').click(function(event) {
    if ($(this).prop("checked") === true) {
      $('#end-date').show();
    } else {$("#end-date").hide();}
  });


$('#start-date').datepicker()
  .on('changeDate', function(ev){
    $("#checkout").val($("#checkin").val());
  });

$(document).on('click', '.panel-heading', function(event) {
  $(this).closest('.panel').find('.panel-body').slideToggle("fast");
});

$(document).on('click', '.btn-delete', function(event) {
  $(this).closest('.panel').remove();
});





});