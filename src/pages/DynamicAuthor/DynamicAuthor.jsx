import { getAuthors, selectAllAuthors } from "@/src/redux/slices/authorsSlice";
import { useFetchBlogsQuery } from "@/src/redux/slices/blogsApiSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DynamicAuthor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: blogs } = useFetchBlogsQuery();
  const authors = useSelector(selectAllAuthors);
  const [author, setAuthor] = useState({});
  const [blogsByAuthor, setBlogsByAuthor] = useState([]);

  // get all authors
  useEffect(() => {
    if (blogs) {
      dispatch(getAuthors(blogs));
    }
  }, [blogs, dispatch]);

  // set author
  useEffect(() => {
    const author = authors?.find((a) => Number(a.authorId) === Number(id));
    if (author?.authorId) {
      const blogsByAuthor = blogs?.filter(
        (blog) => Number(blog.author.authorId) === Number(author.authorId),
      );

      setBlogsByAuthor(blogsByAuthor);
      setAuthor(author);
    }
  }, [authors, id, blogs]);

  return (
    <div className="my-10">
      <h1 className="mb-6 underline">{author?.authorName}</h1>
      {blogsByAuthor && (
        <ol className="ml-10 list-decimal space-y-3">
          {blogsByAuthor?.map((blog) => (
            <li key={blog.id} className="text-3xl font-semibold text-slate-700">
              <Link className="hover:text-slate-500" to={`/blog/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default DynamicAuthor;
