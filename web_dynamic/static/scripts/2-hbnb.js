$(document).ready(select);

const HOST = '0.0.0.0';

function select () {
  const amenity = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenity[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenity[$(this).attr('data-name')];
    }
    const names = Object.keys(amenity);
    $('.amenities h4').text(names.sort().join(', '));
  });

  apiStat();
}

function apiStat () {
  const API_URL = `http://${HOST}:5001/api/v1/status`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
