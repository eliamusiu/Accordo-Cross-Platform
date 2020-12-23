class CommunicationController {
    baseUrl = "https://ewserver.di.unimi.it/mobicomp/accordo/";

    getWall(response) {
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