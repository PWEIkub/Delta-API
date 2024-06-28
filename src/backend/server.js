const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to sign up' });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
