const express = require('express');
const app = express();
const path = require('path');
const db=require('./connect')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// db.execute('SELECT * FROM STUDENT_INFO')
// .then(([data,fields])=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });

app.get('/', async(req, res) => {
   res.render('Home');
})
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})