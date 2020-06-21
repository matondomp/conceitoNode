const express=require('express');
 const routes=require('./route')
 const Cors=require('cors');

const app=express();
app.use(Cors())
app.use(express.json());
app.use(routes);


app.listen(3333);