import { BasePage } from "./basePage";
import { BASE_URL } from "../support/constants";
import { Page } from "@playwright/test";

export class ModeratorCatalogPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${BASE_URL}/teacher/catalog?clear=1`;
    }

    public getADropdownList() {
        return this.page.locator('div[class="dropdown btn-add open"] > ul[class="dropdown-menu"] > li');
    }

    public async clickOnCursList() {
        await this.getADropdownList().nth(0).click();
    }

    public getCursNameField() {
        return this.page.locator('#input-id-1');
    }

    public async typeNameInCursNameField(nameField: string) {
        await this.getCursNameField().type(nameField);
    }
}
