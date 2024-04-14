import axios from "axios";
import { apiSlice } from "../api/apiSlice";

const baseUrl = "http://localhost:5000";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      queryFn: async (email) => {
        const res = await axios.get(baseUrl + `/order?email=${email}`);

        const sortedRes = res.data?.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        return { data: sortedRes };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "Order", id: item.id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    placeOrder: builder.mutation({
      queryFn: async (orderObj) => {
        const res = await axios.post(baseUrl + "/order", orderObj);
        return { data: res.data };
      },
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    deleteOrder: builder.mutation({
      queryFn: async (orderObj) => {
        const res = await axios.delete(baseUrl + `/order/${orderObj.id}`);
        return { data: res.data };
      },

      onQueryStarted(orderObj, { dispatch, queryFulfilled }) {
        const deleteOrder = dispatch(
          apiSlice.util.updateQueryData(
            "getOrders",
            orderObj.email,
            (orders) => {
              const rest = orders.filter((order) => order.id !== orderObj.id);
              return rest;
            },
          ),
        );

        queryFulfilled.catch(deleteOrder.undo);
      },

      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useDeleteOrderMutation,
} = orderApiSlice;
