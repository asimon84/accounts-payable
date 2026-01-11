Accounts Payable
================

This is a code sample of a basic Accounts Payable application. Create and edit invoices, process payments, and view reports.

This is a project built in Laravel 12 using a React frontend. It contains datatables, c3 charts, docker containers, and form 
components. This project demonstrates React and Laravel proficiency.

Installation
============

git clone git@github.com:asimon84/accounts-payable.git

Rename the file ".env.example" to ".env" 

composer install

npm install

npm run build

php artisan migrate

php artisan db:seed

php artisan serve

LOGIN
=====

After running the above commands, navigate to your localhost to login:

http://localhost:8000

This should redirect you to the login URL:

http://localhost:8000/login

CREDENTIALS
===========

Use these credentials below to login

http://localhost:8000/login

user: test@example.com
pass: test1234

DATABASE ROLLBACK
=================

If you need to reset the database back to it's original state after interacting with data, you can run these commands:

php artisan migrate:rollback

php artisan migrate

php artisan db:seed

DOCKER
======

**WORK IN PROGRESS**

**This section is a work in progress**

navigate to project root in terminal and type:

docker-compose up

Testing
=======

Running unit tests. From project root in terminal type:

php artisan test

That command will run all tests. Tests are divided into groups; Unit Tests, Integration Tests, and Feature Tests. Unit Tests simply test code itself. Integration Tests test code integrated with database interaction. Feature Test verify functionality of features as a whole, like functionality of navigating to page. 

To run only one category of tests, you can use these commands:

php artisan test --testsuite=Unit

php artisan test --testsuite=Integration

php artisan test --testsuite=Feature

ADDING PDF FONTS
================

To add new fonts for use in downloading tables as PDF files, add the font .tff files to the ./resources/fonts/ folder. 
Navigate to the node_modules/pdfmake folder and then run this command:

node build-vfs.js "../../resources/fonts"
