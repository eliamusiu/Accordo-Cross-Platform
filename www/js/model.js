class Model {
    static _instance
    _actualUser

    constructor() {
        this._users = [];
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
    
    addUser(user){
        this._users.push(user);
    }

    get users() {
        return this._users;
    }

    set users(value) {
        this._users = value;
    }

    //ricerca per nome
    search(nome){
        for(let i = 0; i<this._users.length; i++){
            if(this._users[i].uid === nome){
                return this._users[i];
            }
        }
        return undefined;
    }
}