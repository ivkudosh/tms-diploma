import { BasePage } from "./basePage";
import { BASE_URL } from "../support/constants";
import { Locator, Page } from "@playwright/test";

export class AdminUsersPage extends BasePage {
    private readonly addUserButton: Locator;
    public readonly addUserModalWindow: Locator;
    public readonly selectElementOrgStructure: Locator;
    public readonly nameField: Locator;
    private readonly surnameField: Locator;
    private readonly orgStructureField: Locator;
    private readonly orgStructureGroupElement: Locator;
    private readonly positionDropdownField: Locator;
    private readonly positionResultElement: Locator;
    private readonly calendarWorkField: Locator;
    private readonly calendarBirthdayField: Locator;
    private readonly emailField: Locator;
    private readonly randomPasswordButton: Locator;
    private readonly saveModalWindowButton: Locator;
    public readonly createdUserMailElement: Locator;
    private readonly checkboxUserElement: Locator;
    public readonly editUserButton: Locator;
    public readonly emailEditField: Locator;
    private readonly saveEditModalWindowButton: Locator;
    public readonly deleteUserButton: Locator;
    private readonly confirmDeleteUserButton: Locator;

    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${BASE_URL}/admin/kpi/structure`;
        this.addUserButton = page.locator('a[data-target="#add-student"]');
        this.addUserModalWindow = page.locator('#add-student > div[class="modal-dialog"]');
        this.nameField = page.locator('.form-group input[name="first_name"]');
        this.surnameField = page.locator('.form-group input[name="second_name"]');
        this.orgStructureField = page.locator('.form-group a[id="select-worker-org-level"]', { hasText: 'Оргструктура' });
        this.selectElementOrgStructure = page.locator('.modal-content > .modal-header > #myModalLabel', { hasText: 'Выбери элемент орг. структуры' });
        this.orgStructureGroupElement = page.locator('a[data-level="1"]');
        this.positionDropdownField = page.locator('.form-group #position_chosen');
        this.positionResultElement = page.locator('div[class="chosen-drop"] > ul[class="chosen-results"] > li[data-option-array-index="1"]');
        this.calendarWorkField = page.locator('#date_take_on_work');
        this.calendarBirthdayField = page.locator('.form-group input[name="date_birthday"]');
        this.emailField = page.locator('.form-group > input[name="email"]');
        this.saveModalWindowButton = page.locator('div[class="modal-dialog"] > div[class="modal-content"] > div[class="modal-body"] > form[class="org-structure-new-worker"] > div[class="text-center"] > button[type="submit"]');
        this.randomPasswordButton = page.locator('div[class="form-group choose-password"]> #genPassword');
        this.createdUserMailElement = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(4)');
        this.checkboxUserElement = page.locator('#allUsersBody tr:nth-child(1) .checkbox');
        this.editUserButton = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(2) .settings-user .a_edit-student');
        this.emailEditField = page.locator('.form-group > input[type="email"]');
        this.saveEditModalWindowButton = page.locator('button[class="action-success save_edit_user"]');
        this.deleteUserButton = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(2) .settings-user .a_delete-worker-modal');
        this.confirmDeleteUserButton = page.locator('.modal-content .modal-footer #action-delete-student');
    }

    public async clickAddStudentButton(): Promise<void> {
        await this.addUserButton.click();
    }

    public async typeNameInNameField(name: string): Promise<void> {
        await this.nameField.type(name);
    }

    public async typeSurnameInSurnameField(surname: string): Promise<void> {
        await this.surnameField.type(surname);
    }

    public async clickOrgStructureField(): Promise<void> {
        await this.orgStructureField.click();
    }

    public async clickOrgStructureGroupElement(): Promise<void> {
        await this.orgStructureGroupElement.click();
    }

    public async clickPositionDropdownField(): Promise<void> {
        await this.positionDropdownField.click();
    }

    public async clickPositionResultElement(): Promise<void> {
        await this.positionResultElement.click();
    }

    public async typeDateCalendarWorkField(date: string): Promise<void> {
        await this.calendarWorkField.type(date);
    }

    public async typeDateCalendarBirthdayField(date: string): Promise<void> {
        await this.calendarBirthdayField.type(date);
    }

    public async typeEmailInEmailField(email: string): Promise<void> {
        await this.emailField.type(email);
    }

    public async clickRandomPasswordButton(): Promise<void> {
        await this.randomPasswordButton.click();
    }

    public async clickSaveModalWindowButton(): Promise<void> {
        await this.saveModalWindowButton.click();
    }

    public getFirstUserMailText(): Promise<string> {
        return this.createdUserMailElement.innerText();
    }

    public async clickFirstCheckboxUserElement(): Promise<void> {
        await this.checkboxUserElement.click();
    }

    public async clickEditButton(): Promise<void> {
        await this.editUserButton.click();
    }

    public async editEmailInEmailField(email: string): Promise<void> {
        await this.emailEditField.clear();
        await this.emailEditField.type(email);
    }

    public async clickSaveEditModalWindowButton(): Promise<void> {
        await this.saveEditModalWindowButton.click();
    }

    public async clickDeleteUserButton(): Promise<void> {
        await this.deleteUserButton.click();
    }

    public async clickConfirmDeleteUserButton(): Promise<void> {
        await this.confirmDeleteUserButton.click();
    }
}
