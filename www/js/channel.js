class Channel {
    communicationController
    ctitle

    constructor(ctitle) {
        this.ctitle = ctitle
        $("#screenTitle").html(ctitle)
        $("#sendButton").click(function() {
            this.communicationController = new CommunicationController()
            let response = function(result) {
                $("#postsList").append("<div class='post post-text'> <p class='content'>" + $("#postInputText").val() + "</p></div>")
            }
            this.communicationController.addPost(ctitle, "t", $("#postInputText").val(), response)
        })
    }

    getPosts() {
        this.communicationController = new CommunicationController()
        let response = function(result) {
            for (let i = 0; i < result.posts.length; i++) {
                if (result.posts[i].type == "t") {
                    $("#postsList").append("<div class='post post-text'> <div class='authorDiv'> <img/>"
                        + "<p class='authorP'>" + result.posts[i].name + "</p> </div> <p class='content'>" + result.posts[i].content + "</p></div>")
                } else if (result.posts[i].type == "l") {
                    $("#postsList").append("<div class='post post-location'> <div class='authorDiv'> <img/>"
                        + "<p class='authorP'>" + result.posts[i].name + "</p> </div> <button class='locationButton btn btn-secondary'>Posizione</div>")
                }
            }
        }
        this.communicationController.getPosts(this.ctitle, response)
    }
}