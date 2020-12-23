class Wall {  
    
    getWall() {
        let communicationController = new CommunicationController();
        let response = function(result) {
            for (let i = 0; i < result.channels.length; i++) {
                console.log(result.channels[i])
                $("#channelsList").append("<a class='list-group-item' href='#'>" + result.channels[i].ctitle + "</a>")
            }
        }
        communicationController.getWall(response)

        $(".list-group-item").click(function(){
            console.log($(this).html());
        })
    }
}