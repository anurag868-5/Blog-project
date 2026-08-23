import { useState } from "react";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs",
        {
          title,
          content,
          author,
        }
      );

      alert(response.data.message);

      setTitle("");
      setContent("");
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to create blog"
      );
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          />
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          cols="40"
        />

        <br />
        <br />

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;