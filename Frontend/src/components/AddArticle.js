import React, { useState, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const { addArticle } = useContext(GlobalContext);
  const history = useHistory();
  var user = JSON.parse(localStorage.getItem('user'));
  const onSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: uuid(),
      title,
      body,
      author : user.username
    }
    addArticle(newArticle);
    console.log(newArticle)
    history.push("/user");
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeBody = (e) => {
    setBody(e.target.value);
  }
  const onChangeAuthor = (e) => {
    setAuthor(e.target.value);
  }

  return (
    <Form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="title">Title</label>
      <Input
        type="text"
        className="form-control"
        name="title"
        value={title}
        onChange={onChangeTitle}
        placeholder="Enter Title"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="body">Body</label>
      <Input
        type="text"
        className="form-control"
        name="body"
        value={body}
        onChange={onChangeBody}
        placeholder="Enter Body"
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="author">Author</label>
      <Input
        type="text"
        className="form-control"
        name="author"
        value={user.username}
        onChange={onChangeAuthor}
        placeholder="Enter Author"
        required
      />
    </div>
    <button className="btn btn-success m-2" type="submit">Submit</button>
    </Form>
  )
}
