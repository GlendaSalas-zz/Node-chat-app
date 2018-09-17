require('./../config/config');

const path = require('path');
const publicPath=path.join(__dirname,'../public');
const  express = require('express');
const hbs = require('hbs');
const port=process.env.PORT;

hbs.registerPartials(publicPath); // register partiales load all partials from a specific directory

var app= express();

app.use(express.static(publicPath));// CONFIGURATION EXPRESS

// app.set('public', 'hbs');
//
// app.get('/', (req, res)=>{
//   console.log(req);
//   // res.send("<H1>Hello EXPRESS</H1>")
//   res.render("index.hbs",{
//     pageTitle:'Home',
//     welcomeMessage:'¡Bienvenido!'
//   })
// });

app.listen(port, ()=>{
  console.log(`SERVER PORT ${port}`)
});
