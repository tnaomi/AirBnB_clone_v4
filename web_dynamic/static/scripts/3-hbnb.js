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
  fetchPlaces();
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

function fetchPlaces () {
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroooom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}
