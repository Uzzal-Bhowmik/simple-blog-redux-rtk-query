import { LoaderIcon, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "@/src/redux/slices/orderApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { selectAuth } from "@/src/redux/slices/authSlice";

const UserOrders = () => {
  const { user } = useSelector(selectAuth);
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery(
    user?.email,
    { skip: !user?.email },
  );

  const [deleteOrder] = useDeleteOrderMutation();

  const handleDeleteOrder = async (orderObj) => {
    const confirmation = confirm("Are you sure to delete this order?");

    if (confirmation) {
      try {
        await deleteOrder(orderObj).unwrap();

        toast.success("Item deleted");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {isOrdersLoading ? (
        <LoaderIcon className="mx-auto my-10 block h-6 w-6 animate-spin" />
      ) : (
        <>
          {orders?.length ? (
            <Table>
              <TableCaption>Your Orders List</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordered By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Products</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="w-[180px]">
                      <p className="font-medium">
                        {order.displayName || order.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      {format(parseISO(order.date), "d MMMM, yyyy")}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      {order.products.length}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteOrder(order)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <h1>
              No Order Found. <Link to="/">Shop here</Link>
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default UserOrders;
