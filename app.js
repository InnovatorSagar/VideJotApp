const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const app = express();

//Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport config
require('./config/passport')(passport);
//DB config
const db = require('./config/database');
//Connect to mongoose
mongoose.connect(db.mongoURI)
.then(()=>console.log('Mongodb connected...'))
.catch(err=>console.log(err));

//handlebars middlewares
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body-parser mddleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')));

//Method-override middleware
app.use(methodOverride('_method'));

//Express Session middleware
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized:true,
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//Global variables
app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user||null;
  next();
});

//Index route
app.get('/',(req,res)=>{
const title = 'Welcome1';
res.render('index',{
    title
  });
});

//About route
app.get('/about',(req,res)=>{
  res.render('about');
});

//Use routes for users
app.use('/users',users);

//Use routes
app.use('/ideas',ideas);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`Server is up at port ${port}`);
});
