import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import RatingStars from "./ratingStars";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useCartStore } from "@/store";

function ProductPage() {
  const { productId } = useParams();
  const { addToCart, removeFromCart, cart } = useCartStore((state) => state);

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axios(
        `https://dummyjson.com/products/${productId}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error: {error.message}
      </div>
    );
  }

  const discountedPrice = (
    data.price -
    (data.price * data.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:p-20 p-7 lg:p-0 gap-20">
      {/* Image Carousel Section */}
      <div className="">
        <Carousel>
          <CarouselContent>
            {data.images.map((image, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center ">
                    <img src={image} />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
      {/* info section including reviews */}
      <div className="flex flex-col gap-3 items-start">
        <Button variant="link" cursor="pointer">
          {data.category}
          <ChevronRight />
        </Button>
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-xl ">
          {data.description}
        </p>
        <div className="flex items-center gap-4">
          <RatingStars rating={data.rating} />
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">${discountedPrice}</h2>
          <p className="text-zinc-600 dark:text-zinc-200 text-lg line-through">
            ${data.price}
          </p>
        </div>
        {/* Reviews Section */}
        <div className="mt-8 w-full">
          <h3 className="text-xl font-semibold mb-4">
            Reviews ({data.reviews.length})
          </h3>
          <div className="flex flex-col gap-4">
            {data.reviews && data.reviews.length > 0 ? (
              data.reviews.map((review, idx) => (
                <Card key={idx} className="w-full p-4 gap-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-4 ">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                            review.reviewerName
                          )}`}
                        />
                        <AvatarFallback>
                          {review.reviewerName?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.reviewerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="mt-2 ml-2 text-zinc-700 dark:text-zinc-200">
                    {review.comment}
                  </p>
                </Card>
              ))
            ) : (
              <p className="text-zinc-500 dark:text-zinc-200">
                No reviews yet.
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Checkout Section */}
      <div className="md:col-span-2 xl:col-span-1">
        <Card className="p-6">
          <CardTitle className="text-2xl">Checkout</CardTitle>
          <CardDescription>
            this is the checkout section where you can add the product to your
            cart and proceed with the purchase.
          </CardDescription>
          <CardContent>
            <div>
              <h2 className="text-lg">
                Warrantly : {data.warrantyInformation}
              </h2>
              <h2 className="text-lg">Shipping : {data.shippingInformation}</h2>
              <h2 className="text-lg">
                Availability : {data.availabilityStatus}
              </h2>
              <h2 className="text-lg">Return policy : {data.returnPolicy}</h2>
            </div>
            {data.stock < 5 && (
              <div className="text-red-500 mt-4">
                Only {data.stock} items left in stock!
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="w-full flex items-center gap-2">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                min={data.minimumOrderQuantity || 1}
                defaultValue={data.minimumOrderQuantity || 1}
                className="border rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => {
                  if (e.target.value < data.minimumOrderQuantity) {
                    e.target.value = data.minimumOrderQuantity;
                  }
                }}
              />
              <span className="text-sm text-zinc-500">
                (Min: {data.minimumOrderQuantity || 1})
              </span>
            </div>
            {cart.length > 0 && cart.find((item) => item.id === data.id) ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(data.id);
                }}
                className="mt-1.5 w-full bg-rose-800 hover:bg-rose-700 transition"
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(data);
                }}
                className="mt-1.5 w-full"
              >
                Add to Cart
              </Button>
            )}

            <Button variant="outline" className="w-full">
              Buy
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ProductPage;
