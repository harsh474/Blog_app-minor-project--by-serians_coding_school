const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const postSchema = new Schema({ 
    title: String, 
    content: String,    
    user :{ 
        type:Schema.Types.ObjectId, 
        ref:"user"
    },
    like:[{ 
       type:Schema.Types.ObjectId, 
       ref:"user"
    }]
})
module.exports = mongoose.model("post", postSchema); 
