import { useState, useEffect } from 'react';

const Form = (props) => {
  const [open, setOpen] = useState(false);
  const editPost = {
    title: '',
    content: '',
    method: 'postContent',
  };
  const [post, setPost] = useState(editPost);
  const [db, setDB] = useState(props.db);

  useEffect(() => {
    if (props.edit) {
      setPost({ ...props.edit, method: 'putContent' });
      setOpen(true);
    }
  }, [props.edit]);
  useEffect(() => {
    setDB(props.db);
  }, [props.db]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   'form submitting this item : ',
    //   post.method,
    //   db,
    //   post
    // );

    props.submitContent(post.method, db, post);
    setPost({ title: '', content: '', method: 'postContent' });
    setOpen(false);
  };

  const handleInput = (input) => {
    // console.log( input.name,input.value)
    setPost((p) => {
      return { ...p, [input.name]: input.value };
    });
  };

  return (
    <div>
      <h2>{db}</h2>
      <button onClick={() => setOpen((prev) => !prev)}>
        Open/Close
      </button>

      {open && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Title :</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleInput(e.target)}
            value={post.title}
          />
          <br />
          <label htmlFor="content">Content :</label>
          <br />
          <textarea
            name="content"
            id="content"
            cols="70"
            rows="14"
            onChange={(e) => handleInput(e.target)}
            value={post.content}
          ></textarea>
          <br />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default Form;
