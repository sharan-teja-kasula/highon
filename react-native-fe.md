# React Native Frontend Setup Guide

Welcome to the setup guide for the React Native frontend of your application. Follow the steps below to get started.

## Backend Server URL

Before running the React Native frontend, ensure that you have set up the backend server URL. Paste the deployed URL of the backend server in the `constants.js` file as follows 
`https://afcc-152-58-236-193.ngrok-free.app`;

Install Dependencies
To install all the required Node.js packages, run one of the following commands based on your package manager:

`npm install`

# or

`yarn`

This project is built using Expo, a powerful toolchain and platform for universal React applications. Expo allows us to easily develop, build, and deploy the app across multiple platforms.

Make sure you have Expo CLI installed. If not, you can install it globally using the following command:

`npm install -g eas`
Running the App
To run the React Native app on your Android device, follow the steps below:

Connect your Android device to your computer using a USB cable.

Turn on USB debugging on your Android device. If you are using an emulator, make sure it is running.

Run the following command to start the development server and run the app:

`npx expo run:android`
The Expo CLI will build the app and install it on your Android device. You can now see the app running on your device.

Note: The highon.apk file is available in the project folder. You can use this APK file to install the app on your Android device directly without running the development server.

Happy coding!

Please copy and paste the above markdown code into your README file for the frontend React Native project.




