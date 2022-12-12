### Functionality of the project ###
Our project mainly contains two main modules:
1. Recruiter
2. Candidate

Recruiter will perform following activities:
- Create Assessment
- Select and define the questions from (MCQ, Essay, Coding question, and Multi Select Question)
- Invite candidates for the assessment

#Recruiter can later invite the candidate along with edit and delete assessment.

Upon the successful creation of assessment, an email will be sent to all the added candidates which contains a weblink from where the candidate will start the assessment.

Candidate will perform following activities:
- Start the assessment from weblink sent over to his/her email address
- allow permission to camera and will capture the image
- Attend the assessment
- Submit the answers


### Project from Coding perspective ###
The front end (UI/UX) is written in React.js
We have 2 folders for the front end named:
1. react-frontend:
2. react-backend:

For the backend part, we have used Flask framework
The folder named "backend" contains all the APIs for whole project.

### Installment of the Project on LOCALHOST ###
Technologies:
1. React.js
- try 'node -version' or 'node -v' in terminal/command prompt to check whether node js is installed or not?
- if it is not installed, please visit https://nodejs.org/en/download/ and download the node js as per your OS.
- After successful installation of node js, please open our folder and hit 'npm update' to make sure the correct version of node js
- Finally, write 'npm start'. It should the server (localhost) on 3000 port.

2. Python 
- try 'python -version' or 'python -v' in terminal/command prompt to check whether Python is installed or not?
- if it is not installed, please visit https://www.python.org/downloads/ and download the node js as per your OS.
- After installation of python check for virtual environment is installed or not if it is not installed hit 'pip install virtual env'. 
-After successful installation of virtual environment enter 'python -m venv venv'
- After successful installation of python, please type 'pip install -r requirements.txt' to cope up with the version of our project.
- The reason for this commnad is, we have requirements.txt in the project which specifies the version of different libraries so it will install those libraries    with the specified version written in requirements.txt
- Now, open the backend folder in cmd/terminal and hit venv\scripts\activate in the windows and venv/bin/activate in the MacOS
- Finally, enter command 'flask run' to start the backend


### Our project on server ###
Link: https://eassessment-backend.netlify.app/

Note: The web page will ask to login which is dedicated for 'Recruiter' login. Please go and sign up as an recruiter to start the project on the server.
Upon successful signup, please login through the page and create new assessment. The email will be sent to the candidates you have added in the assessment so that the server will send them a weblink to start the assessment on their site.

Our code will take a pictures of the candidates while they are attending the assessment in order to avoid any misconduct or bad-practice.
