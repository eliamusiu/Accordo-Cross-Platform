class CommunicationController {
    baseUrl = "https://ewserver.di.unimi.it/mobicomp/accordo/";
    sid;

    constructor() {
        this.sid = Model.getInstance().sid;
    }

    register(response) {
        $.ajax({
            method: 'post',
            url: this.baseUrl + "register.php",
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    getWall(response) {
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getWall.php",
            data: JSON.stringify({ sid: this.sid }),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    getChannel(ctitle, response) {
        let jsonData = {
            sid: this.sid,
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

    getPostImage(pid) {
        let jsonData = {
            sid: this.sid,
            pid: pid
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getPostImage.php",
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    addPost(ctitle, type, content, response) {
        if (type == 't' || type == "i") {
            let jsonData = {
                sid: this.sid,
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
    }

    addPost(ctitle, type, lat, lon, response, error) {
        if (type == 'l') {
            let jsonData = {
                sid: this.sid,
                ctitle: ctitle,
                type: type,
                lat: lat,
                lon: lon
            }
            $.ajax({
                method: 'post',
                url: this.baseUrl + "addPost.php",
                data: JSON.stringify(jsonData),
                dataType: 'json',
                success: response,
                error: error
            });
        }
    }

    setProfile(name, picture, response, error) {
        let jsonData = {
            sid: this.sid,
            name: name,
            picture: picture
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "setProfile.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: error
        });
    }

    getProfile(response) {
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getProfile.php",
            data: JSON.stringify({ sid: this.sid }),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    getUserPicture(response, uid) {
        let jsonData = {
            sid: this.sid,
            uid: uid
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getUserPicture.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }

    addChannel(ctitle, response, error) {
        let jsonData = {
            sid: this.sid,
            ctitle: ctitle
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "addChannel.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: error
        });
    }

    getPostImage(response, pid) {
        let jsonData = {
            sid: this.sid,
            pid: pid
        }
        $.ajax({
            method: 'post',
            url: this.baseUrl + "getPostImage.php",
            data: JSON.stringify(jsonData),
            dataType: 'json',
            success: response,
            error: function (error) {
                console.error(error);
            }
        });
    }
}