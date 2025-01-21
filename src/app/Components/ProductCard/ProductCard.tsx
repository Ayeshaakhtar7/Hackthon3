import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

interface ProductCardProps {
  image: string | StaticImageData;
  name: string;
  price: string;
  discountedPrice: string;
  discount: string;
  rating: number;
  reviews: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  discountedPrice,
  discount,
  rating,
  reviews,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          quality={75}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {name}
        </h2>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-gray-500 line-through text-sm">
            {price}
          </span>
          <span className="text-green-500 font-bold text-lg">
            {discountedPrice}
          </span>
        </div>
        <p className="text-red-500 text-sm mt-1">
          {discount}
        </p>
        <div className="flex items-center mt-3">
          <div className="flex">
            {Array.from({ length: Math.floor(rating) }, (_, index) => (
              <span key={`star-${index}`} className="text-yellow-400 text-sm mr-1">
                ★
              </span>
            ))}
            {rating % 1 >= 0.5 && (
              <span className="text-yellow-400 text-sm mr-1">
                ★
              </span>
            )}
          </div>
          <span className="text-gray-400 text-sm ml-2">
            ({reviews.toLocaleString()} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;