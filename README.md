  Before running the project, ensure you have the following installed:

Node.js (v18 or later recommended)
npm
Installation
Clone the repository:
git clone https://github.com/Snotat/localbuka-intern-BE-assessment.git
Navigate into the project directory:
cd localbuka-BE-intern-assessment
Install dependencies:
npm install
Running the Application
Development
npm run dev
Production

Compile the project:

npm run build

Then start the server:

npm start

The API will be available at:

http://localhost:5000

ENDPOINTS

GET	/restaurants	Retrieve all restaurants with optional search and geolocation sorting
GET	/restaurants/:id	Retrieve a single restaurant together with its reviews
POST	/restaurants/:id/reviews	Submit a review for a restaurant
POST	/points/earn	Earn points for a check-in or review
GET	/points/balance/:userId	Retrieve a user's total points and points ledger

## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Available Scripts

### `npm run clean-install`

Remove the existing `node_modules/` folder, `package-lock.json`, and reinstall all library modules.

### `npm run dev` 

Run the server in development with hot reloading and browser refresh (see `package.json` for all `npm run dev` variations)<br/>

**IMPORTANT** development mode uses `swc` for performance reasons which DOES NOT check for typescript errors. Run `npm run type-check` to check for type errors. NOTE: you should use your IDE to prevent most type errors.

### `npm test`

Run unit-tests with <a href="https://vitest.dev/guide/">vitest</a>.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm run type-check`

Check for typescript errors.

## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`.
