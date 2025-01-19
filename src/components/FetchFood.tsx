// "use client";
// import React from 'react';
// import { createClient } from '@sanity/client';
// const client = createClient({
//   projectId: process.env.SANITY_PROJECT_ID, 
//   dataset: "production",
//   useCdn: true,
//   token: process.env.SANITY_API_TOKEN,
//   apiVersion: '2025-01-17',
// });
// export default async function FetchFood() {
//   const query = `*[_type == "food"]{
//     _id,
//     name,
//     price,
//     "originalPrice": originalPrice,
//     rating,
//     tags,
//     "imageUrl": image.asset->url,
//     description,
//     available
//   }`;
//   const foods = await client.fetch(query);
//   return (
//     <div>
//       <h1>Foods</h1>
//       <div>
//         {foods.map((food: any) => (
//           <div key={food._id}>
//             <h2>{food.name}</h2>
//             <p>{food.description}</p>
//             <p>Price: ${food.price}</p>
//             {food.originalPrice && (
//               <p>
//                 Original Price: <s>${food.originalPrice}</s>
//               </p>
//             )}
//             <p>{food.available ? "Available" : "Out of Stock"}</p>
//             <img src={food.imageUrl} alt={food.name} />
//             {food.tags && (
//               <p>Tags: {food.tags.join(", ")}</p>
//             )}
          
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useState } from 'react';
import { createClient, SanityClient } from '@sanity/client';

// Define a type for the food item
type Food = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  tags?: string[];
  imageUrl: string;
  description: string;
  available: boolean;
};

// Initialize the Sanity Client
const client: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // Use NEXT_PUBLIC_ for client-side variables
  dataset: "production",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // Ensure this is set in your environment variables
  apiVersion: '2025-01-17',
});

const FetchFood: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]); // State to hold food data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetching data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "food"]{
          _id,
          name,
          price,
          "originalPrice": originalPrice,
          rating,
          tags,
          "imageUrl": image.asset->url,
          description,
          available
        }`;

        const foodData: Food[] = await client.fetch(query); // Fetch data
        setFoods(foodData); // Update state with fetched data
      } catch (err) {
        setError('Failed to fetch food data'); // Set error message
        console.error(err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>{error}</p>;
  }

  // Render the food data
  return (
    <div>
      <h1>Foods</h1>
      <div>
        {foods.length === 0 ? (
          <p>No food items available.</p> // If no food data is available
        ) : (
          foods.map((food) => (
            <div key={food._id} style={{ marginBottom: '20px' }}>
              <h2>{food.name}</h2>
              <p>{food.description}</p>
              <p>Price: ${food.price}</p>
              {food.originalPrice && (
                <p>
                  Original Price: <s>${food.originalPrice}</s>
                </p>
              )}
              <p>{food.available ? "Available" : "Out of Stock"}</p>
              <img src={food.imageUrl} alt={food.name} width="200" />
              {food.tags && <p>Tags: {food.tags.join(", ")}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FetchFood;
