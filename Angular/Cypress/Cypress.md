# Cypress

1. Install Cypress:
     ```
     npm install cypress --save-dev
     ```

2. Set up Cypress:
   - Once the installation is complete, run the following command to open the Cypress Test Runner:
     ```
     npx cypress open
     ```
   - This command will initialize Cypress and open the Test Runner window.

3. Create your first test:
   - In the Cypress Test Runner, click on the "Add folder" button and create a new folder called "integration".
   - Inside the "integration" folder, create a new file with the `.spec.js` extension (e.g., `house-detail.spec.js`).
   - Open the test file in your preferred code editor and write your test using the Cypress API. Refer to the previous example for the `HouseDetailComponent` test.

4. Run your test:
   - In the Cypress Test Runner, click on the test file (`house-detail.spec.js`) you created to run the test.
   - Cypress will open a browser window and run the test.
   - You can see the test's progress and results in the Cypress Test Runner.

That's it! You have installed Cypress, set up your project, written a test, and run it using the Cypress Test Runner. You can continue adding more test files in the "integration" folder and run them using the Test Runner.

Note: Cypress also allows running tests in headless mode (without the Test Runner UI) through the command line. To run tests in headless mode, you can use the command `npx cypress run`.