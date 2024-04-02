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
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {
  useEditBlogMutation,
  useFetchBlogByIdQuery,
} from "@/src/redux/slices/blogsApiSlice";
import {
  getCategories,
  selectAllBlogs,
  selectBlogCategories,
} from "@/src/redux/slices/blogsSlice";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: blog, isLoading } = useFetchBlogByIdQuery(id);
  const blogs = useSelector(selectAllBlogs);
  const categories = useSelector(selectBlogCategories);
  const [editBlog] = useEditBlogMutation();

  // get categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, blogs]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const body = form.body.value;
    const category = form.category.value;
    const thumbnail = form.thumbnail.value;
    const featured = form.featured.value;

    const updatedBlog = {
      ...blog,
      title,
      body,
      category,
      thumbnail,
      date: new Date().toISOString(),
      featured: Boolean(Number(featured)),
    };

    editBlog(updatedBlog)
      .then((res) => {
        if (res.data) {
          navigate(`/blog/${id}`);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="mx-auto my-10 w-1/2">
      <h1 className="mb-8">Edit Blog</h1>
      {!isLoading && blog?.id && (
        <form
          className="space-y-6 rounded-lg border p-6 shadow"
          onSubmit={handleEditSubmit}
        >
          <Input type="text" name="title" defaultValue={blog.title} />
          <Textarea defaultValue={blog.body} name="body" />
          <Input type="text" name="thumbnail" defaultValue={blog.thumbnail} />
          <Select name="category" defaultValue={blog.category}>
            <SelectTrigger>
              <SelectValue defaultValue={blog.category} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories?.map((c) => (
                  <SelectItem value={c} key={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select name="featured" defaultValue={blog.featured ? "1" : "0"}>
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

          <Button className="bg-green-500 text-white">Submit</Button>
        </form>
      )}
    </div>
  );
};

export default EditBlog;
