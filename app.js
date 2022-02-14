const express = require('express');
const dotevn = require("dotenv");
const mongoose =  require('mongoose');

//import rooute
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');


const app =  express();
dotevn.config();
app.use(express.json());


mongoose.connect(process.env.MONGO_DATABASE, {useNewUrlParser: true})
  .then(() => {
      console.log('Database conncted was Successful!!')
  }).catch((err) => console.log(err));


app.use('/todo', todoRouter);
app.use('/user', userRouter);


//defalut error handler
const errorHandler = (err, req, res, next)=>{
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({error: err});
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.PORT}`);
});
