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

    updateCart: builder.mutation({
      query: (body) => ({
        url: `/cart/${body.id}`,
        method: "PUT",
        body: body,
      }),
      async onQueryStarted(updatedItem, { dispatch, queryFulfilled }) {
        const updateCart = dispatch(
          apiSlice.util.updateQueryData(
            "fetchCart",
            { email: updatedItem.email },
            (cart) => {
              const findItem = cart.find((item) => item.id == updatedItem.id);
              findItem.quantity = updatedItem.quantity;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          updateCart.undo();
        }
      },

      invalidatesTags: (result, error, arg) => [{ type: "Cart", id: arg.id }],
    }),

    deleteFromCart: builder.mutation({
      query: (item) => ({
        url: `/cart/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
      async onQueryStarted(item, { dispatch, queryFulfilled }) {
        const deleteItem = dispatch(
          apiSlice.util.updateQueryData(
            "fetchCart",
            { email: item.email },
            (cart) => {
              const filterCart = cart.filter(
                (cartItem) => cartItem.id != item.id,
              );
              return filterCart;
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          deleteItem.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddToCartMutation,
  useFetchItemByIdQuery,
  useUpdateCartMutation,
  useDeleteFromCartMutation,
} = cartApiSlice;
