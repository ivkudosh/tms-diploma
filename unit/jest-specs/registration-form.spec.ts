import { expect } from "@jest/globals";
import { RegistrationForm } from "../src/registration-form";
import { Errors } from "../src/helpers/constants";
import {
    nameRandom,
    passwordRandomMax,
    passwordRandomMin,
    emailRandom,
    childAgeRandom,
    adultAgeRandom,
    passwordRandomMinError,
    nameRandomBasic,
    emailRandomBasic,
    passwordRandomMaxBasic,
    adultAgeRandomBasic
} from "../src/helpers/randoms";

let form: RegistrationForm;

describe("Registration form tests", () => {
    beforeEach(() => {
        form = new RegistrationForm(nameRandomBasic, emailRandomBasic, passwordRandomMaxBasic, passwordRandomMaxBasic, adultAgeRandomBasic, true);
    });

    test('Should set name consists of letters', () => {
        form.setName(nameRandom);
        expect(form.name).toBe(nameRandom);
    });

    test('Should set email', () => {
        form.setEmail(emailRandom);
        expect(form.email).toBe(emailRandom);
    });

    test('Should set password max 18 letters', () => {
        form.setPassword(passwordRandomMax);
        expect(form.password.length).toBe(18);
    });

    test('Should set password min 8 letters', () => {
        form.setPassword(passwordRandomMin);
        expect(form.password.length).toBe(8);
    });

    test('Should match password and confirmation password', () => {
        form.setPassword(passwordRandomMin);
        form.setConfirmPassword(passwordRandomMin);
        expect(form.password).toBe(form.confirmPassword);
    });

    test(`Should get text '${Errors.PASSWORD_CONFIRMATION_ERROR}' if password and confirmation password don't match`, () => {
        expect(() => form.setConfirmPassword(passwordRandomMax)).toThrow(Errors.PASSWORD_CONFIRMATION_ERROR);
    });

    test(`Should get text '${Errors.PASSWORD_ERROR}' with password min 7 characters`, () => {
        expect(() => form.setPassword(passwordRandomMinError)).toThrow(Errors.PASSWORD_ERROR);
    });

    test('Should set random adult age', () => {
        form.setAge(adultAgeRandom);
        expect(form.age).toBe(adultAgeRandom);
    });

    test(`Should get text '${Errors.AGE_ERROR}' with child age`, () => {
        expect(() => form.setAge(childAgeRandom)).toThrow(Errors.AGE_ERROR);
    });

    test('Should set true agreement', () => {
        form.setAgreement(true);
        expect(form.agreement).toBeTruthy();
    });

    test(`Should get text '${Errors.AGREEMENT_ERROR}' with false agreement`, () => {
        expect(() => form.setAgreement(false)).toThrow(Errors.AGREEMENT_ERROR);
    });
});
