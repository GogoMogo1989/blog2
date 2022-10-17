import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const history = useHistory()
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch('/blog', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log("added new blog!")
    })
    history.push("/")
  }

  const Back = () => {
    history.push("/")
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        >
        </textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="David">David</option>
          <option value="Mephisto">Mephisto the Cat</option>
        </select>
        <button>Add Blog</button>
      </form>
      <button onClick={Back}>Back</button>
    </div>
  );
}
 
export default Create;