import { useNavigate, useParams } from "react-router-dom";
import "./DynamicBlog.css";
import { useFetchBlogByIdQuery } from "@/src/redux/slices/blogsApiSlice";
import BlogCard from "@/src/components/BlogCard";
import { ArrowLeftCircle, LoaderIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const DynamicBlog = () => {
  const { id } = useParams();

  const { data: blog, isLoading, isError, error } = useFetchBlogByIdQuery(id);

  const navigate = useNavigate();

  return (
    <div className="my-10">
      {isLoading && (
        <LoaderIcon className="mx-auto block h-10 w-10 animate-spin" />
      )}
      {isError && <h1 className="text-destructive">{error.message}</h1>}

      {/* blog details */}
      <button
        className="mb-5 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle color="gray" />
        <p className="text-lg text-muted-foreground">back</p>
      </button>

      {blog && <BlogCard blog={blog} smallerVersion={false} />}

      {/* author details */}
      <div className="mt-20">
        <h1 className="mb-6 text-2xl uppercase">
          PUBLISHED BY {blog?.author?.authorName}
        </h1>

        <Link
          to={`/author/${blog?.author?.authorId}`}
          className="text-decoration-none flex items-center gap-4"
        >
          <Avatar className="h-20 w-20">
            <AvatarFallback className="uppercase">
              {blog?.author?.authorName.slice(0, 2)}
            </AvatarFallback>
            <AvatarImage src={blog?.author?.authorPic} />
          </Avatar>
          <p className="text-xl font-medium">{blog?.author?.authorName}</p>
        </Link>
      </div>
    </div>
  );
};

export default DynamicBlog;
