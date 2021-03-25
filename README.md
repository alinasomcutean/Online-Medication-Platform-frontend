# Online Medication Platform Frontend

This is the first module of a distributed system for an intelligent medication management system for home-care for patients that need constant medication, medical supervision and assistance in case of home accidents.

The system can be accessed by three types of users after a login process: doctor, patient and caregiver. The doctor can perform CRUD operations on patient accounts, caregiver accounts and on the list of medication available in the system. The medical record of a patient must contain a description of the medical condition of the patient. Furthermore, the doctor can create a medication plan for a patient, consisting of a list of medication and intake intervals needed to be taken daily, and the period of the treatment. The patients can view their accounts and their medication plans. The caregivers can view their associated patients and the corresponding medication plans.

## Prerequisites

### Run locally: take the version from the master branch

If you want to run the application locally on your computer you need:
* Node.js and Node Package Manager, [NPM](https://nodejs.org/en/). Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine and NPM is a package manager for Node.js and is installed with Node.js
* an IDEA (like IntelliJ or Eclipse)
* [NGINX](http://nginx.org/en/download.html): a lightweight and high performance Web server

### Run from Heroku: take the version from the production branch

In order to run the application on the Heroku you should first have an account. Then you should only find the application in your account and open it. This will give you a list with all the urls used in this project.