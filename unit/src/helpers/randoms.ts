/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('random-name');
const generator = require('generate-password');
const emails = require('email-generator');
const randomAge = require('random-age');


const nameRandom: string = random.first();
const nameRandomBasic: string = random.first();


const emailRandom: string = emails.generateEmail();
const emailRandomBasic: string = emails.generateEmail();


const childAgeRandom: number = randomAge({ type: 'child' });
const adultAgeRandom: number = randomAge({ type: 'adult' });

const adultAgeRandomBasic: number = randomAge({ type: 'adult' });

const passwordRandomMax: string = generator.generate({
    length: 18,
    numbers: true
});

const passwordRandomMaxBasic: string = generator.generate({
    length: 18,
    numbers: true
});

const passwordRandomMin: string = generator.generate({
    length: 8,
    numbers: true
});

const invalidPasswordRandom: string = generator.generate({
    length: 7,
    numbers: true
});

export {
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
    adultAgeRandomBasic
};
