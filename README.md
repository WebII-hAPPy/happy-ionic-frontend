# hAPPy

Welcome to the frontend of the hAPPy project.
This is a project done for the class 'Web-Engineering II' at the DHBW Stuttgart.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Pages](#pages)
3. [Providers](#providers)

## <a name="getting-started"></a>Getting Started

To start developing clone this project and install the latest version of the Ionic CLI then run:

```bash
npm install
ionic start hAPPy
```

## Architecture

The architecture of this app follows the standard ionic architecture arche-type.
It differentiates between pages (the views of the app) and provideres (services which work with data).

## Pages

This project is divided into multiple pages.

### Welcome

The Welcome-Page is the entry point to the app from the users perspective.
The Welcome-Page lets you choose between the SignUp- and Login-Page.

### SignUp

The SignUp-Page lets you create an account by posting to the register enpoint of the backend.
On successful sign-up:
While signing up a new user is created in the backend and a verfication mail is send to the specified email.
It will also log the new user in and push the view to display the Picture-Page.

### Login

The Login-Page lets you login to an existin account by posting the information to the login endpoint of the backend.
On successful login:
While login in the user gets authenticated and a jwt token is stored in the app.
It will push the view to display the Picture-Page.

### Tabs

The parent View for the Picture-, Statistics- and Settings-Page.
It lets you switch betweent the Pages.

### Picture

The Picture-Page lets you upload an image to be analysed.
It will display the result of the analysis.

### Stats

The Stats-Page will display additional information about the last analysed images.
It uses the chart.js library to display this information.

### Settings

The Settings-Page will let you choose between some basic settings, like changing your user name, loging out and deleting an account.

## Providers

The data-servies of this app.

### Api-Service

A wrapper for a standard api.
It implements the GET-, POST-, PUT-, DELETE- and PATCH-Methods.
Altough not alle methods are used at this point in time they are still implemented for consistency and future developement.

### Settings-Service

This service provides functionality for storing and loading settings.
It also helps with merging settings with the defeault settings.

### User-Service

This service represents the user and their data.
It provides methods for loging in, signing up and loging out.