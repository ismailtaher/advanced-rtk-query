import { useGetUsersQuery } from "./usersSlice";
import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";

import React from "react";

const UserPage = () => {
  const { userId } = useParams();
  const {
    user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error: userError,
  } = useGetUsersQuery("getUser", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading || isUserLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess || isUserSuccess) {
    const { ids, entities } = postsForUser;

    content = ids.map((id) => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ));
  } else if (isError || isUserError) {
    content = <p>{error || userError}</p>;
  }

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{content}</ol>
    </section>
  );
};

export default UserPage;
