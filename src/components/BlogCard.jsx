import { format, parseISO } from "date-fns";
import styles from "./BlogCard.module.css";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import Reactions from "./Reactions";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useDeleteBlogMutation } from "../redux/slices/blogsApiSlice";
import Swal from "sweetalert2";

const BlogCard = ({ blog, smallerVersion }) => {
  const {
    id,
    title,
    body,
    author,
    date,
    reactions,
    thumbnail,
    featured,
    category,
  } = blog;
  const navigate = useNavigate();

  // delete blog
  const [deleteBlog] = useDeleteBlogMutation();
  const handleDeleteBlog = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id)
          .then((res) => {
            if (res.data) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              navigate("/");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  return (
    <div>
      <Link to={`/blog/${id}`}>
        <img
          src={thumbnail}
          alt={title}
          className="mx-auto block h-[500px] w-full"
        />
      </Link>

      {blog?.id && (
        <div className="mx-auto w-3/4">
          <div className="mb-6 mt-8 flex items-center justify-center gap-x-6">
            {featured && (
              <Badge className="h-10 rounded-none px-4 text-center font-bold">
                FEATURED
              </Badge>
            )}
            <h4 className="border-b-2 border-b-slate-500 text-center text-base font-medium uppercase">
              {category}
            </h4>
          </div>

          {/* card heading */}
          <div className="mb-6 space-y-6 text-center">
            <h1 className="text-balance text-5xl uppercase transition-colors ease-linear hover:text-slate-500">
              <Link to={`/blog/${id}`}>
                {!smallerVersion
                  ? title
                  : title?.split(" ")?.length < 5
                    ? title
                    : title?.split(" ").slice(0, 5).join(" ") + "..."}
              </Link>
            </h1>
            <p className="text-lg text-muted-foreground">
              Posted on {date && format(parseISO(date), "MMMM d, yyyy")}
              <span>
                {" "}
                by{" "}
                <Link
                  className="text-slate-900 hover:underline"
                  to={`/author/${author?.authorId}`}
                >
                  {author?.authorName}
                </Link>
              </span>
            </p>
          </div>

          {/* card body */}
          <div className="text-justify">
            <p className="text-justify text-lg">
              {smallerVersion ? (
                <span className={styles.customTextEclipse}>
                  {body?.split(" ").slice(0, 50).join(" ")}
                </span>
              ) : (
                body?.repeat(5)
              )}
            </p>
          </div>

          {/* card footer */}
          <div className="mt-10 flex items-center justify-between">
            <div>{reactions && <Reactions blog={blog} />}</div>
            <div className="flex items-center gap-3">
              <Link to={`/edit-blog/${id}`}>
                <Button>
                  <Edit className="mr-2 h-4 w-4" /> Edit Blog
                </Button>
              </Link>

              <Button variant="destructive" onClick={handleDeleteBlog}>
                <Trash className="mr-2 h-4 w-4" /> Delete Blog
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
