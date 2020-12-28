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

    /**
     * Effettua la richiesta del CommunicationController per richiedere tutti i post del canale selezionato e, in base al tipo di post,
     * inserisce del codice HTML diverso
     */
    getPosts() {
        this.communicationController = new CommunicationController()
        let response = function (result) {
            for (let i = 0; i < result.posts.length; i++) {

                Model.getInstance().addPost(result.posts[i]);

                if (result.posts[i].type == "t") {
                    $("#postsList").append("<div class='post post-text' data-pid='" + result.posts[i].pid + "'> <div class='authorDiv'> <img class='profile-picture' data-pversion='" + result.posts[i].pversion + "' data-uid='" + result.posts[i].uid + "'>"
                        + "<span class='authorSpan ml-2'>" + result.posts[i].name + "</span> </div> <p class='content'>" + result.posts[i].content + "</p></div>")
                } else if (result.posts[i].type == "l") {
                    $("#postsList").append("<div class='post post-location' data-pid='" + result.posts[i].pid + "'> <div class='authorDiv'> <img class='profile-picture' data-pversion='" + result.posts[i].pversion + "' data-uid='" + result.posts[i].uid + "'>"
                        + "<span class='authorSpan ml-2'>" + result.posts[i].name + "</span> </div> <button class='locationButton btn btn-secondary'>Posizione</div>")
                } else if (result.posts[i].type == "i") {
                    $("#postsList").append("<div class='post post-image' data-pid='" + result.posts[i].pid + "'> <div class='authorDiv'> <img class='profile-picture' data-pversion='" + result.posts[i].pversion + "' data-uid='" + result.posts[i].uid + "'>"
                        + "<span class='authorSpan ml-2'>" + result.posts[i].name + "</span> </div> <img class='postImage'></div>")
                }
            }
            this.manageDatabase();
        }
        this.communicationController.getChannel(this.ctitle, response.bind(this));
    }

    /**
     * Apre o crea il DB, scarica le immagini profilo presenti in esso inserendole nel model e, una volta scaricate,
     * chiama checkMissingProfilePictures()
     */
    manageDatabase() {
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        })

        let createUserTableQuery = 'CREATE TABLE IF NOT EXISTS ProfilePictures(uid PRIMARY KEY, pversion, picture)';
        let createSuccess = function () {
            console.log("Tabella user creata/aperta")
            let dataReceivedCallback = function() {     // Verrà richiamata una volta caricate le immagini dal DB nel model
                this.checkMissingProfilePictures();         // Controlla le immagini mancanti o non aggiornate
            }
            Model.getInstance().setUsersFromDB(dataReceivedCallback.bind(this));    // Carica le immagini profilo dal DB nel model
        }
        let createError = function (error) {
            console.error("Errore nella creazione/apertura della tabella " + error.message);
        }
        this.db.executeSql(createUserTableQuery, [], createSuccess.bind(this), createError);
    }

    /**
     * Restituisce una lista con uid distinti dei post
     */
    distinctByUid() {
        var posts = Model.getInstance().posts;
        console.log(posts);
        var flags = [], output = [], l = posts.length, i;
        for (let i = 0; i < l; i++) {
            if (flags[posts[i].uid]) continue;
            flags[posts[i].uid] = true;
            output.push(posts[i]);
        }
        return output;
    }

    /**
     * Scorre gli uid distinti e se non è presente nel model o la pversion non è aggiornata aggiunge l'uid alla lista degli
     * uid dei quali fare la richiesta di rete in getMissingPictures().
     * Altrimenti carica direttamente l'immagine presenta del DB (quindi nel model, nel quale è stata già caricata prima)
     * nei tag img dei post dell'utente corrente
     */
    checkMissingProfilePictures() {
        let usersInChannel = this.distinctByUid();
        var profilePicToRequest = new Array();

        for (let i = 0; i < usersInChannel.length; i++) {
            if (Model.getInstance().search(usersInChannel[i].uid) == undefined ||
                Model.getInstance().search(usersInChannel[i].uid).pversion != usersInChannel[i].pversion) {
                profilePicToRequest.push(usersInChannel[i].uid);
            } else {
                console.log("Immagine profilo caricata dal DB")
                $(".profile-picture").each(function() {
                    let picture = Model.getInstance().search(usersInChannel[i].uid).picture
                    if ($(this).data("uid") == usersInChannel[i].uid) {
                        $(this).attr("src", "data:image/jpeg;base64," + picture)
                    }
                });
            }
        }
        this.getMissingPictures(profilePicToRequest);
    }

    /**
     * Effettua la chiamata del CommunicationController per richiedere le immagini profilo degli uid
     * precedentemente aggiunti alla lista di quelli da richiedere. In base a se lo user è presente nel model
     * o no, si capisce se l'immagine è da aggiornare o da inserire e, per questo, vengono chiamati due metodi
     * diversi del model. Vengono quindi inserite le immagini profilo appena ottenute in tutti i tag img dei post
     * dell'utente corrente
     * @param {*} profilePicToRequest 
     */
    getMissingPictures(profilePicToRequest) {
        this.communicationController = new CommunicationController();
        
        for (let i = 0; i < profilePicToRequest.length; i++) {
            var postAuthor = Model.getInstance().search(profilePicToRequest[i]);

            let response = function(result) {
                if (postAuthor != undefined) {
                    // Aggiorna l'untente
                    Model.getInstance().updateUser(result);
                } else {
                    // Inserisce l'utente
                    Model.getInstance().addUser(result);
                }
                $(".profile-picture").each(function() {
                    if ($(this).data("uid") == profilePicToRequest[i]) {
                        $(this).attr("src", "data:image/jpeg;base64," + result.picture)
                    }
                });
                let imgs = $(".profile-pictures")
            }
            this.communicationController.getUserPicture(response.bind(this), profilePicToRequest[i]);
        }
    }
}