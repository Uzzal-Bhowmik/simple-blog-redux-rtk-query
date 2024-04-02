import { apiSlice } from "../api/apiSlice";

const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: () => "/blogs",
      transformResponse: (res) => {
        const sortedRes = res.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        return sortedRes;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Blogs", id: Number(id) })),
              { type: "Blogs", id: "LIST" },
            ]
          : [{ type: "Blogs", id: "LIST" }],
    }),
    fetchBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Blogs", id: Number(arg) },
      ],
    }),

    addBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),

    addReaction: builder.mutation({
      query: (updatedBlog) => ({
        url: `/blogs/${updatedBlog.id}`,
        method: "PUT",
        body: updatedBlog,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Blogs", id: Number(arg.id) },
      ],

      async onQueryStarted(updatedBlog, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "fetchBlogById",
            updatedBlog.id,
            (draft) => {
              draft.reactions = updatedBlog.reactions;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
    }),

    editBlog: builder.mutation({
      query: (updatedBlog) => ({
        url: `/blogs/${updatedBlog.id}`,
        method: "PUT",
        body: updatedBlog,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Blogs", id: Number(arg.id) },
      ],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Blogs", id: Number(arg) },
      ],
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useAddReactionMutation,
  useAddBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogsApiSlice;
