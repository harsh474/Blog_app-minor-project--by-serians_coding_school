const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const CommentSchema = new Schema({ 
    content: String,    
    user:{ 
        type:Schema.Types.ObjectId, 
        ref:"user"
    }
})
module.exports = mongoose.model("comment", CommentSchema); 
