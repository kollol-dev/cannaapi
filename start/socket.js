const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

let drivers = []

io.on('connection', function (socket) {
  console.log('socket id', socket.id)

  console.log('query', socket.request._query.orderId)
  // console.log('query', socket._query.orderId)
  socket.on(`driver_location_${socket.request._query.orderId}`, (data) => {
    console.log(`driver ${socket.request._query.orderId} location lat`, data.lat, 'lng', data.lng)
    let ob = {
      lat: data.lat,
      lng: data.lng,
    }
    drivers[socket.request._query.orderId] = ob

    io.emit(`driver_location_from_server_${socket.request._query.orderId}`, drivers[socket.request._query.orderId])
    io.emit('news', { hello: 'world' });
  })

  socket.on('disconnect', function(){ 
    console.log(`${socket.request._query.orderId} no driver has been disconnected!`)

    io.emit(`driver_${socket.request._query.orderId}_disconnected`, `${socket.request._query.orderId} no driver has been disconnected!`)
  });
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