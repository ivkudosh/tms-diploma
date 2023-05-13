import { expect } from "@jest/globals";
import superagent, { Response } from "superagent";
import { BaseUrl, expectedCreatedPost, expectedUpdatedPost, expectedPatchedPost } from "../src/constants";
import {
    randomUserId,
    randomIdMethodGet,
    randomIdMethodPut,
    randomIdMethodPatch,
    randomIdMethodDelete,
    randomString,
    randomInvalidPostId
} from "../src/randoms";

let response: Response;

describe("JsonPlaceholder api tests", () => {
    test(`Should getting a post with GET method`, async () => {
        try {
            response = await superagent.get(`${BaseUrl}posts/${randomIdMethodGet}`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(randomIdMethodGet);
    });

    test(`Should creating a post with POST method`, async () => {
        try {
            response = await superagent.post(`${BaseUrl}posts`)
                .set('Content-type', 'application/json')
                .send(expectedCreatedPost);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(expectedCreatedPost);
    });

    test(`Should updating a post with PUT method`, async () => {
        try {
            response = await superagent.put(`${BaseUrl}posts/${randomIdMethodPut}`)
                .set('Content-type', 'application/json')
                .send(expectedUpdatedPost);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedUpdatedPost);
    });

    test(`Should patching a post with PATCH method`, async () => {
        try {
            response = await superagent.patch(`${BaseUrl}posts/${randomIdMethodPatch}`)
                .set('Content-type', 'application/json')
                .send({ title: expectedPatchedPost.title });
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(expectedPatchedPost.title);
    });

    test(`Should deleting a post with DELETE method`, async () => {
        try {
            response = await superagent.delete(`${BaseUrl}posts/${randomIdMethodDelete}`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.body.id).toBeUndefined();
    });

    test(`Should filtering a post through query parameter "userId" with GET method`, async () => {
        try {
            response = await superagent.get(`${BaseUrl}posts`).query({ userId: randomUserId });
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        response.body.forEach((post: any) => {
            expect(post.userId).toBe(randomUserId);
        });
    });

    test(`Should display error 404 after GET unknown resource`, async () => {
        try {
            await superagent.get(`${BaseUrl}posts/${randomString}`);
        } catch (error: any) {
            expect(error.status).toBe(404);
        }
    });

    test(`Should correctly GET error № 404 if post not found`, async () => {
        try {
            await superagent.get(`${BaseUrl}posts/${randomInvalidPostId}`);
        } catch (error: any) {
            expect(error.status).toBe(404);
        }
    });
});
