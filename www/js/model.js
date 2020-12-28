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

    get posts() {
        return this._posts;
    }

    set posts(value) {
        this._posts = value;
    }

    addPost(post) {
        this._posts.push(post);
    }

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
        let selectError = function (error) { console.error("errore nella SELECT: " + error.message); }
        this.db.executeSql(getUsersQuery, [], selectSuccess.bind(this), selectError);
    }

    //ricerca per nome
    search(nome) {
        for (let i = 0; i < this._users.length; i++) {
            if (this._users[i].uid === nome) {
                return this._users[i];
            }
        }
        return undefined;
    }

    indexOf(nome) {
        for (let i = 0; i < this._users.length; i++) {
            if (this._users[i].uid === nome) {
                return i;
            }
        }
        return undefined;
    }

    updateUser(user) {
        this._users[this.indexOf(response.uid)] = user;
        
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        });

        let updateUserQuery = 'UPDATE ProfilePictures SET pversion = ' + user.pversion + ', picture = ' + user.picture + ' WHERE uid = ' + user.uid;
        let updateSuccess = function (result) { console.log("utente aggiornato") }
        let updateError = function (error) { console.error("errore nell'aggiornamento: " + error.message); }
        this.db.executeSql(getUsersQuery, [], updateSuccess, updateError);
    }

    addUser(user) {
        this._users.push(user)

        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        });

        let insertUserQuery = 'INSERT INTO ProfilePictures(pversion, picture, uid) VALUES ("' + user.pversion + '", "' + user.picture + '", "' + user.uid + '")';
        let insertSuccess = function (result) { console.log("utente inserito") }
        let insertError = function (error) { console.error("errore nell'inserimento: " + error.message); }
        this.db.executeSql(insertUserQuery, [], insertSuccess, insertError);
    }
}