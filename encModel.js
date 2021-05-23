var mongoose = require('mongoose'); 
  
var noteSchema = new mongoose.Schema({ 
    encmsg: { type: String, required: true },
    encType:{ type: String, required: true },
    msg: { type: String, required: true },
    date: { type: String, required: true },

}); 
  
//Image is a model which has a schema imageSchema 
  
module.exports = new mongoose.model('Note', noteSchema); 
