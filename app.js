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
app.get('/search',async (req,res) => {
    const searchTerm=req.body.query;
   const newurl = `${Url}/search?key=${API_KEY}&type=video&part=snippet&q=${searchTerm}&order=date&maxResults=50`;
    const response = await axios.get(newurl);
    
    const videos = response.data.items;
     const newdata=[]
     videos.forEach(video => {
            newdata.push(video.snippet)
     })
    
        const page = parseInt(req.query.page)
        const limit =parseInt( req.query.limit)
      
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
    
        const results = {}
    
        if (endIndex < 50) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }
        
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }
        results.results=newdata.slice(startIndex,endIndex)
    res.send(results)

})
app.post('/search',async (req,res) => {
    const searchTerm=req.body.query;
   const newurl = `${Url}/search?key=${API_KEY}&type=video&part=snippet&q=${searchTerm}&order=date&maxResults=50`;
    const response = await axios.get(newurl);
    
    const videos = response.data.items;
    res.render('index',{videos:videos})
})

app.listen(3000,()=>{
    console.log('serving on port 3000')
})