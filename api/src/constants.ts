/* eslint-disable @typescript-eslint/no-var-requires */
import { randomIdMethodPost, randomIdMethodPut, randomIdMethodPatch, randomString } from "./randoms";
import { Post } from "./types";

const BaseUrl = 'https://jsonplaceholder.typicode.com/';

const expectedCreatedPost: Post = {
    title: randomString,
    body: randomString,
    userId: randomIdMethodPost,
};

const expectedUpdatedPost: Post = {
    title: randomString,
    body: randomString,
    userId: randomIdMethodPut,
};

const expectedPatchedPost: Post = {
    title: randomString,
    body: randomString,
    userId: randomIdMethodPatch,
};

export {
    BaseUrl,
    expectedCreatedPost,
    expectedUpdatedPost,
    expectedPatchedPost
};
