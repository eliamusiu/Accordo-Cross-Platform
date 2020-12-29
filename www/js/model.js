class Model {
    static _instance
    _actualUser
    _users
    _posts

    constructor() {
        this._users = [];
        this._posts = [];
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Model()
        }
        return this._instance
    }

    //#region User
    set actualUser(actualUser) {
        this._actualUser = actualUser
    }

    get actualUser() {
        return this._actualUser
    }

    addUser(user) {
        this._users.push(user);
    }

    get users() {
        return this._users;
    }

    set users(value) {
        this._users = value;
    }

    /**
     * Ricerca users per uid
     * @param {*} uid 
     */
    searchUser(uid) {
        for (let i = 0; i < this._users.length; i++) {
            if (this._users[i].uid === uid) {
                return this._users[i];
            }
        }
        return undefined;
    }

    indexOfUser(uid) {
        for (let i = 0; i < this._users.length; i++) {
            if (this._users[i].uid === uid) {
                return i;
            }
        }
        return undefined;
    }
    //#endregion

    //#region Post
    get posts() {
        return this._posts;
    }

    set posts(value) {
        this._posts = value;
    }

    getAllImagePosts() {
        let imagePosts = new Array()
        this._posts.forEach(post => {
            if (post.type == "i") {
                imagePosts.push(post)
            }
        })
        return imagePosts
    }

    addPost(post) {
        this._posts.push(post);
    }

    /**
     * Ricerca post per pid
     * @param {*} pid 
     */
    searchPost(pid) {
        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts[i].pid === pid) {
                return this._posts[i];
            }
        }
        return undefined;
    }

    indexOfPost(pid) {
        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts[i].pid === pid) {
                return i;
            }
        }
        return undefined;
    }
    //#endregion

    //#region DataBase Users
    setUsersFromDB(dataReceivedCallback) {
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        })

        let getUsersQuery = 'SELECT * FROM ProfilePictures'
        let selectSuccess = function (result) {
            let len = result.rows.length;
            for (let i = 0; i < len; i++) {
                this._users.push(result.rows.item(i));
            }
            console.log(len + " utenti caricati dal DB nel model")
            dataReceivedCallback()
        }
        let selectError = function (error) { console.error("Errore nella SELECT degli utenti: " + error.message); }
        this.db.executeSql(getUsersQuery, [], selectSuccess.bind(this), selectError);
    }

    updateUser(user) {
        this._users[this.indexOf(response.uid)] = user;

        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        });

        let updateUserQuery = 'UPDATE ProfilePictures SET pversion = ' + user.pversion + ', picture = ' + user.picture + ' WHERE uid = ' + user.uid;
        let updateSuccess = function () { console.log("Utente aggiornato nel DB") }
        let updateError = function (error) { console.error("Errore nell'aggiornamento dell'utente nel DB: " + error.message); }
        this.db.executeSql(updateUserQuery, [], updateSuccess, updateError);
    }

    addUser(user) {
        this._users.push(user)

        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        });

        let insertUserQuery = 'INSERT INTO ProfilePictures(pversion, picture, uid) VALUES ("' + user.pversion + '", "' + user.picture + '", "' + user.uid + '")';
        let insertSuccess = function () { console.log("Utente inserito nel DB") }
        let insertError = function (error) { console.error("errore inserimento utente nel DB: " + error.message); }
        this.db.executeSql(insertUserQuery, [], insertSuccess, insertError);
    }
    //#endregion

    //#region DataBase Images
    setImagesFromDB(dataReceivedCallback) {
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        })

        let getImagesQuery = 'SELECT * FROM Images'
        let selectSuccess = function (result) {
            let len = result.rows.length;
            for (let i = 0; i < len; i++) {
                this._posts[this.indexOfPost(result.rows.item(i).pid)].content = result.rows.item(i).content
            }
            console.log(len + " post immagine caricati dal DB nel model")
            dataReceivedCallback()
        }
        let selectError = function (error) { console.error("Errore nella SELECT dei post immagine: " + error.message); }
        this.db.executeSql(getImagesQuery, [], selectSuccess.bind(this), selectError);
    }

    addImagePost(imagePost) {
        this._posts[this.indexOfPost(imagePost.pid)].content = imagePost.content

        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        });

        let insertImagePostQuery = 'INSERT INTO Images(pid, content) VALUES ("' + imagePost.pid + '", "' + imagePost.content + '")';
        let insertSuccess = function (result) { console.log("Post immagine inserito nel DB") }
        let insertError = function (error) { console.error("Errore nell'inserimento del post immagine nel DB: " + error.message); }
        this.db.executeSql(insertImagePostQuery, [], insertSuccess, insertError);
    }
    //#endregion
}