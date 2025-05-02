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
});
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
});
app.get('/admin',(req,res,next)=>{
    db.execute('SELECT * FROM STUDENT_INFO')
    .then(([rows,fields])=>{
        res.render('Admin',{data:rows});
    })
    .catch((err)=>{
        console.log('DB Error');
        return res.status(500).send('Internal Server Error 💣');
    })
});
app.get('/applicant/:id',(req,res)=>{
    const ID=req.params.id;
    db.execute(`SELECT * FROM STUDENT_INFO WHERE ID=?`,[ID])
    .then(([rows,fields])=>{
        if(rows.length===0){
            return res.status(404).send('<h1>Applicant not found 😢</h1>');
        }
        res.render('Profile',{data:rows[0]});
    })
    .catch((err)=>{
        console.log('DB Error');
        return res.status(500).send('Internal Server Error 💣')
    })
});
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});