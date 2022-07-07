import bcrypt from 'bcrypt';

class User {
    private _id: number;
    private _name: string;
    private _passwordHash: string;

    constructor(id, props: { name: string, password: string }) {
        this._id = Math.round(Math.random() * 100000);
        this._name = props.name;
        this._passwordHash = bcrypt.hash(props.password, 8);
    }

    get values() {
        return {
            id: this._id,
            name: this._name,
            passwordHash: this._passwordHash
        }
    }
}

export { User };