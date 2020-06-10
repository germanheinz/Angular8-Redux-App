export class User {

    public id: number;
    public username: string;
    public password: string;
    public nombre?: string;
    public apellido?: string;
    public email?: string;

    constructor(username, password){
        this.username = username;
        this.password = password;
    }
}
