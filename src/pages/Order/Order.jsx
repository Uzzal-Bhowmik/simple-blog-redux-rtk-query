import { Button } from "@/components/ui/button";
import { selectAuth } from "@/src/redux/slices/authSlice";
import { clearCart, selectCart } from "@/src/redux/slices/cartSlice";
import { usePlaceOrderMutation } from "@/src/redux/slices/orderApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { user } = useSelector(selectAuth);
  const [placeOrder] = usePlaceOrderMutation();

  const handleOrder = async () => {
    if (user) {
      const orderObj = {
        name: user.displayName || "anonymous",
        email: user.email,
        products: cart,
        date: new Date(),
      };

      try {
        await placeOrder(orderObj).unwrap();

        navigate("/order-success", { replace: true });

        // clear the cart
        dispatch(clearCart());
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ol className="my-8 list-decimal">
        {cart?.length &&
          cart.map((item) => (
            <li key={item.id}>
              <h4>{item.title}</h4>
            </li>
          ))}
      </ol>

      <Button size="lg" onClick={handleOrder}>
        Confirm Order
      </Button>
    </div>
  );
};

export default Order;
