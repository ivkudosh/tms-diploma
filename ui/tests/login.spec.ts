/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('random-name');
const emails = require('email-generator');
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/support/types";
import { LoginPage } from "../src/pages/loginPage";
import { ModeratorCatalogPage } from "../src/pages/moderatorCatalogPage";
import { MASTER_PASSWORD, MODERATOR_MAIL } from "../src/support/constants";
import { generator } from 'ts-password-generator';

let loginPage: LoginPage;
let moderatorCatalogPage: ModeratorCatalogPage;

const EMAIL_RANDOM: string = emails.generateEmail().replace(/"/g, "");
const PASSWORD_RANDOM: string = generator({ haveNumbers: true, charsQty: 18, isUppercase: true, haveString: true, haveSymbols: true });
const NAME_RANDOM = random.first();

test.describe('Knomary login page', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;
        moderatorCatalogPage = PageFactory.getPage(page, Pages.MODERATOR_CATALOG) as ModeratorCatalogPage;

        await loginPage.visitPage();
    });

    test('Should have page title message with invalid credentials', async () => {
        const actualTitle = await loginPage.getPageTitle();
        expect(actualTitle).toBe("Платформа управления обучением");
    });

    test('Should have error message with invalid credentials', async () => {
        await loginPage.typeMailInEmailField(EMAIL_RANDOM);
        await loginPage.typePasswordInPasswordField(PASSWORD_RANDOM);
        await loginPage.clickOnSignInButton();
        expect(await loginPage.getErrorCredentialsMessageText()).toBe('Логин/пароль неверен');
    });

    test.skip('Should create course by moderator', async () => {
        await loginPage.typeMailInEmailField(MODERATOR_MAIL);
        await loginPage.typePasswordInPasswordField(MASTER_PASSWORD);
        await loginPage.clickOnSignInButton();
        await moderatorCatalogPage.clickAddButton();
        await moderatorCatalogPage.clickOnCursList();
        await moderatorCatalogPage.typeNameInCursNameField(`Autotest: ${NAME_RANDOM}`);
        await moderatorCatalogPage.clickSaveButton();
        const idCreatedCurs = loginPage.getPageUrl().replace('https://dodo-test.devknomarylms.ru/teacher/dashboard/courseDetail/', '');
    });
});
