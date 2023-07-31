# Node Backend Setup Guide

Welcome to the setup guide for the Node.js backend of your application. Follow the steps below to get started.

## Deployed URL

Your application has been successfully deployed. Access the Node.js backend at the following URL:

`Base Url: https://afcc-152-58-236-193.ngrok-free.app`

## Environment Variables

Create a `.env` file in the root directory of the project and set the following environment variables:


```
DB_HOST=          # Database host address
DB_NAME=          # Database name
DB_USER=          # Database username
DB_PASSWORD=      # Database password
PORT=             # Port on which the server will run
```

## Generating SSL Certificates

Check if the `certs` folder exists in the project root directory. If not, create it.

### Generate Private Key

Run the following command to generate a private key:

`openssl genrsa -out certs/private.key 2048`

### Generate Public Key

Run the following command to generate a public key from the private key:

`openssl rsa -in certs/private.key -pubout -out certs/public.key`


## Install Dependencies

To install all the required Node.js packages, run the following command:

`npm i`

## Running the Project

To start the Node.js backend server in development mode, use the following command:

`npm run dev`

The server will start running on the specified port, and you can now access the API endpoints.

Make sure to have the database credentials correctly set in the `.env` file and the SSL certificates generated in the `certs` folder to ensure a smooth run of the Node.js backend code.

**Note:** Ensure that the database is properly set up with the provided credentials before running the server.

Feel free to reach out if you encounter any issues or have any questions. Happy coding!
