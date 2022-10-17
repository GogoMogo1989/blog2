const BlogList = ({ blogs }) => {
    return (
      <div className="blog-list">
        {blogs.map(blog => (
          <div className="blog-preview" key={blog._id} >
            <a href={`/blogs/${blog._id}`}>
              <h2>{ blog.title }</h2>
              <p>Written by { blog.author }</p>
            </a>
          </div>
        ))}
      </div>
    );
  }
   
  export default BlogList;