//main layout
// 'use client';

// import { useReceiveStockroom } from '@/hooks/useRoom';

// export default function ReceiveStockroomUI({ roomId }) {
//   const { room, form, error, loading, onChange, onSubmit } =
//     useReceiveStockroom(roomId);

//   if (loading) return <p>Loading room…</p>;
//   if (error)   return <p className="text-red-600">{error}</p>;

//   console.log('💡 room.stockroomType =', room.stockroomType);

//   // decide which fields to show
//   const fieldsByType = {
//     apparel: [
//       'receivedFrom','receivedBy',
//       'apparelName','apparelLevel',
//       'apparelType','apparelFor',
//       'apparelSize','apparelQuantity'
//     ],
//     supply: [
//       'receivedFrom','receivedBy',
//       'supplyName','supplyQuantity','supplyMeasure'
//     ],
//   };
//   const fields = fieldsByType[room.stockroomType] || ['receivedFrom','receivedBy'];

//   return (
//     <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold">
//         Receive into {room.roomName} ({room.stockroomType})
//       </h2>

//       {fields.map(f => (
//         <div key={f}>
//           <label className="block capitalize">{f}</label>
//           <input
//             name={f}
//             value={form[f] || ''}
//             onChange={onChange}
//             required
//             className="w-full border rounded p-2"
//           />
//         </div>
//       ))}

//       <button
//         type="submit"
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// }

-
// app/rooms/[roomId]/receive/receive.layout.js
// 'use client';

// import { useReceiveStockroom } from '@/hooks/useRoom';

// export default function ReceiveStockroomUI({ roomId }) {
//   const {
//     room,
//     enumOptions,
//     form,
//     error,
//     loading,
//     onChange,
//     onSubmit,
//   } = useReceiveStockroom(roomId);

//   if (loading) return <p>Loading…</p>;
//   if (error)   return <p className="text-red-600">{error}</p>;

//   // decide which fields appear for each type
//   const fieldsByType = {
//     apparel: [
//       'receivedFrom','receivedBy',
//       'apparelName','apparelLevel',
//       'apparelType','apparelFor',
//       'apparelSize','apparelQuantity'
//     ],
//     supply: [
//       'receivedFrom','receivedBy',
//       'supplyName','supplyQuantity','supplyMeasure'
//     ],
//     // …etc
//   };
//   const fields =
//     fieldsByType[room.stockroomType] || ['receivedFrom','receivedBy'];
//   {fields.map(f => {
//     const opts = enumOptions[f];
  
//     // if opts is an array of values, render a <select>
//     if (Array.isArray(opts) && opts.length > 0) {
//       return (
//         <div key={f}>
//           <label className="block capitalize mb-1">{f}</label>
//           <select
//             name={f}
//             value={form[f] || ''}
//             onChange={onChange}
//             required
//             className="w-full border rounded p-2"
//           >
//             <option value="">Select {f}</option>
//             {opts.map(opt => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </div>
//       );
//     }

//   return (
//     <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold">
//         Receive into {room.roomName} ({room.stockroomType})
//       </h2>

//       {fields.map(f => (
//         <div key={f}>
//           <label className="block capitalize mb-1">{f}</label>

//           {Array.isArray(enumOptions[f]) ? (
//             <select
//               name={f}
//               value={form[f] || ''}
//               onChange={onChange}
//               required
//               className="w-full border rounded p-2"
//             >
//               <option value="">Select {f}</option>
//               {enumOptions[f].map(opt => (
//                 <option key={opt} value={opt}>
//                   {opt}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input
//               name={f}
//               value={form[f] || ''}
//               onChange={onChange}
//               required
//               className="w-full border rounded p-2"
//             />
//           )}
//         </div>
//       ))}

//       <button
//         type="submit"
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Submit
//       </button>
//     </form>
//   );
// })}

// }



// app/rooms/[roomId]/receive/receive.layout.js
'use client';

import { useReceiveStockroom } from '@/hooks/useRoom';

export default function ReceiveStockroomUI({ roomId }) {
  const {
    room,
    enumOptions,
    form,
    error,
    loading,
    onChange,
    onSubmit,
  } = useReceiveStockroom(roomId);

  // 1) Debug logs
  console.log('⚛️ render ReceiveStockroomUI');
  console.log('   room:', room);
  console.log('   enumOptions:', enumOptions);
  console.log('   loading:', loading, 'error:', error);

  // 2) Loading / error guards
  if (loading) {
    return <p>Loading room data and enum options…</p>;
  }
  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }
  if (!room) {
    return <p className="text-red-600">No room data found.</p>;
  }

  // 3) Decide which fields to show
  const fieldsByType = {
    apparel: [
      'receivedFrom','receivedBy',
      'apparelName','apparelLevel',
      'apparelType','apparelFor',
      'apparelSize','apparelQuantity'
    ],
    supply: [
      'receivedFrom','receivedBy',
      'supplyName','supplyQuantity','supplyMeasure'
    ],
    // …etc.
  };
  const fields =
    fieldsByType[room.stockroomType] || ['receivedFrom','receivedBy'];

  // 4) Render the form
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">
        Receive into {room.roomName} ({room.stockroomType})
      </h2>

      {fields.map(f => {
        const opts = enumOptions[f] || [];
        // If opts is a non-empty array, render a dropdown
        if (Array.isArray(opts) && opts.length > 0) {
          return (
            <div key={f}>
              <label className="block capitalize mb-1">{f}</label>
              <select
                name={f}
                value={form[f] || ''}
                onChange={onChange}
                required
                className="w-full border rounded p-2"
              >
                <option value="">Select {f}</option>
                {opts.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }
        // Otherwise, render a normal text input
        return (
          <div key={f}>
            <label className="block capitalize mb-1">{f}</label>
            <input
              name={f}
              value={form[f] || ''}
              onChange={onChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        );
      })}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
