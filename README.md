# Firebase authentication app with React, Vite and Chakra-UI

## Introduction

This is a complete Firebase authentication system with React, Vite and Chakra-UI. The app does not have any functionality by itself, but it is a template to use for any app that requires authentication with firebase. 

## Current functions

* Sign up with email and password
* Log in
* Log out
* A context to store all user information
* Sent emails to reset passwords
* A basic user profile
* Change user email
* Protected routes
* Dark mode by default

## How to start

To download the project, it is only necessary to follow these steps:

1. Clone the repository

```sh
git clone https://github.com/AdrianGlez18/react-vite-firebase-auth.git
```

2. Install the dependencies
```sh
npm install

or

yarn install
```

3. Create a firebase account

If you do not have one, you just have to go to firebase website and sign up with your Google account.
This project can be used with any other backend provider or with your own, you will just need to update the file `src/components/contexts/authContext.jsx` and `src/components/firebase.jsx`.

4. Configure a Firebase project

inside the Firebase console, you will need to generate a project to get your API keys and data.

5. Create your env variables

Create a .env.local file in your folder. You will need to add your Firebase information there.

