# What is Onchain Surveys
Onchain Surveys will allow users to create public surveys to collect opinions from the blockchain communities to let the community make decisions and provide sentiment in a decentralized manner.

## API SETUP

### Step 1: Clone this project to www or htdocs folder

git clone https://github.com/onchainsurveys/onchain.git

### Step 2: Install packages for API

Navigate to the api folder from your terminal screen and run the following command:

npm i
npm start


### Step 3: Mongodb

You should have a MongoDB account. The URI connection string needs a username, password, and cluster name with an attached ID. If not, create an account and get the URI string from [MongoDB](https://www.mongodb.com/).

Change the MongoDB fields according to you in the `.env` file in the api folder.

### Step 4: Run the project

Run the following code on the terminal screen and visit the [http://localhost:8800](http://localhost:8800) link.

### Step 5: Endpoints

| Endpoints             | Description                                | Acceptable values | Method |
|-----------------------|--------------------------------------------|-------------------|--------|
| /api/surveys          | Add a new survey to db                     |                   | POST   |
| /api/surveys/id       | Update an existing survey with the id parameter | ObjectId      | PUT    |
| /api/surveys/id       | Delete an existing survey with the id parameter | ObjectId      | DEL    |
| /api/surveys/         | View all surveys from db                   |                   | GET    |
| /api/surveys/id       | View a product by id from json file        | ObjectId        | GET    |
| /api/surveys/pending/0 | View all pending surveys                  | Number          | GET    |
| /api/pending/1        | View all opened surveys from db           | Number          | GET    |
| /api/auth/register    | Add a new user to db                      |                   | POST   |
| /api/auth/login       | Check for existing user to login          |                   | POST   |
| /api/users/admincheck/id | Check admin                              | ObjectId        | GET    |
| /api/users/usercheck/id  | Check user                               | ObjectId        | GET    |
| /api/users/id         | Modify a user using id                    | ObjectId        | PUT    |
| /api/surveys/getmysurvey/username | Get surveys created by username     | Username        | GET    |



## CLIENT SETUP

### Step 1: Install packages for CLIENT

Navigate to the client folder from your terminal screen and run the following command:

```bash
npm i
npm start
```

After that, visit [http://localhost:3000](http://localhost:3000).

### Step 2: Add the following codes to your .htaccess file.

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-l
RewriteRule . /index.html [L]
```

## Testing

We use Cypress for testing the portal's critical functionality. In order to run the test suite, you will need to copy the example `cypress.example.json` to `cypress.json` and enter your variables. Then after a successful build, run `npm run cypress-run` for a headless unit test, or `npm run cypress-open` for a more detailed test interface.

```bash
npm install cypress
npx cypress open
```
