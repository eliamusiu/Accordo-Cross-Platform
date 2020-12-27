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

    setUsersFromDB() {
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        })

        let getUsersQuery = 'SELECT * FROM ProfilePictures'
        let selectSuccess = function (result) {
            len = result.length;
            for (i = 0; i < len; i++) {
                _users.push(result.rows.item(i));
            }
            console.log("utenti caricati dal DB nel model")
        }
        let selectError = function (error) { console.error("errore nella SELECT " + error.message); }
        this.db.executeSql(getUsersQuery, [], selectSuccess, selectError);
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

    updateUser(response) {
        this._users[this.indexOf(response.uid)] = response;
        
        this.db = window.sqlitePlugin.openDatabase({
            name: "accordo.db",
            location: "default"
        });

        let getUsersQuery = 'UPDATE ProfilePictures SET pversion = ' + response.pversion + ', picture = ' + response.picture + ' WHERE uid = ' + response.uid;
        let updateSuccess = function (result) { console.log("utenti aggiornati") }
        let updateError = function (error) { console.error("errore nell'aggiornamento'" + error.message); }
        this.db.executeSql(getUsersQuery, [], updateSuccess, updateError);
    }
}