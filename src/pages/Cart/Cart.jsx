import { selectAuth } from "@/src/redux/slices/authSlice";
import {
  useDeleteFromCartMutation,
  useFetchCartQuery,
  useUpdateCartMutation,
} from "@/src/redux/slices/cartApiSlice";
import { useSelector } from "react-redux";
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

const Cart = () => {
  const { user, token } = useSelector(selectAuth);
  const { data: cart } = useFetchCartQuery(
    { email: user?.email },
    { skip: !user?.email && !token },
  );

  const [updateCart] = useUpdateCartMutation();
  const [deleteFromCart] = useDeleteFromCartMutation();

  // update cart data
  const handleUpdateCart = async ({ method, item }) => {
    let updatedItem;

    switch (method) {
      case "increment":
        updatedItem = { ...item, quantity: item.quantity + 1 };
        break;
      case "decrement":
        if (item.quantity === 1) {
          toast.error("Can't reduce quantity anymore!");
          return;
        }
        updatedItem = {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
        break;

      default:
        break;
    }

    updateCart(updatedItem)
      .then(() => {
        //
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleDeleteItem = async (item) => {
    const confirmation = confirm("Are you sure to delete it?");
    if (confirmation) {
      deleteFromCart(item)
        .unwrap()
        .then((res) => {
          res && toast.success("Item Deleted");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div>
      <Table>
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
          {cart?.map((item) => (
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
                    handleUpdateCart({ method: "increment", item })
                  }
                />
                <Minus
                  className="h-5 w-5 cursor-pointer rounded-full border"
                  onClick={() =>
                    handleUpdateCart({ method: "decrement", item })
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteItem(item)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Cart;
