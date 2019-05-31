# myJobMarket

---

This is the final project of the course of web development in [codeyourfuture.io](https://codeyourfuture.io)

This project is live at [heroku](https://stormy-caverns-71378.herokuapp.com)

## Requirements

- node

## Setup

###This will start server at port 7000

```bash
$ npm install # install project dependencies
$ npm start # start backend application on localhost:7000
```

###This will start React server at port 3000

```bash
$ cd frontend # install project dependencies
$ npm start # start backend application on localhost:7000
```

## User Stories

### 1-Visiting Users

- When a user enters the app, will be directed to authorization page immediately.
- A user can create an account and/or login after having credentials.
- An unauthorized user have access only to projects page. They can view defined projects but they are not permitted to create a new project or apply for a defined project.

### 2-An employer

- When a user logs in the app, will have access to create a project.
- This feature is visible on top of projects' list at projects page.
- By clicking on "Define a project" a new modal shows, that recieves details about the projects.
- This data, are sent to the server in along with the userId of loged in user.
- The new projects' details add to projects list at frontend automatically.

### 3-Editing a project

- projects defined by the current user can be edited or deleted from projects.
- By clicking "Edit" button, a new form shows and the user can update details of the selected project.
- By clicking "Delete" button, a question is asked whether the user is sure about deleting the project or not.
- Confirming these actions will edit/delete the selected project in the database and frontend preview.

### 4-A job applicant

- This feature is available for loged in users.
- In the "View details" modal, a loged in user can see "Apply" button instead of "OK".
- When a user hits apply button, selected project and current user's details are collected.
- A user's applications are available at "applications" page. for only loged in users.

### 5-Cancelling an application

- In the "applications" page, a user can cancel an application.
- by clicking "cancel application", the application will be deleted from database
- and it will be omitted from the list in the applications page.
