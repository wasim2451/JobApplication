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
app.post('/apply',(req,res)=>{

    // const random=Number(Date.now());
    // console.log(formData);
    const {name,email,phone,dob,address,position,experience,resume}=req.body;
    db.execute(`INSERT INTO STUDENT_INFO 
    (STUDENT_NAME, EMAIL, PHONE_NO, DOB, ADDRESS, POSITION, EXPERIENCE, RESUME_LINK)
    VALUES 
    (?,?,?,?,?,?,?,?)`,[name, email, phone, dob, address, position, experience, resume])
    .then(([results])=>{
        console.log('Inserted Results : ',results);
        res.send(`<h1>Application Submitted Successfully</h1>
        <h2>You Can Exit this Page! 💀</h2>`);
    })
    .catch((err)=>{
        console.log('DB Error',err);
        return res.status(500).send('Internal Server Error ! 💣')
    });
})
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})