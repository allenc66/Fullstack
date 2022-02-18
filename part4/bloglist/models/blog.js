const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {type:String,
    required: true},
  author:{type:String,
    required: true},
  url: {type:String,
    required: true},
  likes: {type:Number,
    default: 0},
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)
    
module.exports = {Blog}