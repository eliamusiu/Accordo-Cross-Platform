class CommunicationController {
    baseUrl = "https://ewserver.di.unimi.it/mobicomp/accordo/"
    sid = "35vzqlT9QKUogwn6"

    getWall(response) {
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getWall.php",
            data: JSON.stringify({sid : this.sid}),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    getPosts(ctitle, response) {
        let jsonData = {
            sid : this.sid,
            ctitle: ctitle
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getChannel.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    addPost(ctitle, type, content, response) {
        let jsonData = {
            sid : this.sid,
            ctitle: ctitle,
            type: type,
            content: content
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "addPost.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    setProfile(name, picture, response) {
        let jsonData = {
            sid : this.sid,
            name: name,
            picture: picture
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "setProfile.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }
}