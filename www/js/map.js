// function setPostLocation(lat, lon) {
//     mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ";
//     var map = new mapboxgl.Map({
//         container: 'mapScreen',
//         center: [lon, lat],
//         style: 'mapbox://styles/mapbox/streets-v11',
//         zoom: 11
//     });
// }
class Map {
    latitude;
    longitude;

    constructor() { showScreen("#mapScreen") }

    setPostLocation(lat, lon) {
        console.log(lat + " " + lon);
        mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ";
        var map = new mapboxgl.Map({
            container: 'map',
            center: [lon, lat],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 11
        });
        var marker = new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(map);
    }

    getLocation() {
        function success(position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.setPostLocation(this.latitude, this.longitude);
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            //status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(success.bind(this), error);
        }
    }
}