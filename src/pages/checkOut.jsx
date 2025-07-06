import CheckOutItem from "@/components/checkoutItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/store";

function CheckOutPage() {
  const { cart } = useCartStore((state) => state);

  return (
    <div>
      <h1 className="text-2xl">Check Out Page</h1>
      <div className="grid lg:grid-cols-4 gap-5 m-3 p-3">
        <div className="lg:col-span-3">
          {cart.length > 0 ? (
            cart.map((item) => <CheckOutItem product={item} />)
          ) : (
            <h2 className="text-xl text-zinc-600">no products found</h2>
          )}
        </div>
        <div>
          <Card className="w-full flex flex-col p-3 gap-3">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total Price:</span>
                <span>
                  $
                  {cart
                    .reduce(
                      (total, item) =>
                        total +
                        item.price *
                          (item.quantity || 1) *
                          (1 - item.discountPercentage / 100),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <Button disabled={cart.length === 0} className="w-full">
              Proceed to Payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CheckOutPage;
