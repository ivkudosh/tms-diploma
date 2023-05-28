import { Errors } from "./helpers/constants";

export class RegistrationForm {
    private _name: string;
    private _email: string;
    private _password: string;
    private _confirmPassword: string;
    private _age: number;
    private _agreement: boolean;

    constructor(name: string, email: string, password: string, confirmPassword: string, age: number, agreement: boolean) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._confirmPassword = confirmPassword;
        this._age = age;
        this._agreement = agreement;
    }

    public get name(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public get email(): string {
        return this._email;
    }

    public setEmail(email: string): void {
        this._email = email;
    }

    public get password(): string {
        return this._password;
    }

    public setPassword(password: string): void {
        if (password.length >= 8 && password.length <= 18) {
            this._password = password;
        } else throw new Error(Errors.PASSWORD_ERROR);
    }

    public get confirmPassword(): string {
        return this._confirmPassword;
    }

    public setConfirmPassword(confirmPassword: string): void {
        if (confirmPassword === this._password) {
            this._confirmPassword = confirmPassword;
        } else throw new Error(Errors.PASSWORD_CONFIRMATION_ERROR);
    }

    public get age(): number {
        return this._age;
    }

    public setAge(age: number): void {
        if (age >= 18) {
            this._age = age;
        } else throw new Error(Errors.AGE_ERROR);
    }

    public get agreement(): boolean {
        return this._agreement;
    }

    public setAgreement(agreement: boolean): void {
        if (agreement) {
            this._agreement = agreement;
        } else throw new Error(Errors.AGREEMENT_ERROR);
    }

    public checkFieldsFilled() {
        return (this._name && this._email && this._password && this._confirmPassword).length && this._age && this._agreement;
    }
}
