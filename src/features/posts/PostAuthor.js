import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";
import { selectUserById } from "../users/usersSlice";
import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  /* const { user: author } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
    }),
  }); */

  const author = useSelector((state) => selectUserById(state, userId));

  return (
    <span>
      by{" "}
      {author ? (
        <Link to={`/user/${userId}`}>{author.name}</Link>
      ) : (
        "Unknown author"
      )}
    </span>
  );
};
export default PostAuthor;
