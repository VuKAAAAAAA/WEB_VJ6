const express = require('express');
const mongoose = require("mongoose");
//"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath="c:\data\db"
const bodyParser = require('body-parser');
const result = require('dotenv').config()
const app = express();
const db = mongoose.connect('mongodb://localhost/movieAPI');//database connection
const port = process.env.PORT || 3000;
const movieRouter = express.Router();
const genreRouter = express.Router();
const userRouter = express.Router();
const Movie = require('./models/movieModel');
const User = require('./models/userModel');
const {signJwt, verifyJwt} = require('./jwt');
const cors = require('cors');

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

userRouter.route('/login')
.post((req, res)=>{
    User.find({email: req.body.email}, function (error, users) { 
        if (error || users.length === 0) {
            return res.send(error);
        }
        if (req.body.password !== users[0].password) {
            return res.send("Wrong password")
        }
        const token = signJwt(users[0]._id);
        return res.json({accessToken: token, user: users[0].email});
    })
});

userRouter.route('/register')
.post((req, res)=>{
    console.log(req.body.email + req.body.password);
    User.find({email: req.body.email}, function (error, users) { 
        if (error || users.length > 0) {
            console.log(users.length);
            return res.send(error);
        }
        let user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
        user.save();
        return res.json(user);
    })
});
//app.use("/api", verifyJwt);
app.use("/api", userRouter);

genreRouter.route('/genres')
.get(verifyJwt, (req, res)=>{
    //console.log(process.env.SECRET); provjera da smo ucitali SECRET iz .env-a
    Movie.find().distinct('genre', function(error, genres) { //distinct iz mongoose-a
        if (error) {
            return res.send(error);
        }
        return res.json(genres);
    })
});
app.use("/api", genreRouter);

movieRouter.route('/movies')
.get((req, res)=>{
    const query = {};//filter objekt za upit u bazu preko mongoose-a
    if(req.query.genre){
        query.genre = req.query.genre;
    }
    Movie.find(query,(err, movies)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json(movies)
        }
    });
});
app.use("/api", movieRouter);

movieRouter.route('/movies/:movieId')
.get((req, res)=>{    
    Movie.findById(req.params.movieId, (err, movie)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json(movie)
        }
    });
});
app.use("/api", movieRouter);


app.get('/', (req, res) =>{
res.send("Welcome to my API!!!");
})

app.listen(port, ()=>{
console.log("Running on port" + port);
})