const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const secretKey = 'secret';
const cors = require('cors');
const app = express();
const port = 3000;

// Array to store data
let data = [];

app.use(cookieParser());

// Middleware to parse JSON data
app.use(express.json());
app.use(cors({ origin: '*' }));

// Endpoint to add data
app.post('/register', (req, res) => {
    const { name, password, email } = req.body;
    const newData = { name, password, email };


    if (data.find(user => user.email === email)) {
        res.status(409).json({ message: 'Username already exists' });

    } else {
        data.push(newData);
        res.status(201).json({ message: 'User created' });
    }
    console.log(newData);
    res.json({ message: 'Data added', data: newData });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const datas = data.find(data => data.email === email && data.password === password);
    if (datas) {
        // User is authenticated, return a JWT token
        const token = jwt.sign({ email }, secretKey);
        res.json({ token, data });
    } else {
        // User is not authenticated, return an error response
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


// Endpoint to retrieve all data
app.get('/data', (req, res) => {
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});