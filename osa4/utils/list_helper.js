const dummy = (blogs) => {
    return 1
  }
  const totalLikes = (blogs) => {
    var val = 0
    var sum = blogs.reduce((acc, blog) => acc + blog.likes, val)
    return sum
  }
  module.exports = {
    dummy,
    totalLikes
  }