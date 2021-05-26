# OAuth Box
An authorization web app that simulates and describes the OAuth 2.0 standard. It aims to show how OAuth 2.0 works using graphics, animations, and articles that describe its flow.

![Logo](./client/src/resources/oauth-box-logo.png)

## Deployment
Currently planning to deploy to AWS once a working build is available.

## Technologies
This web app is designed around the MERN stack.
- Express (Node.js)
- MongoDB Atlas (possible migration to AWS DynamoDB in the future)
- React
- Material-UI
- Passport


## How to contribute
Fork the repo, clone it to your local machine, setup remotes, and run:
```
npm install
```
to install the project's main dependencies. Then you must install the client dependencies by running the script:
```
npm run client-install
```
For development, you can run the back-end, front-end, or both using the following scripts:
Back-end (note: you need the .env file to connect to the database):
```
npm run api
```
Front-end:
```
npm run client
```
Both front-end and back-end:
```
npm run dev
```
To view what needs to be worked on, go to the "Issues" tab in the GitHub repo. For a better view, go to the project's kanban board under "Projects".



