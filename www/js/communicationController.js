class CommunicationController {
    baseUrl = "https://ewserver.di.unimi.it/mobicomp/accordo/";

    getWall() {
        let response = function(result) {
            for (let i = 0; i < result.channels.length; i++) {
                console.log(result.channels[i])
                $("#channelsList").append("<li class='list-group-item'>" + result.channels[i].ctitle + "</li>")
            }
        }
        this.makeAjaxRequest("getWall.php", response)
    }

    makeAjaxRequest(serviceUrl, response) {
            $.ajax({
            method: 'post',
            url: this.baseUrl + serviceUrl,
            data: JSON.stringify({ sid: '35vzqlT9QKUogwn6' }),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }
    
}