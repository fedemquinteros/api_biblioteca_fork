
const express = require('express');


const app = express();


app.use(express.json());


let users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' }
];

// GET /users: Returns the complete list of users
app.get('/users', (req, res) => {
    res.json(users);
});

// GET /users/:id: Returns the details of a specific user based on their ID
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// POST /users: Create a new user with the information provided
app.post('/users', (req, res) => {
    const { name } = req.body;
    const id = users.length + 1;
    const newUser = { id, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id: Updates information for a specific user based on their ID
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const user = users.find(user => user.id === id);
    if (user) {
        user.name = name;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE /users/:id: Delete a specific user based on their ID
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});