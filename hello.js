const express=require('express');
const app=express();
const path = require('path');
const fs=require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    });   
});
app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render('show', { f:req.params.filename, fd: filedata});   
    })
});
app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename:req.params.filename});
});
app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
    });  
});
app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.prev}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    });
});
const PORT = process.env.PORT || 3000; // Use the PORT variable or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
