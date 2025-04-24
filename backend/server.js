const express = require('express');
const app = express();
const cors = require('cors')
const pool = require('./db/dbConfig');
const upload = require('./utils/multur');
const uploadImage = require('./utils/cloudinary')
const path = require('path')

app.use(cors());
app.use(express.json());

app.post('/upload',upload.single('file'), async(req, res)=>{
  try{ 
   const file = req.file
   console.log(file)
   const data = await uploadImage(path.join(__dirname, `/upload/${file.originalname}`))
   res.status(200).json({data: data, flag: true})
  }catch(err){
    console.log(err)
    res.status(500).json({data: [], flag: false})
  }
})

pool.connect().then(()=>{

  app.listen(3000)
  console.log("server running")
}).catch((err)=>{
  console.log("db connection fail", err)
})
