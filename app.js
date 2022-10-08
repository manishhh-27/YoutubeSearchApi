const express=require('express');
const axios = require("axios");
app=express();
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false }))
const API_KEY="AIzaSyALUBmDRQlGvvD_wmnFy555PNDO639QUBI";
const Url = "https://www.googleapis.com/youtube/v3";
app.get('/',async (req,res)=>{
    
    res.render('index',{videos:[]});
    
})
app.post('/search',async (req,res) => {
    const searchTerm=req.body.query;
console.log(searchTerm);
    const newurl = `${Url}/search?key=${API_KEY}&type=video&part=snippet&q=${searchTerm}&order=date`;
    const response = await axios.get(newurl);
    
    const videos = response.data.items;
    res.render('index',{videos:videos})
})

app.listen(3000,()=>{
    console.log('serving on port 3000')
})