enum Errors {
    PASSWORD_ERROR = "Error, password should be min 8 and max 18 characters.",
    PASSWORD_CHARACTER_ERROR_ = "Error, password should consist one special character",
    AGE_ERROR = "Age must be 18 years old or above.",
    AGREEMENT_ERROR = "Agreement must be confirm.",
    PASSWORD_CONFIRMATION_ERROR = "The password and confirmation password do not match."
}

const SPECIAL_CHARS_REGEXP = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export { Errors, SPECIAL_CHARS_REGEXP };
