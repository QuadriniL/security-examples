import bcrypt from 'bcrypt';

class User {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _passwordHash: string;

    constructor(props: { name: string, password: string }) {
        this._id = Math.round(Math.random() * 100000);
        this._name = props.name;
        this._passwordHash = props.password;
    }

    static create = async (props: { name: string, password: string }): Promise<User> => {
        props.password = await bcrypt.hash(props.password, 8);
        return new User(props);
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