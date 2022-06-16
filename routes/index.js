const { text } = require('body-parser');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/process',function(req,res,next){
  var my1 = req.body.txt1;
  console.log(my1);
  req.session.mysess = my1
  console.log('session value is'+req.session.mysess)
  res.redirect('/home')
})

router.get('/home', function(req, res, next) {
if(req.session.mysess){
  var username = req.session.mysess;
  res.render('home',{ myvalue: username})
}
else{
  res.redirect('/login');
}
});
router.get('/logout',function(req,res,next){
  req.session.destroy(function(err){
    res.redirect('/login')
  })
})
router.get('/form',function(req,res,next){
  res.render('form');
})
router.post('/formprocess',function(req,res,next){
var fileobj = req.files.f1
var filename = req.files.f1.name
var filesize = req.files.f1.size
var mimtype = req.files.f1.mimetype;
// text file ke liye -> 'text/plain'
// video file ke liye -> 'video/mp4'
// images ke liye -> 'image/png,jpeg'

if(filesize < 1024*300  && mimtype == 'text/plain'){
  fileobj.mv('public/'+filename , function(err){
    if(err)
    return res.status(500).send(err);
    res.send('file uploded')
     })
}
else{
  res.send('plz choose file text file and 30kb less then');
}
})
router.get('/form2',function(req,res,next){
res.render('form2')

})

router.post('/formprocess1',function(req,res,next){
var fileobj = req.files.f1
var filename = req.files.f1.name
var filepath = req.files.f1.tempFilePath

fileobj.mv('public/'+filename,function(err){
if(err)
return res.status(500),send(err)
res.send("file path this"+filepath)

}) 
})


module.exports = router;
