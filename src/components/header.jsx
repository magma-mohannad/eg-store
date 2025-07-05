import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCartStore } from "@/store";

function Header() {
  const cart = useCartStore((state) => state.cart);
  let cartCount = cart.length;

  return (
    <header className="p-5 bg-gray-200 flex items-center justify-between">
      <Link to={"/"} className="flex flex-row gap-2 text-3xl font-semibold">
        <span>
          <ShoppingCart size={35} />
        </span>
        eg-store
      </Link>
      <nav>
        <Button asChild variant="ghost" size="icon">
          <Link to={"/checkout"}>
            <ShoppingCart className="size-7" />
            {cartCount > 0 && (
              <Badge
                className="absolute top-1.5 right-1 px-1.5 py-0.5 rounded-full text-xs font-bold"
                variant="destructive"
              >
                {cartCount}
              </Badge>
            )}
          </Link>
        </Button>
      </nav>
    </header>
  );
}

export default Header;
