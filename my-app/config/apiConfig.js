export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  //Account routs to from backend
  loginRoute: '/accounts/authenticate',
  registerRoute: '/accounts/register',
  verifyEmailRoute: '/accounts/verify-email',
  createUsersRoute: '/accounts/create-user',
  getUsersRoute: '/accounts/',
  getUserByIdRoute: '/accounts/:id', 

  //Room routs to from backend
  createRoomRoute: '/room/create-room',
  getRoomsRoute: '/room/',
  getRoomByIdRoute: '/room/:id',
  registerItemRoute: '/room/:roomId/register-item',
  getInChargeOptionsRoute: '/room/in-charge-options',
  getRegisteredItemsRoute: '/room/:roomId/items',
  scanItemRoute: 'room/:roomId/scan',
  updateItemStatusRoute:  'room/:roomId/scan/items/:itemQrCode/status',
  
  //Item routs to from backend
  createItemRoute: '/items/create-item',
  getItemsRoute: '/items/',
  getItemByIdRoute: '/items/:id',
  assignItemRoute: '/items/assign-item',
  scanItemRoute: '/items/scan'
};

export const headers = {
  json: {
    'Content-Type': 'application/json',
  },
  //auth: (token) => ({ Authorization: `Bearer ${token}` })
};