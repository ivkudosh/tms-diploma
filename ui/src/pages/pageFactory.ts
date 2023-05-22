import { Page } from "@playwright/test";
import { Pages } from "../support/types";
import { LoginPage } from "./loginPage";
import { ModeratorCatalogPage } from "./moderatorCatalogPage";
import { AdminUsersPage } from "./adminUsersPage";

export class PageFactory {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static getPage(page: Page, pageName: Pages) {
        switch (pageName) {
            case Pages.LOG_IN:
                return new LoginPage(page);
            case Pages.MODERATOR_CATALOG:
                return new ModeratorCatalogPage(page);
            case Pages.ADMIN_USERS:
                return new AdminUsersPage(page);
            default:
                return new LoginPage(page);
        }
    }
}
