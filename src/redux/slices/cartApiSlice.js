import { apiSlice } from "../api/apiSlice";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCart: builder.query({
      query: (arg) => `/cart?email=${arg.email}`,
      providesTags: (result) =>
        result
          ? [
              { type: "Cart", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Cart", id })),
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useFetchItemByIdQuery,
} = cartApiSlice;
