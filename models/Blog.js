const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true
  }
})

// blog model
const Blog = mongoose.model('blog', blogSchema)

// like schema
const likeSchema = new Schema({
  blog: {
    type: Schema.ObjectId,
    ref: Blog,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: User,
    required: true
  }
}, {timestamps: true})

// like model
const Like = mongoose.model('like', likeSchema)

// export models
module.exports = {Blog, Like}