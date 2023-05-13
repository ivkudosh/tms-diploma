/* eslint-disable @typescript-eslint/no-var-requires */
const random = require("simple-random-number-generator");
const generator = require('generate-password');

const params = {
    min: 1,
    max: 100,
    integer: true
};

const paramsInvalid = {
    min: 1,
    max: 100,
    integer: true
};

const randomInvalidPostId = random(paramsInvalid);
const randomUserId: number = random(params);
const randomIdMethodGet: number = random(params);
const randomIdMethodPost: number = random(params);
const randomIdMethodPut: number = random(params);
const randomIdMethodPatch: number = random(params);
const randomIdMethodDelete: number = random(params);

const randomString: string = generator.generate({
    length: 18,
    numbers: true
});

export {
    randomIdMethodPost,
    randomIdMethodGet,
    randomIdMethodPut,
    randomIdMethodPatch,
    randomIdMethodDelete,
    randomUserId,
    randomString,
    randomInvalidPostId
};
