import { format, parseISO } from "date-fns";
import styles from "./BlogCard.module.css";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import Reactions from "./Reactions";
import { Button } from "@/components/ui/button";
import { Edit, ShoppingBag, Trash } from "lucide-react";
import { useDeleteBlogMutation } from "../redux/slices/blogsApiSlice";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/authSlice";
import {
  useAddToCartMutation,
  useFetchCartQuery,
} from "../redux/slices/cartApiSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

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

  const { user } = useSelector(selectAuth);

  const [addToCart] = useAddToCartMutation();

  // check if item exists in cart
  const [existInCart, setExistInCart] = useState(null);
  const { data: cart } = useFetchCartQuery(
    { email: user?.email },
    { skip: !user?.email },
  );

  useEffect(() => {
    if (cart) {
      const found = cart.find((item) => item.blogId === blog.id);
      setExistInCart(found);
    }
  }, [cart, blog]);

  console.log(existInCart);

  // delete blog
  const [deleteBlog] = useDeleteBlogMutation();
  const handleDeleteBlog = () => {
    !user?.uid
      ? navigate("/login")
      : Swal.fire({
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

  // add to cart
  const handleAddToCart = () => {
    const cartItem = {
      blogId: blog.id,
      title: blog.title,
      author: blog.author.authorName,
      thumb: blog.thumbnail,
      date: blog.date,
      email: user?.email,
    };

    addToCart(cartItem)
      .then((res) => {
        if (res.data) {
          toast.success("Cart Updated");
        }
      })
      .catch((err) => {
        console.error(err);
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
          {user?.uid && (
            <div className="mt-10 flex items-center justify-between">
              <div>{reactions && <Reactions blog={blog} />}</div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={existInCart?.id}
                >
                  <ShoppingBag className="h-4 w-4" />
                </Button>

                <Link to={`/edit-blog/${id}`}>
                  <Button>
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>

                <Button variant="destructive" onClick={handleDeleteBlog}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
