import { getAuthors, selectAllAuthors } from "@/src/redux/slices/authorsSlice";
import { useFetchBlogsQuery } from "@/src/redux/slices/blogsApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthorCard from "./AuthorCard";

const Authors = () => {
  const dispatch = useDispatch();
  const { data: blogs } = useFetchBlogsQuery();
  const authors = useSelector(selectAllAuthors);

  // fetch authors data
  useEffect(() => {
    if (blogs) {
      dispatch(getAuthors(blogs));
    }
  }, [blogs, dispatch]);

  return (
    <div className="my-10 grid grid-cols-2 gap-x-5 gap-y-5">
      {authors?.map((author) => (
        <AuthorCard key={author.authorId} author={author} />
      ))}
    </div>
  );
};

export default Authors;
