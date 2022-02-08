// BUILD YOUR SERVER HERE
const userModel = require('./users/model')
const express = require('express');
const { required } = require('nodemon/lib/config');
const server = express()

server.use(express.json());

server.get('/', (req, res) => {
    console.log('Server: Sanity Check Success...')
})

server.get('/api/users', (req, res) => {
    userModel.find()
    .then(users => {
        res.json(users)
    }).catch(() => {
        res.status(500).json({message: "could not get users"})
    })
})

server.get('/api/users/:id', (req, res) => {
    let { id } = req.params;
    userModel.findById(id)
    .then(user => {
        if( user === undefined || user === null){
            res.status(404).json({message: `user ${id} could not be found!`})
        } else {
            res.json(user)
        }
    }).catch(() => {
        res.status(500).json({message: "could not get user!"})
    })
})

server.post('/api/users', (req, res) => {
    let body = req.body;
    if(!body.name || !body.bio){
        res.status(500).json({message: "Name and Bio are required!"})
    } else {
        userModel.insert(body)
        .then(newUser => {
            res.status(200).json(newUser)
        }).catch(() => {
            res.status(500).json({message: "Unable to create new user!"})
        })
    }
})


server.put('/api/users/:id', async (req, res) => {
    let { id } = req.params;
    try{
        let user = await userModel.findById(id);
        if(user === undefined || user === null){
            res.status(404).json({message: `user ${id} not found!`})
            return
        }

        let body = req.body
        if(!body.name || !body.bio){
            res.status(500).json({message: "Name and Bio is required!"})
        } else {
            let newUser = await userModel.update(id, body)
            console.log(newUser)
            res.status(200).json(newUser)
        }

    } catch(e) {
        res.status(500).json({message: "Cannot Update User, User not found!"})
    }
})


server.delete('/api/users/:id', (req, res) => {
    let { id } = req.params;
    userModel.remove(id)
    .then(deletedUser => {
        if(deletedUser === undefined || deletedUser === null){
            res.status(404).json({message: "could not find specific user to delete!"})
            return;
        }

        res.status(200).json({message: "Successfully deleted user!"})
    }).catch(() => {
        res.status(500).json({message: "Unable to delete user!"})
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
