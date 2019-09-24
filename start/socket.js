const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

let drivers = []

io.on('connection', function (socket) {
  console.log('socket id', socket.id)

  console.log('query', socket.request._query.driverId)
  // console.log('query', socket._query.driverId)
  socket.on(`driver_location_${socket.request._query.driverId}`, (data) => {
    console.log('data', data)
    console.log('driver location lat', data.lat, 'lng', data.lng)
    let ob = {
      lat: data.lat,
      lng: data.lng,
    }
    drivers[socket.request._query.driverId] = ob

    io.emit(`driver_location_from_server_${socket.request._query.driverId}`, drivers[socket.request._query.driverId])
    io.emit('news', { hello: 'world' });
  })
})

io.on('message', (data) => {
  console.log('data', data)
})


// const nsp = io.of('/driver');
// nsp.on('connection', function (socket) {

//   socket.on('driver_location', (data) => {
//     console.log('namespace', data)
    
//     io.emit('driver_location_from_server', data)
//     io.emit('news', { hello: 'world' });
//   })

// });
// nsp.emit('hi', 'everyone!');