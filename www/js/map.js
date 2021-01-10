class Map {
    latitude;
    longitude;

    constructor() {
        showScreen("#mapScreen")
    }

    sendLocation() {
        let communicationController = new CommunicationController()
        let response = function () {
            showScreen("#channelScreen")
            let channel = new Channel(ctitle)
            channel.getPosts()
        }
        let error = function (message) {
            console.log(message);
        }
        console.log(ctitle + " " + this.latitude + " " + this.longitude)
        communicationController.addPost(ctitle, "l", this.latitude, this.longitude, response, error)
    }

    setPostLocation(lat, lon) {
        mapboxgl.accessToken = "pk.eyJ1IjoiYW5kcmVsaW8iLCJhIjoiY2tmbnBqeXJjMGZnNDJ5bXExNTIwODI3MSJ9.EvDDudGu2KRCZfr-3tSObQ";
        var map = new mapboxgl.Map({
            container: 'mapDiv',
            center: [lon, lat],
            style: 'mapbox://styles/mapbox/streets-v11',
            zoom: 11
        });
        new mapboxgl.Marker()
            .setLngLat([lon, lat])
            .addTo(map);
    }

    getLocation() {
        function success(position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            $("#sendLocationButton").css("visibility", "visible");
            $("#sendLocationButton").click(this.sendLocation.bind(this))
            this.setPostLocation(this.latitude, this.longitude);
        }
        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            let options = { enableHighAccuracy: true }
            
            navigator.geolocation.getCurrentPosition(success.bind(this), error, options);
            
        }
    }
}