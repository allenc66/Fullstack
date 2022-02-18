const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]
//console.log(password)

const url = `mongodb+srv://fullstack:${password}@cluster0.qwll6.mongodb.net/bloglist?retryWrites=true&w=majority`

mongoose.connect(url)



const blogSchema = new mongoose.Schema({
  title: {type:String,
    required: true},
  author:{type:String,
    required: true},
  url: {type:String,
    required: true},
  likes: {type:Number,
    required: true},
})
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog ({
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7
})
blog.save().then(result => {
  console.log('you did it!')
  mongoose.connection.close()
})