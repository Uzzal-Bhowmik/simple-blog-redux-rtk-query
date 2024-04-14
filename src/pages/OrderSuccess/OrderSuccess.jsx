import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="mx-auto my-10 w-1/2 text-center">
      <img
        src="https://media.tenor.com/IErQHBRt6GIAAAAM/leonardo-dicaprio.gif"
        alt=""
        className="mb-10 block h-[60vh] w-full rounded-lg"
      />

      <Link to="/">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default OrderSuccess;
