const Server = use('Server')
const io = use('socket.io')(Server.getInstance())

io.on('connection', function (socket) {
  console.log('socket id', socket.id)

  console.log('query', socket)
  socket.on('driver_location', (data) => {
    console.log('data', data)
    console.log('driver location lat', data.lat, 'lng', data.lng)

    io.emit('driver_location_from_server', data)
    io.emit('news', { hello: 'world' });
  })
})

io.on('message', (data) => {
  console.log('data', data)
})


// const nsp = io.of('/my-namespace');
// nsp.on('connection', function (socket) {

//   socket.on('driver_location', (data) => {
//     console.log('namespace', data)
    
//     io.emit('driver_location_from_server', data)
//     io.emit('news', { hello: 'world' });
//   })

// });
// nsp.emit('hi', 'everyone!');