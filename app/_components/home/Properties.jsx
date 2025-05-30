import PropertyCard from "../PropertyCard";

const dummy_properties_data = [
  {
    id: 1,
    slug: "property-1",
    image: "/house-1.jpg",
    title: "Property 1",
    address: "Bangkok, Thailand",
    description: "Description 1",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 2,
    slug: "property-2",
    image: "/house-2.jpg",
    title: "Property 2",
    address: "Dhaka, Bangladesh",
    description: "Description 2",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 3,
    slug: "property-3",
    image: "/house-3.jpg",
    title: "Property 3",
    address: "Istanbul, Turkey",
    description: "Description 3",
    price: 3000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 4,
    slug: "property-4",
    image: "/house-4.jpg",
    title: "Property 4",
    address: "Islamabaad, Pakistan",
    description: "Description 4",
    price: 4000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 5,
    slug: "property-5",
    image: "/house-5.jpg",
    title: "Property 5",
    address: "Gulshan, Dhaka, Bangladesh",
    description: "Description 5",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 6,
    slug: "property-6",
    image: "/house-6.jpg",
    title: "Property 6",
    address: "Address 6",
    description: "Description 6",
    price: 6000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 7,
    slug: "property-7",
    image: "/house-7.jpg",
    title: "Property 7",
    address: "Address 7",
    description: "Description 7",
    price: 7000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 8,
    slug: "property-8",
    image: "/house-8.jpg",
    title: "Property 8",
    address: "Address 8",
    description: "Description 8",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 9,
    slug: "property-1",
    image: "/house-1.jpg",
    title: "Property 1",
    address: "Bangkok, Thailand",
    description: "Description 1",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 10,
    slug: "property-2",
    image: "/house-2.jpg",
    title: "Property 2",
    address: "Dhaka, Bangladesh",
    description: "Description 2",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 11,
    slug: "property-3",
    image: "/house-3.jpg",
    title: "Property 3",
    address: "Istanbul, Turkey",
    description: "Description 3",
    price: 3000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 12,
    slug: "property-4",
    image: "/house-4.jpg",
    title: "Property 4",
    address: "Islamabaad, Pakistan",
    description: "Description 4",
    price: 4000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 13,
    slug: "property-5",
    image: "/house-5.jpg",
    title: "Property 5",
    address: "Gulshan, Dhaka, Bangladesh",
    description: "Description 5",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 14,
    slug: "property-6",
    image: "/house-6.jpg",
    title: "Property 6",
    address: "Address 6",
    description: "Description 6",
    price: 6000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 15,
    slug: "property-7",
    image: "/house-7.jpg",
    title: "Property 7",
    address: "Address 7",
    description: "Description 7",
    price: 7000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
  {
    id: 16,
    slug: "property-8",
    image: "/house-8.jpg",
    title: "Property 8",
    address: "Address 8",
    description: "Description 8",
    price: 1000,
    rating: 4.5,
    type: "Apartment",
    owner: "John Doe",
  },
];

function Properties({ places }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {places.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
      {/* {dummy_properties_data.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))} */}
    </div>
  );
}

export default Properties;
