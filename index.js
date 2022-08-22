require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Checking database connection
const db = require('./api/config/database');

db.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => console.log(err));

const cors = require('cors')

// Importing routes
const userRoutes = require('./api/routes/userRoutes');
const blogRoutes = require('./api/routes/blogRoutes');
const loginRoute = require('./api/routes/loginRoute');

// Middlewares
app.use(cors());
app.use(express.json());

// Creating routes
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);
app.use('/login', loginRoute);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${ PORT }`)
});