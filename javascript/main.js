$(function () {

  //Main redirect
  if (location.pathname == '/')
    location.replace('1-1.html');

  //Sidenav
  $('.sidenav-menu__item-parent').on('click', function () {
    $(this)
      .siblings()
      .removeClass('active')
      .find('.sidenav_submenu__a.active')
      .removeClass('active');
    $(this).addClass('active');
  });

  $('.sidenav_submenu__a').on('click', function () {
    $('.sidenav-menu')
      .find('.sidenav_submenu__a')
      .removeClass('active');
    $(this).addClass('active');
  });

  //Autocomplete
  $('.typeahead').typeahead({
    source: ['Amsterdam', 'Washington', 'Sydney', 'Beijing', 'Cairo']
  });
  

  ///   1-1 page
  var $googleMap = document.querySelector('#googleMap');

  function initialize() {
    var mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
      position: { lat: 51.508742, lng: -0.120850 },
      map: map,
      icon: '/img/map-marker-22.png'
    });
  }

  if ($googleMap)
    google.maps.event.addDomListener(window, 'load', initialize);
});
