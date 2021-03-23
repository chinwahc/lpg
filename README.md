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
git clone ssh:git@github.com:zoopla/Chituru-Chinwah.git
```
via https:
```$xslt
git clone https://github.com/zoopla/Chituru-Chinwah.git
```

### Installation
Install Cypress via npm:
```bash
$ cd Chituru-Chinwah
$ npm install
```
### Test Execution
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
Feature file:
```
cypress/integration/test.feature
```
Step definitions:
```
cypress/integration/test/test-steps.js
```
Page objects:
```
cypress/support/page-objects
```
Page components:
```
cypress/support/page-components
```
Screenshots on test failure:
```
cypress/screenshots
```







