import { useFetchBlogsQuery } from "@/src/redux/slices/blogsApiSlice";
import Hero from "./Hero";
import { LoaderIcon } from "lucide-react";
import BlogCard from "@/src/components/BlogCard";
import { useFetchWishlistQuery } from "@/src/redux/slices/cartApiSlice";
import { useSelector } from "react-redux";
import { selectAuth } from "@/src/redux/slices/authSlice";

const Home = () => {
  const { data: blogs, isLoading, isError, error } = useFetchBlogsQuery();

  // fetch wishlist
  const { user, token } = useSelector(selectAuth);

  const { data: wishlist } = useFetchWishlistQuery(undefined, {
    skip: !user?.email && !token,
  });

  console.log(wishlist);

  return (
    <div className="my-10">
      <Hero />

      {/* Home page blogs */}
      <section className="space-y-20">
        {isError && <p>{error.message}</p>}

        {isLoading && (
          <div>
            <LoaderIcon className="mx-auto h-12 w-12 animate-spin" />
          </div>
        )}

        {blogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} smallerVersion={true} />
        ))}
      </section>
    </div>
  );
};

export default Home;
