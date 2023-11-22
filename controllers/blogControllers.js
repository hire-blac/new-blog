const {Blog} = require("../models/Blog");

// all blogs
module.exports.allBlogs = (req, res) => {
  // get all blogs
  Blog.find().populate('author')
  .then(blogs => {
    res.render('all-blogs', {"blogs": blogs})
  })
  .catch(err=>{
    console.log(err.message);
    res.send(err.message)
  })
}

// new blog page
module.exports.newBlogPage = (req, res)=>{
  res.render('new-blog')
}

// add new blog
module.exports.addNewBlog = (req, res)=>{

  let blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    author: req.user
  })

  blog.save()
  .then((newblog)=>{
    res.redirect('/blogs')
  })
  .catch( err =>{
    console.log(err);
  })
}

// get single blog
module.exports.singleBlog = (req, res)=>{
  const id = req.params.id
  // find blog with id = id
  Blog.findById(id).populate('author')
  .then(blog => {
    res.render("blog", {"blog": blog})
  })
  .catch(err => {
    console.log(err.message);
  })
}