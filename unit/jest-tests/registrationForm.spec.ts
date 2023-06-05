import { expect } from "@jest/globals";
import { RegistrationForm } from "../src/registrationForm";
import { Errors, SUCCESS_SUBMIT_FORM } from "../src/helpers/constants";
import {
    nameRandom,
    passwordRandomMax,
    passwordRandomMin,
    emailRandom,
    childAgeRandom,
    adultAgeRandom,
    invalidPasswordRandom,
    nameRandomBasic,
    emailRandomBasic,
    passwordRandomMaxBasic,
    seniorAgeRandomBasic
} from "../src/helpers/randoms";

let form: RegistrationForm;

describe("Registration form tests", () => {
    beforeEach(() => {
        form = new RegistrationForm();
        form.initializeFields(nameRandomBasic, emailRandomBasic, passwordRandomMaxBasic, passwordRandomMaxBasic, seniorAgeRandomBasic, true);
    });

    test('Should set name consists of letters', () => {
        form.setName(nameRandom);
        expect(form.name).toBe(nameRandom);
    });

    test('Should set email', () => {
        form.setEmail(emailRandom);
        expect(form.email).toBe(emailRandom);
    });

    test('Should set password consists of max 18 letters and characters', () => {
        form.setPassword(passwordRandomMax);
        expect(form.password.length).toBe(18);
    });

    test('Should set password consists of min 8 letters and characters', () => {
        form.setPassword(passwordRandomMin);
        expect(form.password.length).toBe(8);
    });

    test('Should match password and confirmation password', () => {
        form.setPassword(passwordRandomMin);
        form.setConfirmPassword(passwordRandomMin);
        expect(form.password).toBe(form.confirmPassword);
    });

    test(`Should get text '${Errors.PASSWORD_CONFIRMATION_ERROR}' if password and confirmation password don't match`, () => {
        form.setConfirmPassword(passwordRandomMax);
        expect(() => form.validateForm()).toThrow(Errors.PASSWORD_CONFIRMATION_ERROR);
    });

    test(`Should get text '${Errors.PASSWORD_ERROR}' with password min 7 characters`, () => {
        form.setPassword(invalidPasswordRandom);
        expect(() => form.validateForm()).toThrow(Errors.PASSWORD_ERROR);
    });

    test('Should set random adult age', () => {
        form.setAge(adultAgeRandom);
        expect(form.age).toBe(adultAgeRandom);
    });

    test(`Should get text '${Errors.AGE_ERROR}' with child age`, () => {
        form.setAge(childAgeRandom);
        expect(() => form.validateForm()).toThrow(Errors.AGE_ERROR);
    });

    test('Should set true agreement', () => {
        form.setAgreement(true);
        expect(form.agreement).toBeTruthy();
    });

    test(`Should get text '${Errors.AGREEMENT_ERROR}' with false agreement`, () => {
        form.setAgreement(false);
        expect(() => form.validateForm()).toThrow(Errors.AGREEMENT_ERROR);
    });

    test(`Should get text '${SUCCESS_SUBMIT_FORM}' if form successfully submitted!`, () => {
        expect(form.validateForm()).toBe(SUCCESS_SUBMIT_FORM);
    });

    test(`Should initialize all fields`, () => {
        expect(form.name).toBe(nameRandomBasic);
        expect(form.email).toBe(emailRandomBasic);
        expect(form.password).toBe(passwordRandomMaxBasic);
        expect(form.confirmPassword).toBe(passwordRandomMaxBasic);
        expect(form.age).toBe(seniorAgeRandomBasic);
        expect(form.agreement).toBe(true);
    });
});
