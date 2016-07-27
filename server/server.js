var loopback = require('loopback');
var boot = require('loopback-boot');
var exphbs = require('express-handlebars');

var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

// Load the provider configurations
var config = {};
try {
 config = require('../providers.json');
} catch(err) {
 console.error('Please configure your passport strategy in `providers.json`.');
 console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
 process.exit(1);
}

//////////////

//setting up view engine
app.engine('handlebars', exphbs({defaulLayout: 'main'}));
app.set('view engine', 'handlebars');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
});

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));


//install module to uncomment
// app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
// app.middleware('session', loopback.session({
//   secret: 'kitty',
//   saveUninitialized: true,
//   resave: true,
// }));

// // Enable http session
// app.use(loopback.session({ secret: 'cat4com' }));


// Initialize passport
passportConfigurator.init();

// Set up related models
passportConfigurator.setupModels({
 userModel: app.models.user,
 userIdentityModel: app.models.userIdentity,
 userCredentialModel: app.models.userCredential
});

// Configure passport strategies for third party auth providers
for(var s in config) {
 var c = config[s];
 c.session = c.session !== false;
 passportConfigurator.configureProvider(s, c);
}

//install module before uncommenting
//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


app.get('/', function(req, res){
  res.render('login');
});

app.get('/home', function(req, res){
  res.render('index');
});



app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
