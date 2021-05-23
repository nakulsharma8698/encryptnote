const express = require('express')
var mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const cors = require('cors');
const port = process.env.PORT || 4000;
const bcrypt = require('bcrypt');
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://nakul_db:Main2016@cluster0.lqqs7.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
mongoose.set('useCreateIndex', true);
connection.once('open', function() {
    console.log("Encrypted Notes Connected");
})
var noteModel = require('./encModel');

var encryptNote=require('./piglatin');
app.get('/', function(req,res){
    noteModel.find({}, (err, items) => { 
      if (err) { 
          console.log(err); 
      } 
      else
      {
          res.json(items);
      }
  
      console.log(items); 
  }); 
  });
app.put('/update/:id', async function(req,res) {
    console.log(req.body);
    var msg=req.body.msg;
    msg=msg.toLowerCase();
    var date=Date(Date.now()).split(' ');
    var time= date[1]+","+date[2]+" "+date[4].slice(0,5);
    var enctType=req.body.enctType;
    if(enctType==="Don't Encrypt")
        enctType="Not Encrypted"
    
    switch(enctType)
    {
        case 'Pig-Latin': encMsg=encryptNote.pigLatin(msg);
                            break;
        case 'Emoj-Encrypt': encMsg=encryptNote.emoji(msg);
                            break;
        case 'Word-Scramble': encMsg=encryptNote.scramble(msg);
                            break;
        case 'Bcrypt':  encMsg=await bcrypt.hash(msg,5 );
                            break;
                    default: encMsg=msg;
                            break;

    }
    var obj={
        msg: msg,
        encmsg:encMsg,
       encType:enctType,
       date:time
     };
    noteModel.updateOne({_id:req.params.id},obj, function(ress, err){
        if(err)
            return res.json(err);
        else
            return res.json({message:"Note Updated"})
    });
})
app.post('/', async function(req, res) {
    console.log(req.body);
    var msg=req.body.msg;
    msg=msg.toLowerCase();
    var date=Date(Date.now()).split(' ');
    var time= date[1]+","+date[2]+" "+date[4].slice(0,5);
    console.log(time);
    var enctType=req.body.enctType;
    if(!msg)
    {
        return res.json({message: "Please enter Note to encrypt"});
    }
    var encMsg;
    switch(enctType)
    {
        case 'Pig-Latin': encMsg=encryptNote.pigLatin(msg);
                            break;
        case 'Emoj-Encrypt': encMsg=encryptNote.emoji(msg);
                            break;
        case 'Word-Scramble': encMsg=encryptNote.scramble(msg);
                            break;
        case 'Bcrypt':  encMsg=await bcrypt.hash(msg,5 );
                            break;
                    default: encMsg=msg;
                            break;

    }
    var obj={
        msg: msg,
        encmsg:encMsg,
       encType:enctType,
       date:time
     };
    console.log(obj);
     noteModel.create(obj, (err, item) => { 
        if (err) { 
            res.json(err); 
        } 
        else { 
           res.json({message:'Registered Successfully'});
        } 
    });
     });

app.delete('/delete/:id', function(req, res, next) {
        var myquery = { _id:  req.params.id};
        noteModel.deleteOne(myquery,  function (err, post) {
          if (err) throw err;
          else
           res.json({message: 'Selected Note Deleted'})
        });
      });


      if(process.env.NODE_ENV==='production'){
      app.use(express.static(path.resolve(__dirname, 'encryptNote','build')))
      app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, 'encryptNote', 'build', 'index.html'))
      });
    }
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
