import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  blogs: [],
  blog: {},
  categories: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,

  reducers: {
    getCategories: (state) => {
      if (state.blogs) {
        const blogs = state.blogs;
        const categories = new Set(blogs.map((blog) => blog.category));
        state.categories = Array.from(categories);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.fetchBlogs.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        state.blogs = action.payload;
      },
    );
  },
});

// selectors
export const selectAllBlogs = (state) => state.blogs.blogs;
export const selectBlogCategories = (state) => state.blogs.categories;

// actions
export const { getCategories } = blogsSlice.actions;

export default blogsSlice.reducer;
