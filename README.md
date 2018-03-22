[![Build Status](https://travis-ci.org/jdesrosiers/api-browser-web.svg?branch=master)](https://travis-ci.org/jdesrosiers/api-browser-web)

API Browser Web Client
======================

This is a web interface for the API Browser.

Development
-----------

This is implemented as a Vue.js app.

* `npm install` - Install dependencies
* `npm run serve` - Start the server
* `npm test` - Run the tests
* `npm test -- --watch` - Continuous test runner

Deployment
----------

Continuous deployment is used for this application. Continuous deployment aims to automate the process of deploying code. Each stage in the process is automated, so that every change that passes all the tests is deployed to production automatically. These are the steps in the process:

* A PR is opened for a branch (feature, bug fix, etc.)
* Travis CI checks the build
* The PR is approved
* The branch is merged into master
* Travis CI deploys the app to GitHub pages

This app is deployed to: https://jdesrosiers.github.io/api-browser-web/

**Note**: Deployment should never be done manually. It should only be done through the automated process.
