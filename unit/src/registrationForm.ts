import { Errors, SPECIAL_CHARS_REGEXP } from "./helpers/constants";

export class RegistrationForm {
    private _name!: string;
    private _email!: string;
    private _password!: string;
    private _confirmPassword!: string;
    private _age!: number;
    private _agreement!: boolean;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

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
        this._password = password;
    }

    public get confirmPassword(): string {
        return this._confirmPassword;
    }

    public setConfirmPassword(confirmPassword: string): void {
        this._confirmPassword = confirmPassword;
    }

    public get age(): number {
        return this._age;
    }

    public setAge(age: number): void {
        this._age = age;
    }

    public get agreement(): boolean {
        return this._agreement;
    }

    public setAgreement(agreement: boolean): void {
        this._agreement = agreement;
    }

    public validateForm() {
        if (!SPECIAL_CHARS_REGEXP.test(this.password)) {
            throw new Error(Errors.PASSWORD_CHARACTER_ERROR_);
        }

        if (this.password.length < 8 || this.password.length > 18) {
            throw new Error(Errors.PASSWORD_ERROR);
        }

        if (this.confirmPassword !== this._password) {
            throw new Error(Errors.PASSWORD_CONFIRMATION_ERROR);
        }

        if (this.age < 18) {
            throw new Error(Errors.AGE_ERROR);
        }

        if (!this.agreement) {
            throw new Error(Errors.AGREEMENT_ERROR);
        }
    }

    public submitForm() {
        this.validateForm();
        return {
            name: this._name,
            email: this._email,
            password: this._password,
            confirmPassword: this._confirmPassword,
            age: this._age,
            agreement: this._agreement
        };
    }

    public initializeFields(name: string, email: string, password: string, confirmPassword: string, age: number, agreement: boolean) {
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
        this.setConfirmPassword(confirmPassword);
        this.setAge(age);
        this.setAgreement(agreement);
    }
}
