/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('random-name');
const emails = require('email-generator');
const dayjs = require('dayjs');
const dayjsRandom = require('dayjs-random');
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/support/types";
import { LoginPage } from "../src/pages/loginPage";
import { MASTER_PASSWORD, ADMIN_MAIL } from "../src/support/constants";
import { AdminUsersPage } from "../src/pages/adminUsersPage";

dayjs.extend(dayjsRandom);
const DATE_RANDOM = dayjs.between('01/01/1950', '01/01/2030').format('DD/MM/YYYY');

let loginPage: LoginPage;
let adminUsersPage: AdminUsersPage;

const NAME_RANDOM: string = random.first();
const SURNAME_RANDOM: string = random.last();
const EMAIL_RANDOM: string = emails.generateEmail().replace(/"/g, "");
const EDITED_EMAIL_RANDOM: string = emails.generateEmail().replace(/"/g, "");

test.describe('Knomary Admin users page', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;
        adminUsersPage = PageFactory.getPage(page, Pages.ADMIN_USERS) as AdminUsersPage;

        await loginPage.visitPage();
        await loginPage.typeMailInEmailField(ADMIN_MAIL);
        await loginPage.typePasswordInPasswordField(MASTER_PASSWORD);
        await loginPage.clickOnSignInButton();
    });

    test('Should create user by admin', async () => {
        await adminUsersPage.clickAddStudentButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.addUserModalWindow, "visible");
        await adminUsersPage.typeNameInNameField(NAME_RANDOM);
        await adminUsersPage.typeSurnameInSurnameField(SURNAME_RANDOM);
        await adminUsersPage.clickOrgStructureField();
        await adminUsersPage.waitForDisplay(adminUsersPage.selectElementOrgStructure, "visible");
        await adminUsersPage.clickOrgStructureGroupElement();
        await adminUsersPage.clickSelectButton();
        await adminUsersPage.clickPositionDropdownField();
        await adminUsersPage.clickPositionResultElement();
        await adminUsersPage.typeDateCalendarWorkField(DATE_RANDOM);
        await adminUsersPage.typeDateCalendarBirthdayField(DATE_RANDOM);
        await adminUsersPage.typeEmailInEmailField(EMAIL_RANDOM);
        await adminUsersPage.clickRandomPasswordButton();
        await adminUsersPage.clickSaveModalWindowButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.addUserModalWindow, "hidden");
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EMAIL_RANDOM);
    });

    test('Should update user name by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickEditButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.emailEditField, "visible");
        await adminUsersPage.clearEmailInEmailField();
        await adminUsersPage.typeNewEmailInEmailField(EDITED_EMAIL_RANDOM);
        await adminUsersPage.clickSaveEditModalWindowButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.editUserButton, "hidden");
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EDITED_EMAIL_RANDOM);
    });

    test('Should block user by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickEditButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.checkActiveSwitcher, "visible");
        await adminUsersPage.clickCheckActiveSwitcherLabel();
        await adminUsersPage.clickSaveEditModalWindowButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.editUserButton, "hidden");
        await adminUsersPage.clickShowBlockedUserSwitcher();
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EDITED_EMAIL_RANDOM);
    });

    test('Should unblock user by admin', async () => {
        await adminUsersPage.waitForDisplay(adminUsersPage.showBlockedUserSwitcher, "visible");
        await adminUsersPage.clickShowBlockedUserSwitcher();
        await adminUsersPage.waitForDisplay(adminUsersPage.checkboxUserElement, "visible");
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickEditButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.checkActiveSwitcher, "visible");
        await adminUsersPage.clickCheckActiveSwitcherLabel();
        await adminUsersPage.clickSaveEditModalWindowButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.editUserButton, "hidden");
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EDITED_EMAIL_RANDOM);
    });

    test('Should delete user by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.waitForDisplay(adminUsersPage.deleteUserButton, "visible");
        await adminUsersPage.clickDeleteUserButton();
        await adminUsersPage.clickConfirmDeleteUserButton();
        await adminUsersPage.waitForDisplay(adminUsersPage.deleteUserButton, "hidden");
        expect(await adminUsersPage.getFirstUserMailElementText()).not.toBe(EDITED_EMAIL_RANDOM);
    });
});
