# Project Setup

This guide will walk you through the steps to set up and run our project. Please follow the instructions carefully.

## Prerequisites

- [MySQL](https://www.mysql.com/) installed.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

## Setting up the Database

1. Install MySQL.
2. Open a terminal and navigate to the directory containing the `gps.sql` file.
3. Import the `gps.sql` file into your database. You can do this using the following command:

   ```bash
   mysql -u your_username -p your_database_name < gps.sql
   Replace your_username and your_database_name with your MySQL username and database name. You will be prompted to enter your MySQL password.
   ```

Setting up the Server
Download our project.

Open a terminal and navigate to the "server" directory.

Install the server dependencies by running:

```
npm install
```
After all dependencies are installed, start the server with:

```
npm start
```
Setting up the Client
Open a new terminal.

Navigate to the "client" directory.

Install the client dependencies by running:

```
npm install
```
After all dependencies are installed, start the client with:

```
npm start
```
Starting the Project
Once you have successfully set up the server and client, the project will start automatically. You can access it in your web browser at http://localhost:your_port, where your_port is the port specified in your server's configuration.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
