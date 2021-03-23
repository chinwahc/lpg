# LPG Tech Challenge - Chituru Chinwah
## Operating System
Cypress is a desktop application that is installed on your computer. The desktop application supports these operating systems:
- macOS 10.9 and above (64-bit only)
- Linux Ubuntu 12.04 and above, Fedora 21 and Debian 8 (64-bit only)
- Windows 7 and above

### Node.js
If you’re using npm to install Cypress, you'll need:
- Node.js 10 or 12 and above

### GIT
via ssh:
```$xslt
git clone ssh:git@github.com:chinwahc/lpg.git
```
via https:
```$xslt
git clone https://github.com/chinwahc/lpg.git
```

### Installation
Install Cypress via npm:
```bash
$ cd lpg
$ npm install
```
### Test Execution
First start mockserver:
```
$ npm run start:mockserver
```
To run tests:
```$xslt
$ npx cypress run
```
> **Note:** The above command will run the test in the default browser(Electron) for Cypress in headless mode.

To specify a browser:
```
$ npx cypress run --browser <browsername>
```

To run in headless mode:
```
$ npx cypress run -browser <browsername> --headless
```
> **Note:** The tests run in headless mode by default for the electron browser.

### Overriding Options
Cypress gives you the option to dynamically alter configuration values. This is helpful when running Cypress in multiple environments and on multiple developer machines.

This gives you the option to do things like override the baseUrl or environment variables.

When running Cypress from the Command Line you can pass a --config flag.
### Examples:
```
$ cypress open --config pageLoadTimeout=30000,baseUrl=https://myapp.com
```
```
$ cypress run --config integrationFolder=tests,videoUploadOnPasses=false
```

### Folder Structure
API Feature files:
```
cypress/integration/features/API/api_tests.feature
```
UI Feature files:
```
cypress/integration/features/UI/
```

API Step definitions:
```
cypress/integration/step-definitions/API/api_steps.js
```
UI Step definitions:
```
cypress/integration/step-definitions/UI/test_steps.js
```
Mock data:
```
cypress/mocks/api
```
Page objects:
```
cypress/support/page-objects
```
Page components:
```
cypress/support/page-components
```
Test report:
```
cypress/mochawesome-report/test-report.html
```
Screenshots on test failure:
```
cypress/screenshots
```
Config file:
```
cypress/cypress.json
```

### Summary
#### API
I decided to go with Cypress for both the API and UI as I felt this makes it a clean solution with both the UI and api able to share certain components such as mock-server etc. I added relevant tests to the api feature file which will all pass, in order to test the failure conditions feel free to modify the test values or mock data, the framework should record a screenshot on test failure which shows the request which caused the test to fail.

#### UI
I decided to go with the Page object pattern in combination with  cucumber for this as I felt it made writing tests for the website more readable. Due to time constraints, I was unable to add the actual test scenarios, but I have added required functions in the page objects to carry out certain actions and in turn added the step definitions which call said functions. I have tried to make the tests reusable, there is a lot of room for improvement due to time contraints. 

#### Key journeys I would test
- Going from selecting an all inclusive pass(due to the design of test steps all passes can be tested using cucumber scenario outlines) for x number of adults and children through to payment
- Selecting an attraction, then following that jpurney through to completion, again designing the tests in a way that enables testing each tour type
- Signing up for offers
- Testing the cart by adding/removing items and checking price calculations







