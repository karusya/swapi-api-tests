# SWAPI API Tests project

This is a test project for  [Starwars API](https://swapi.co/) API tests that uses request-promise-native and JavaScript.

## Getting Started
```
git clone
cd swapi-api-tests
npm install
npm test
```

## Project Structure
```
.
    ├── framework
       ├── helper                   # Files
          ├── api_urls.js
          ├── log_decorator.js
          ├── mocha.opts
          ├── setup.js                # Documentation files (alternatively `doc`)
       ├── jsonSchema
       ├──
       ├──                    # Source files (alternatively `lib` or `app`)
    ├── test                    # Automated tests (alternatively `spec` or `tests`)
    ├── tools                   # Tools and utilities
    ├── package.json
    └── README.md
```
## Test Cases
The tests in this project use [https://swapi.co/](https://swapi.co/) to demonstrate how to interact with some of the most common API calls for films/ and people/ endpoints.
Test coverage for films/ and people/ endpoints described in [Test cases file](testCases.txt)

## CI


## Reporters
This projects uses both the [spec-reporter](https://webdriver.io/docs/spec-reporter.html) and [allure-reporter](http://allure.qatools.ru/). The spec reporter offers  feedback when running from terminal and the allure reporter provides you with an html report and screenshots that are automatically attached to failed tests. After running your the tests, run `npm run report` to generate the allure report.
