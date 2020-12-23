class Wall {  
    constructor() {
        $("#saveProfileChanges").click(function() {ù
            let response = function() {
                // Risposta dopo la modifica del profilo
            }
            // TODO: controllare se funzione e scaricare uid
            //communicationController.setProfile($("#editUsername").val())
        })
    }

    getWall() {
        let communicationController = new CommunicationController();
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
        communicationController.getWall(response)
    }
}