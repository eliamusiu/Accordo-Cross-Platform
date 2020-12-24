class Wall {  
    constructor() {
        $("#saveProfileChanges").click(this.setProfile)
        $("#addNewChannelButton").click(this.addChannel)
        this.getProfile()
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
        }
        let communicationController = new CommunicationController();
        communicationController.getProfile(response)
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
                showScreen("#channelScreen");
                let channel = new Channel($(this).html());
                channel.getPosts();
            })
        }
        let communicationController = new CommunicationController();
        communicationController.getWall(response)
    }
}