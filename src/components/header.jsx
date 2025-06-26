import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="p-5 bg-gray-200 flex items-center justify-between">
      <Link to={"/home"} className="flex flex-row gap-2 text-3xl font-semibold">
        <span>
          <ShoppingCart size={35} />
        </span>
        eg-store
      </Link>
      <nav>
        <Button variant={"ghost"}>home</Button>
        <Button variant={"ghost"}>about us</Button>
      </nav>
    </header>
  );
}

export default Header;
