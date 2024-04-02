import { getAuthors, selectAllAuthors } from "@/src/redux/slices/authorsSlice";
import {
  useAddBlogMutation,
  useFetchBlogsQuery,
} from "@/src/redux/slices/blogsApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  getCategories,
  selectBlogCategories,
} from "@/src/redux/slices/blogsSlice";

const AddBlog = () => {
  const { data: blogs } = useFetchBlogsQuery();
  const authors = useSelector(selectAllAuthors);
  const categories = useSelector(selectBlogCategories);
  const [addBlog] = useAddBlogMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthors(blogs));
    dispatch(getCategories());
  }, [blogs, dispatch]);

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const body = form.body.value;
    const category = form.category.value;
    const thumbnail = form.thumbnail.value;
    const featured = form.featured.value;
    const authorName = form.authorName.value;
    const authorPic = form.authorPic.value;

    const newBlog = {
      author: {
        authorId: authors?.length + 1 + "",
        authorName,
        authorPic,
      },
      id: blogs?.length + 1 + "",
      title,
      body,
      category,
      thumbnail,
      date: new Date().toISOString(),
      featured: Boolean(Number(featured)),
      reactions: {
        like: 0,
        love: 0,
        fire: 0,
        sad: 0,
        angry: 0,
      },
    };

    addBlog(newBlog)
      .then((res) => {
        if (res.data) {
          navigate(`/blog/${res.data.id}`);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="mx-auto my-10 w-1/2">
      <h1 className="mb-7">Add New Blog</h1>
      <form
        onSubmit={handleAddBlog}
        className="space-y-6 rounded-lg border p-6 shadow"
      >
        <Input type="text" name="title" placeholder="Blog title" />
        <Textarea placeholder="Blog description" name="body" />
        <Input type="text" name="thumbnail" placeholder="Blog thumbnail url" />
        <Select name="category">
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Array.from(categories)?.map((c) => (
                <SelectItem value={c} key={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select name="featured">
          <SelectTrigger>
            <SelectValue placeholder="Will it be featured?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"1"}>True</SelectItem>
              <SelectItem value={"0"}>False</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input type="text" name="authorName" placeholder="Author name" />
        <Input type="text" name="authorPic" placeholder="Author image url" />

        <Button className="bg-green-500 text-white">Submit</Button>
      </form>
    </div>
  );
};

export default AddBlog;
