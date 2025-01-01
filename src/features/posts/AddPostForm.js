import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const { data: users, isSuccess } = useGetUsersQuery("getUsers");

  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  let usersOptions;
  if (isSuccess) {
    usersOptions = users.ids.map((id) => (
      <option key={id} value={id}>
        {users.entities[id].name}
      </option>
    ));
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}></textarea>
      </form>
      <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
        Save Post
      </button>
    </section>
  );
};

export default AddPostForm;
