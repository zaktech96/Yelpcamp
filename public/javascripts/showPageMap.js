mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom

});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .addTo(map)

const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(campground.geometry.coordinates)
    .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
    .addTo(map);