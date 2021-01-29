class Wall {
    channel;
    base64profilePic;

    constructor() {
        $("#saveProfileChanges").click(this.setProfile.bind(this))
        $("#addNewChannelButton").click(this.addChannel)
        $("#editProfilePic").click(this.pickProfilePic.bind(this));
        $("#addNewChannelButton").click(this.addChannel.bind(this))
        this.getProfile()
        previousScreen = "#wallScreen"
    }

    setProfile() {
        let response = function () {
            // Risposta dopo la modifica del profilo
            $("#wallAlert").attr("class", "alert alert-success")
            $("#wallAlert").html("Informazioni aggiornate correttamente")
        }
        let error = function () {
            $("#wallAlert").attr("class", "alert alert-danger")
            $("#wallAlert").html("Errore nell'aggiornamento delle informazioni")
        }
        //TODO: fare aggiunta immagine profilo
        let communicationController = new CommunicationController();
        communicationController.setProfile($("#editUsername").val(), this.base64profilePic, response, error)
    }

    getProfile() {
        let response = function(result) {
            let user = new User();
            user.uid = result.uid;
            user.name = result.name;
            user.pversion = result.pversion;
            user.picture = result.picture;
            Model.getInstance().actualUser = user;
            this._actualUser = Model.getInstance().actualUser;
            $("#editUsername").val(this._actualUser.name);
            if (result.picture == null) {
                $("#profilePic").attr('src', "img/profilePic.png");
            } else {
                $("#profilePic").attr('src', "data:image/jpeg;base64," + result.picture);
            }
            
        }
        let communicationController = new CommunicationController();
        communicationController.getProfile(response);
    }

    pickProfilePic() {
        let success = function(base64image) {
            let i = new Image();
            let onLoad = function () {
                if (base64image.length <= 137000 && i.width == i.height) {
                    $("#profilePic").attr("src", "data:image/jpeg;base64," + base64image);
                    this.base64profilePic = base64image;
                } else {
                    alert("L'immagine selezionata è troppo grande oppure non è quadrata");
                }
            };
            i.onload = onLoad.bind(this);
            i.src = "data:image/jpeg;base64," + base64image;
        }
        let error = function onError(message) {
            console.log(message);
        }
        navigator.camera.getPicture(
            success.bind(this),
            error,
            {
                quality: 50,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: false,
                destinationType: Camera.DestinationType.DATA_URL
            });
    }

    addChannel() {
        let response = function () {
            $("#wallAlert").css('display', 'block');
            $("#wallAlert").attr("class", "alert alert-success");
            $("#wallTextAlert").html("Canale aggiunto correttamente");
            this.getWall();
        }
        let error = function () {
            $("#wallAlert").css('display', 'block');
            $("#wallAlert").attr("class", "alert alert-danger");
            $("#wallTextAlert").html("Errore nell'aggiunta del canale");
        }
        let communicationController = new CommunicationController();
        communicationController.addChannel($("#ctitleInput").val(), response.bind(this), error);
    }

    getWall() {
        let response = function (result) {
            $("#channelsList").html("");
            for (let i = 0; i < result.channels.length; i++) {
                $("#channelsList").append("<a class='list-group-item list-group-item-action' href='#'>" + result.channels[i].ctitle + "</a>")
            }

            $(".list-group-item").click(function () {
                channelPositionTop = $(this).position().top;
                this.channel = new Channel($(this).html());
                this.channel.getPosts();
            })
        }
        let communicationController = new CommunicationController();
        communicationController.getWall(response)
    }
}