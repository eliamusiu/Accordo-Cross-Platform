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

    constructor(lat, lon) {
        console.log(lat + " " + lon);
        mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ";
        var map = new mapboxgl.Map({
            container: 'mapScreen',
            center: [lon, lat],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 11
        });
        var marker = new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(map);
    }

    // setPostLocation(lat, lon) {
    //     // Prova
    //     var map = new mapboxgl.Map({
    //         accessToken: 'pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ',
    //         container: 'mapScreen',
    //         center: [lon, lat],
    //         style: 'mapbox://styles/mapbox/light-v10',
    //         zoom: 11
    //     });
    //     console.log("");
    //     //this.map.setCenter([lon, lat]);
    // }
}