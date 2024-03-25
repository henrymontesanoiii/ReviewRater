import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

//set up middleware

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//import routes 
import("./routing/htmlroutes.js")(app);
app.use(express.static(__dirname));

app.listen(PORT, function(){
  console.log(`App is now running on http://localhost:${PORT}`);
}); 