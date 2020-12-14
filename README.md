# COL App
COL or Cognitive Off-Loader allows users to create calendar events with a date, title, and details for the scheduled event.



### 1. Working Prototype
You can access a working prototype of the React app here:  and Node app here: 



### 2. User Story

###### Cover Page
* As a visitor
* I want to understand what this app entails to make a decision if I want to use it

###### Login Page
* As a returning register user
* I want to enter my email and password to use this app, so I can have access to my account.

###### Sign Up/Registration Page
* As a visitor
* I want to register to use this app so I can create a personal account.

###### My Home Page
* As a logged-in user,
* I can see the current month on the calendar component and the events I have already bookmarked for that month listed below. If I click a specific day the on calendar component the list of events change to show events bookmarked only for that specific day.

###### My Profile Page
* As a logged-in user,
* I can see my account information (name and email), and if I want to delete my account I can hit the delete button to do so.

###### Create Event Page
* As a logged-in user,
* I can create events to be scheduled on the day I choose, with a title, and a brief description or note for the event.



### 3. Screenshots
Cover Page
:-------------------------:
![Cover Page](/screenshot-images/Cover-Page.png)
Login Page
![Login Page](/screenshot-images/Login-Page.png)
Sign Up/Registration Page
![Sign Up/Registration Page](/screenshot-images/Sign-Up-Page.png)
Home Page
![Home Page](/screenshot-images/Home-Page.png)
Proflie Page
![Profile Page](/screenshot-images/Profile-Page.png)
Event Page
![Event Page](/screenshot-images/Event-Page.png)



### 4. API Documentation
API Documentation details:
* GET All Events by Month
    * `https://nomnoms-app.herokuapp.com/api/home/:beginningOfMonth:endOfMonth`

* GET Profile
    * `https://nomnoms-app.herokuapp.com/api/profile`

* POST Event
    * `https://nomnoms-app.herokuapp.com/api/create-event`
        * JSON body
        *   { "Title": "Lunch with Client", "event_desc": "Bring Pitch Material ", "event_date": 2013-03-01T00:00:00+01:00, 
            }

* POST User
    * `https://nomnoms-app.herokuapp.com/api/create-account`
        * JSON body
        *   { "full_name": "John Doe", "email": "john.doe3@gmail.com", "password": "Password123!" }

* DELETE Event
    * `https://nomnoms-app.herokuapp.com/api/home/:event_id`

* DELETE Profile
    * `https://nomnoms-app.herokuapp.com/api/profile/:user_id`




### 5. Technology
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, PostgreSQL 
* Development Environment: Vercel, Heroku
 


### 6. How to run it
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate 
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test
