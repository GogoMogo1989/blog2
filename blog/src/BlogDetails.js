import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";


const BlogDetails = () => {

  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('/blog/' + id);
  let history = useHistory()


  const handleClick = () => {
    fetch('/blog/' + blog._id, {
      method: 'DELETE'
    }).then(() => {
      console.log("blog deleted")
    }) 
    history.push("/")
  }

  const Back= () => {
    history.push("/")
  }


  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <button onClick={Back}>Back</button>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;