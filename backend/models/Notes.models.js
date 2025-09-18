const mongooes=require('mongoose');
const NotesSchema=new mongooes.Schema({
    user:{
        type:mongooes.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:100
    },
    description:{
        type:String,
        required:true,
        trime:true,
    }
},{timestamps:true});
module.exports=mongooes.model('Notes',NotesSchema);