class Map {

    constructor () {
        showScreen("#mapScreen");
        // this.map = new mapboxgl.Map({
        //     accessToken: 'pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ',
        //     container: 'mapScreen',
        //     style: 'mapbox://styles/mapbox/light-v10',
        //     zoom: 11
        //   });
    }

    setPostLocation(lat, lon) {
        var map = new mapboxgl.Map({
            accessToken: 'pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ',
            container: 'mapScreen',
            center: [lon, lat],
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 11
          });
        //this.map.setCenter([lon, lat]);
    }
}