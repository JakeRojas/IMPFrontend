'use client';

import { useState } from 'react';
import { useGetUserOptions, useCreateRoom } from '@/hooks/useRoom';
import { createRoomFetcher } from '@/services/roomService';

export default function RoomCreateForm() {
  const { options, loading } = useGetUserOptions();
  //const [allUsers, setAllUsers] = useState([]);
  // const [name, setName] = useState('');
  // const [floor, setFloor] = useState('');
  // const [type, setType] = useState('');
  // const [stockroomType, setStockroomType] = useState('');
  // const [inCharge, setInCharge] = useState('');
  const { payload, setFormData, errorMsg, success, handleSubmit } = useCreateRoom();
  const { roomName, roomFloor, roomType, stockroomType, roomInCharge } = payload;

  //const users   = Array.from(new Set(allUsers.map(r => r.users)));

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   await createRoomFetcher({ name, floor, type, stockroomType, inCharge });
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   // build a body that matches your Joi schema exactly:
  //   const body = {
  //     roomName:     name,
  //     roomFloor:    floor,
  //     roomType:     type,
  //     stockroomType,            // only sent when type==='stockroom'
  //     roomInCharge: inCharge
  //   };
  //   await createRoomFetcher(body);
  // }

  // async function handleSubmit(e) {
  //   const body = {
  //     name:          roomName,
  //     floor:         roomFloor,
  //     type:          roomType,
  //     stockroomType: stockroomType,
  //     inCharge:      roomInCharge,
  //   };
  //   await createRoomFetcher(body);
  // }

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <label>Room Name</label>
  //     <input
  //       type="text"
  //       value={name}
  //       onChange={e => setName(e.target.value)}
  //       required
  //     />
  //     <label>Room Floor</label>
  //     <input
  //       type="text"
  //       value={floor}
  //       onChange={e => setFloor(e.target.value)}
  //       required
  //     />
  //     <label>Room Type</label>
  //     <select
  //       value={type}
  //       onChange={e => setType(e.target.value)}
  //       required
  //     >
  //       <option value="">Select type</option>
  //       <option value="stockroom">Stockroom</option>
  //       <option value="office">Office</option>
  //       <option value="classroom">Classroom</option>
  //       <option value="comfortroom">Comfort Room</option>
  //       <option value="openarea">Open Area</option>
  //     </select>
  //     {/* <input
  //       type="text"
  //       value={type}
  //       onChange={e => setType(e.target.value)}
  //       required
  //     /> */}

  //     {type === 'stockroom' && (
  //       <>
  //         <label>Stockroom Type</label>
  //         <select
  //           value={stockroomType}
  //           onChange={e => setStockroomType(e.target.value)}
  //           required
  //         >
  //           <option value="">Select stockroom type</option>
  //           <option value="apparel">Apparel</option>
  //           <option value="supply">Supply</option>
  //           <option value="it">IT</option>
  //           <option value="maintenance">Maintenance</option>
  //         </select>
  //       </>
  //     )}

  //     {/* <label>Stockroom Type</label>
  //     <input
  //       type="text"
  //       value={stockroom}
  //       onChange={e => setStockroom(e.target.value)}
  //       required
  //     /> */}

  //     <label>In Charge</label>
  //     {loading ? (
  //       <select disabled>
  //         <option>Loading...</option>
  //       </select>
  //     ) : (
  //       <select
  //         value={inCharge}
  //         onChange={e => setInCharge(e.target.value)}
  //         required
  //       >
  //         <option value="">Select user</option>
  //         {options.map(u => (
  //           <option key={u.id} value={u.id}>
  //             {u.firstName} {u.lastName}
  //           </option>
  //         ))}
  //       </select>
  //     )}

  //     <button type="submit">Create Room</button>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit}>
      <label>Room Name</label>
      <input
        value={roomName}
        onChange={e => setFormData(prev => ({ ...prev, roomName: e.target.value }))}
        required
      />

      <label>Floor</label>
      <input
        value={roomFloor}
        onChange={e => setFormData(prev => ({ ...prev, roomFloor: e.target.value }))}
        required
      />

      <label>Room Type</label>
      <select
        value={roomType}
        onChange={e => setFormData(prev => ({ ...prev, roomType: e.target.value }))}
        required
      >
        <option value="">Select type</option>
        <option value="stockroom">Stockroom</option>
        <option value="office">Office</option>
        <option value="classroom">Classroom</option>
        <option value="comfortroom">Comfort Room</option>
        <option value="openarea">Open Area</option>
      </select>

      {roomType === 'stockroom' && (
        <>
          <label>Stockroom Type</label>
          <select
            value={stockroomType}
            onChange={e => setFormData(prev => ({ ...prev, stockroomType: e.target.value }))}
            required
          >
            <option value="">Select stockroom type</option>
            <option value="apparel">Apparel</option>
            <option value="supply">Supply</option>
            <option value="it">IT</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </>
      )}

      {/* <label>In Charge</label>
      {loading ? (
        <select disabled><option>Loading...</option></select>
      ) : (
        <select
          value={roomInCharge}
          onChange={e => setFormData(prev => ({ ...prev, roomInCharge: e.target.value }))}
          required
        >
          <option value="">Select user</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>
      )} */}
      <label>In Charge</label>
       {loading ? (
        <select disabled>
          <option>Loading...</option>
        </select>
      ) : (
        <select
          value={roomInCharge}
          onChange={e => setFormData(prev => ({ ...prev, roomInCharge: e.target.value }))}
          required
        >
          <option value="">Select user</option>
          {options.map(u => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>
      )}

      <button type="submit">Create Room</button>
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
      {success && <p className="text-green-600">Room created!</p>}
    </form>
  );
}