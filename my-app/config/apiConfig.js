export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  //Account routs from backend
  loginRoute:         '/accounts/authenticate',
  registerRoute:      '/accounts/register',
  verifyEmailRoute:   '/accounts/verify-email',
  refreshTokenRoute:  '/accounts/refresh-token',

  createUsersRoute:   '/accounts/create-user',

  getUsersRoute:      '/accounts/',
  getUserByIdRoute:   '/accounts/:id', 

  //Room routs from backend
  createRoomRoute:          '/rooms/create-room',
  registerItemRoute:        '/rooms/:roomId/register-item',
  scanItemRoute:            '/rooms/:roomId/scan',
  receiveInStockroomRoute:  '/rooms/:roomId/receive',

  getRoomEnumOptionsRoute:  '/rooms/:roomId/enum-options',
  getRoomsRoute:            '/rooms/',
  getFilteredRoomsRoute:    '/rooms/filtered-by',
  getRoomByIdRoute:         '/rooms/:id',
  getInChargeOptionsRoute:  '/rooms/in-charge-options',
  getRegisteredItemsRoute:  '/rooms/:roomId/items',
  getReceivedItemsRoute:    '/rooms/:roomId/received-items',
  
  updateItemStatusRoute:    '/rooms/:roomId/scan/items/:itemQrCode/status',

  //Item routs from backend
  createItemRoute:        '/items/create-item',
  assignItemRoute:        '/items/assign-item',
  scanItemRoute:          '/items/scan',

  getItemsRoute:          '/items/',
  getFilteredItemsRoute:  '/items/filtered-by',
  getItemByIdRoute:       '/items/:id',
  getItemQRCodeRoute:     '/items/:id/qrcode',

  //Apparel routs from backend
  receiveApparelRoute:       '/apparels/receive',

  getReceivedApparelRoute:   '/apparels/',

  //Admin Supply routs from backend
  getReceivedSuppliesRoute:   '/supplies/received ',
};

export const headers = {
  json: {
    'Content-Type': 'application/json',
  },
  //auth: (token) => ({ Authorization: `Bearer ${token}` })
};