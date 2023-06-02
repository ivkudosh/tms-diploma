import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected url!: string;
    protected readonly selectButton: Locator;

    constructor(protected readonly page: Page) {
        this.selectButton = page.locator('button[type="submit"]', { hasText: "Выбрать" });
    }

    public async visitPage(): Promise<void> {
        await this.page.goto(this.url);
    }

    public getPageTitle(): Promise<string> {
        return this.page.title();
    }

    public async clickSelectButton(): Promise<void> {
        await this.selectButton.click();
    }
}
