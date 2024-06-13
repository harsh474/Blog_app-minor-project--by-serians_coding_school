const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;

const postSchema = new Schema({ 
    title: String, 
    content: String,    
    author :{ 
        type:Schema.Types.ObjectId, 
        ref:"user"
    },
    like:[{ 
       type:Schema.Types.ObjectId, 
       ref:"user"
    }], 
    Comments:[{ 
        type:Schema.Types.ObjectId, 
        ref:"comment"
    }]
})
module.exports = mongoose.model("post", postSchema); 
