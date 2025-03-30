// 'use client';

// import useSWR from 'swr';
// //const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function ApparelList() {
//   const { data, error } = useSWR(
//     process.env.NEXT_PUBLIC_API_URL + '/api/apparel',
//     fetcher
//   );

//   if (error) return <div>Failed to load apparel.</div>;
//   if (!data) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Apparel Inventory</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.size} - {item.color}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
});

export default function ApparelList() {
  // Use the API route provided by Next.js
  const { data, error } = useSWR('/api/apparel', fetcher);

  if (error) return <div>Failed to load apparel.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Apparel Inventory</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.size} - {item.color}
          </li>
        ))}
      </ul>
    </div>
  );
}