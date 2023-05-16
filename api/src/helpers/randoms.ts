/* eslint-disable @typescript-eslint/no-var-requires */
const random = require("simple-random-number-generator");
const generator = require('generate-password');
import { Params } from "./types";

const params: Params = {
    min: 1,
    max: 100,
    integer: true
};

const paramsInvalid: Params = {
    min: 1,
    max: 100,
    integer: true
};

const randomInvalidId: number = random(paramsInvalid);
const randomUserId: number = random(params);
const randomIdForMethodGet: number = random(params);
const randomIdForMethodPost: number = random(params);
const randomIdForMethodPut: number = random(params);
const randomIdForMethodPatch: number = random(params);
const randomIdForMethodDelete: number = random(params);

const randomString: string = generator.generate({
    length: 18,
    numbers: true
});

export {
    randomIdForMethodPost,
    randomIdForMethodGet,
    randomIdForMethodPut,
    randomIdForMethodPatch,
    randomIdForMethodDelete,
    randomUserId,
    randomString,
    randomInvalidId
};
