# Overview

This is an npm module that can track and report details of a demo/tutorial that has been deployed as an Electron app.

## To Use

1. Open a terminal and run  
   ```
   npm install electron-deployment-tracker-client --save
   ```
2. Require the package in your main entry point to your app (probably app.js).  
    ```
    require("electron-deployment-tracker-client").track();
    ```
3. Add a copy of the Privacy Notice to the readme file. 

   **Note:** All apps that have deployment tracker must include the Privacy Notice.

## Privacy Notice

Sample Electron applications that include this package may be configured to track deployments. 
The following information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service on each 
deployment:

* Node.js package version
* Node.js repository URL
* Node.js package Name (`application_name`)
* Node.js package Version (`application_version`)

This data is collected from the `package.json` file in the sample application to measure the usefulness 
of our examples, so that we can continuously improve the content we offer to you. 

Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

## Disabling Deployment Tracking

Please see the README for the sample application that includes this package for instructions on disabling 
deployment tracking, as the instructions may vary based on the sample application in which this package is 
included.
