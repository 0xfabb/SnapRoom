// y-server.js
import http from 'http'
import WebSocket from 'ws'
import { setupWSConnection } from 'y-websocket/bin/utils'

const server = http.createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req)
})

const port = process.env.PORT || 1234
server.listen(port, () => {
  console.log(`✅ Yjs WebSocket server listening on ${port}`)
})
