const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// connect database

connectDB();

// Init Middleware

app.use(express.json({ extended: false }));

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/teacher/profile', require('./routes/api/teacherProfile'));
app.use('/api/student/profile', require('./routes/api/studentProfile'));

app.use('/api/tasks', require('./routes/api/tasks'));


app.use('/api/class', require('./routes/api/class'));

// Server static assets in production

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
