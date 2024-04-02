import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authors: [],
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    getAuthors: (state, action) => {
      const blogs = action.payload;
      const authors = blogs?.map((blog) => ({ ...blog.author }));

      // remove duplicate object
      const ids = authors?.map((a) => a.authorId);
      const filtered = authors?.filter(
        ({ authorId }, index) => !ids.includes(authorId, index + 1),
      );
      state.authors = filtered;
    },
  },
});

// selectors
export const selectAllAuthors = (state) => state.authors.authors;

// actions
export const { getAuthors } = authorsSlice.actions;

export default authorsSlice.reducer;
