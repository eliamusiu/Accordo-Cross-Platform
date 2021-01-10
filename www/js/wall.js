class Wall {  
    channel;

    constructor() {
        $("#saveProfileChanges").click(this.setProfile)
        $("#addNewChannelButton").click(this.addChannel)
        this.getProfile()
        previousScreen = "#wallScreen"
    }

    setProfile() {
        let response = function() {
            // Risposta dopo la modifica del profilo
            $("#wallAlert").attr("class", "alert alert-success")
            $("#wallAlert").html("Informazioni aggiornate correttamente")
        }
        let error = function() {
            $("#wallAlert").attr("class", "alert alert-danger")
            $("#wallAlert").html("Errore nell'aggiornamento delle informazioni")
        }
        //TODO: fare aggiunta immagine profilo
        let communicationController = new CommunicationController();
        communicationController.setProfile($("#editUsername").val(), null, response, error)
    }

    getProfile() {
        let response = function(result) {
            let user = new User()
            user.uid = result.uid
            user.name = result.name
            user.pversion = result.pversion
            user.picture = result.picture
            Model.getInstance().actualUser = user
            this._actualUser = Model.getInstance().actualUser
            $("#editUsername").val(this._actualUser.name)
            $("#profilePic").attr('src', "data:image/jpeg;base64," + result.picture);
            $("#editProfilePic").click(this.pickProfilePic);
        }
        let communicationController = new CommunicationController();
        communicationController.getProfile(response)
    }

    pickProfilePic() {
        //TODO: fare crop immagine per invio
        navigator.camera.getPicture(
            function onSuccess(imageData) {
                new SendImage(imageData)
            },
            function onError(message) {
                console.log(message);
            },
            {
                quality: 50,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                destinationType: Camera.DestinationType.DATA_URL
            });
    }

    addChannel() {
        let response = function() {
            $("#wallAlert").attr("class", "alert alert-success")
            $("#wallAlert").html("Canale aggiunto correttamente")
        }
        let error = function() {
            $("#wallAlert").attr("class", "alert alert-danger")
            $("#wallAlert").html("Errore nell'aggiunta del canale")
        }
        let communicationController = new CommunicationController();
        communicationController.addChannel($("#ctitleInput").val(), response, error)
    }

    getWall() {
        let response = function(result) {
            for (let i = 0; i < result.channels.length; i++) {
                $("#channelsList").append("<a class='list-group-item list-group-item-action' href='#'>" + result.channels[i].ctitle + "</a>")
            }

            $(".list-group-item").click(function() {
                channelPositionTop = $(this).position().top;
                this.channel = new Channel($(this).html());
                this.channel.getPosts();
            })
        }
        let communicationController = new CommunicationController();
        communicationController.getWall(response)
    }
}