import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  deleteItemFromCart,
  selectCart,
  updateQuantity,
} from "@/src/redux/slices/cartSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  // update cart data
  const handleUpdateQuantity = ({ id, method }) => {
    const findItem = cart?.find((item) => item.id === id);

    if (method === "-" && findItem.quantity === 1) {
      toast.error("Item quantity can't be less than 1");
      return;
    } else {
      dispatch(updateQuantity({ id, method }));
      toast.success("Cart updated");
    }
  };

  // handle Delete Item From Cart
  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from cart!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItemFromCart(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="my-10 flex items-start justify-between gap-10">
      <Table className="flex-grow">
        <TableCaption>Your Cart Items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart?.length ? (
            cart?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-[180px]">
                  <p
                    className="w-[180px] truncate font-medium"
                    title={item.title}
                  >
                    {item.title}
                  </p>
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>
                  {format(parseISO(item.date), "d MMMM, yyyy")}
                </TableCell>
                <TableCell className="flex gap-2">
                  {item.quantity}
                  <Plus
                    className="h-5 w-5 cursor-pointer rounded-full border"
                    onClick={() =>
                      handleUpdateQuantity({ method: "+", id: item.id })
                    }
                  />
                  <Minus
                    className="h-5 w-5 cursor-pointer rounded-full border"
                    onClick={() =>
                      handleUpdateQuantity({ method: "-", id: item.id })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No cart item found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="w-[40%] rounded-xl border-2 bg-slate-700 p-8">
        <div className="mb-5 grid grid-cols-2 gap-y-6 text-white">
          <div>Total Products</div>
          <div className="ml-auto">{cart?.length}</div>
        </div>

        <Link to="/order">
          <Button variant="outline">Place Order</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
