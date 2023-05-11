module.exports = {
    testMatch: ["**/unit/jest-specs/*spec.ts"],
    preset: "ts-jest",
    testEnvironment: 'node',
    reporters: [
        "default", [
            "jest-html-reporter", {
                "outputPath": "unit/report/unit-tests-report.html",
                "pageTitle": "Unit Tests",
                "includeFailureMsg": true
            }
        ],
    ],
};
