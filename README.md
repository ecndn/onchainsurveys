# What is Onchain Surveys

Onchain Surveys will allow users to create public surveys to collect opinions from the blockchain communities to let the community make decisions and provide sentiment in a decentralized manner.

<h2>API SETUP</h2>

<h3>Step 1: Clone this project to www or htdocs folder</h3>
git clone https://github.com/onchainsurveys/onchain.git


<h3>Step 2: Install packages for API</h3>

Navigate to the api folder from your terminal screen and run the following command.

<pre>
npm i
</pre>

<h3>Step 3: Mongodb</h3>

You should have a mongodb account. The URI connection string needs username, password and cluster name with attached id. If not, create an account and get the uri string from https://www.mongodb.com/

Change the mongodb fields according to you in the .env file in the api folder.

<h3>Step 4: Run the project </h3>

Run the following code on the terminal screen and visit the http://localhost:8800 link.

<h3>Step 5: Endpoints </h3>

<table>
<thead>
<tr>
<th><strong>Endpoints</strong></th>
<th><strong>Description</strong></th>
<th><strong>Acceptable values</strong></th>
<th><strong>Method</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>/api/surveys</td>
<td>add a new survey to db</td>
<td></td>
<td>POST</td>
</tr>
<tr>
<td>/api/surveys/id</td>
<td>update an existing survey with the id parameter</td>
<td>ObjectId</td>
<td>PUT</td>
</tr>
<tr>
<td>/api/surveys/id</td>
<td>delete an existing survey with the id parameter</td>
<td>ObjectId</td>
<td>DEL</td>
</tr>
<tr>
<td>/api/surveys/</td>
<td>view all surveys from db</td>
<td></td>
<td>GET</td>
</tr>
<tr>
<td>/api/surveys/id</td>
<td>view a product by id from json file</td>
<td>ObjectId</td>
<td>GET</td>
</tr>
<tr>
<td>/api/surveys/pending/0</td>
<td>view all pending surveys</td>
<td>number</td>
<td>GET</td>
</tr>
<tr>
<td>/api/pending/1</td>
<td>view all opened surveys from db</td>
<td>number</td>
<td>GET</td>
</tr>  
<tr>
<td>/api/auth/register</td>
<td>add a new user to db</td>
<td></td>
<td>POST</td>
</tr>  
<tr>
<td>/api/auth/login</td>
<td>check for existing userto login</td>
<td></td>
<td>POST</td>
</tr>  
<tr>
<td>/api/users/admincheck/id</td>
<td>check admin</td>
<td>ObjectId</td>
<td>GET</td>
</tr>  
<tr>
<td>/api/users/usercheck/id</td>
<td>check user</td>
<td>ObjectId</td>
<td>GET</td>
</tr>    
<tr>
<td>/api/users/id</td>
<td>modify a user using id</td>
<td>ObjectId</td>
<td>PUT</td>
</tr>  
<tr>
<td>/api/surveys/getmysurvey/username</td>
<td>get surveys created by username</td>
<td>username</td>
<td>GET </td>
</tr>  
</tbody>
</table>


<h2>CLIENT SETUP</h2>

<h3>Step 1: Install packages for CLIENT</h3>

Navigate to the client folder from your terminal screen and run the following command.

<pre>
npm i
npm start
</pre>

and then visit http://localhost:3000


<h3>Step 2: </h3>

Add the following codes to your .htaccess file.

<pre>
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
</pre>

<h2>Testing</h2>

We use Cypress for testing the portal's critical functionality. In order to run the test suite, you will need to copy the example cypress.example.json to cypress.json and enter your variables. Then after a successful build, npm run cypress-run for a headless unit test, or npm run cypress-open for a more detailed test interface.

<pre>
cp cypress.example.json cypress.json
npm run cypress-run
</pre>
# dsfsdf
