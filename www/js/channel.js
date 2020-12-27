class Channel {
    communicationController
    ctitle
    db

    constructor(ctitle) {
        this.ctitle = ctitle
        $("#screenTitle").html(ctitle)
        $("#sendButton").click(function () {
            this.communicationController = new CommunicationController()
            let response = function (result) {
                $("#postsList").append("<div class='post post-text'> <p class='content'>" + $("#postInputText").val() + "</p></div>")
            }
            this.communicationController.addPost(ctitle, "t", $("#postInputText").val(), response)
        })
    }

    getPosts() {
        this.communicationController = new CommunicationController()
        let response = function (result) {
            for (let i = 0; i < result.posts.length; i++) {

                Model.getInstance().addPost(result.posts[i]);

                if (result.posts[i].type == "t") {
                    $("#postsList").append("<div class='post post-text' data-pid='" + result.posts[i].pid + "'> <div class='authorDiv'> <img data-pversion='" + result.posts[i].pversion + "' data-uid='" + result.posts[i].uid + "'>"
                        + "<p class='authorP'>" + result.posts[i].name + "</p> </div> <p class='content'>" + result.posts[i].content + "</p></div>")
                } else if (result.posts[i].type == "l") {
                    $("#postsList").append("<div class='post post-location' data-pid='" + result.posts[i].pid + "'> <div class='authorDiv'> <img data-pversion='" + result.posts[i].pversion + "' data-uid='" + result.posts[i].uid + "'>"
                        + "<p class='authorP'>" + result.posts[i].name + "</p> </div> <button class='locationButton btn btn-secondary'>Posizione</div>")
                } else if (result.posts[i].type == "i") {
                    $("#postsList").append("<div class='post post-image' data-pid='" + result.posts[i].pid + "'> <div class='authorDiv'> <img data-pversion='" + result.posts[i].pversion + "' data-uid='" + result.posts[i].uid + "'>"
                        + "<p class='authorP'>" + result.posts[i].name + "</p> </div> <img class='postImage'></div>")
                }
            }
            this.manageDatabase();
        }
        this.communicationController.getChannel(this.ctitle, response.bind(this));
    }

    manageDatabase() {
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        })

        let createUserTableQuery = 'CREATE TABLE IF NOT EXISTS ProfilePictures(uid PRIMARY KEY, pversion, picture)';
        let createSuccess = function (result) { console.log("tabella user creata") }
        let createError = function (error) { console.error("errore nella creazione della tabella " + error.message); }
        this.db.executeSql(createUserTableQuery, [], createSuccess, createError);

        Model.getInstance().setUsersFromDB();
        this.checkMissingProfilePictures();
    }

    distinctByUid() {
        var posts = Model.getInstance().posts;
        console.log(posts);
        var flags = [], output = [], l = posts.length, i;
        for (i = 0; i < l; i++) {
            if (flags[posts[i].uid]) continue;
            flags[posts[i].uid] = true;
            output.push(posts[i]);
        }
        return output;
    }

    checkMissingProfilePictures() {
        let usersInChannel = this.distinctByUid();
        var profilePicToRequest = new Array();
        for (i = 0; i < usersInChannel.length; i++) {
            if (Model.getInstance().search(usersInChannel[i].uid) != undefined ||
                Model.getInstance().search(usersInChannel[i].uid).pversion != usersInChannel[i].pversion) {
                profilePicToRequest.push(usersInChannel[i].uid);
            }
        }
        this.getMissingPictures(profilePicToRequest);
    }

    getMissingPictures(profilePicToRequest) {
        this.communicationController = new CommunicationController();
        
        for (i = 0; i < profilePicToRequest.length; i++) {
            var postAuthor = Model.getInstance.search(profilePicToRequest[i]);

            let response = function() {
                if (postAuthor != undefined) {
                    //updateUser
                    Model.getInstance().updateUser(response);
                } else {
                    //addUser
                }
            }
            this.communicationController.getUserPicture(profilePicToRequest[i], response.bind(this));
        }
    }
}