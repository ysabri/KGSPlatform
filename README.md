## Manual on how to use platform


Name and description:
The KGSPlatform website is a restful API that collects data using MongoDB. The website has pages and more details on this can be found in document "./KGSP web platform.docx".

## Installation:

The platform will run using StrongLoop. StrongLoop is generated and run using Node.js and Node-Express. Documentation for StrongLoop can be found on this [link](https://docs.strongloop.com/display/SL/Installing+StrongLoop)
Follow instructions in the link to install required applications to run StrongLoop.

Afterwards, in the command line, go to the main repo folder and run "npm install" to install all the dependencies for the project.

In order to run and view the website, in the repo main folder also run command "node .". This will create a web-server and the website can be viewed using the link provided. The server can be run in two more modes, development and production, check StrongLoop documentation for more information on this.

To read more and know the dependences the website uses, view file "./package.json".

## Usage:

 - The web server settings and boot scripts can be found in "./server/server.js".
 - The website uses passport in order to validate user data and log them in.
 - The website uses express-handlebars (E-H) to render HTML output templates. The HTML files and templates are located at directory "./views". For more on templates and how to use E-H go to this [link](https://github.com/ericf/express-handlebars). The HTML files use Bootstrap as CSS framework.
 - Data bases can be added to the project and configured in file "./server/datasources.json".
 - StrongLoop relies on module to save data in the database. The website has a user module already configured. To declare modules add them to file "./server/model-config.json", then add their attributes in directory "./common/models" as json files. Check the user module implemented already as an example.
 - Adding a data base and creating module for the website can be done in the command line. Check the strongLoop documentation above for more on this. The advantage of using the command line is that it generates all the files above by itself.
 - All the platform settings and configurations can be found in the rest of the files in the "./server" directory. The file is commented and is where all the HTTP requisites will get handled.
 - The website uses Passport module to authenticate users. To check what type of authentications are implemented in the website or add more go to file "./provider.json". To read more about Passport and how to use it go to "http://passportjs.org/docs/".
 - The webapp uses Node-Express to run, to read more about it check this [link](http://expressjs.com/en/4x/api.html#res.app).


## FAQ:
 - The google Oauth2.0 is still not fully implemented. Till this is done the username and password fields will stay there.
 - The MongoDB will not get setup and created till the google Oauth2.0 is fully implemented. The goal is to get each user that logs in linked with a user instance that has the rest of his data.
 -  The templates in the views folder are not fully implemented yet. More should be done to make the website consistent.
 - For implementing the Passport authentication this github project is a great [example]( https://github.com/strongloop/loopback-example-passport)
