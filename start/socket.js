const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

io.on('connection', function (socket) {
  console.log('bangladesh !')
  console.log(socket.id)
})

// io.on('driver_location', (data) => {
//   console.log('driver location lat', data.lat, 'lng', data.lng)
// })
