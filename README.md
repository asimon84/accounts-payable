Accounts Payable
================

This is a code sample of a basic Accounts Payable application. Create and edit invoices, process payments, and view reports.

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

Testing
=======

Running unit tests

php artisan test
