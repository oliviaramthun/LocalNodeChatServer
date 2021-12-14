const net = require('net')
const readline = require('readline')

const server = net.createServer()

//global list of connected users
let connectedUsers = [] 
let pastUsers = []
//let clientUsername = new Map();



//(connection) is a parameter, as a new connection is generated per client
server.on('connection', (connection) => {
    //add connected user objects to array 
    connectedUsers.push(connection)
    //let message
    pastUsers = connectedUsers

    //log server side when a client connects
    console.log("CLIENT CONNECTED")


    //when server receives messasge from client, send message to all clients except sender
    connection.on('data', (data) => {
       data = data.toString("utf-8")
        connectedUsers.forEach(client =>
           /*
            {if(connection!=client && !data.includes("$") && clientUsername.has(client)){
               
                 client.write(`\n${clientUsername.get(client)}:${data} `)
             }
             else if(data.includes("$")) {
                 clientUsername.set(client,data.slice(1,))
             }
            }
            */
            client.write(data)
            )
    })
    
    //for each connection in my list
    for(let client_connection of connectedUsers){

        //if client isn't the newest connection, notify that a new client has connected
        if(client_connection != connection){
            client_connection.write(Buffer.from("\n"))
            client_connection.write(Buffer.from("A new client has connected\n"))
           
        }else{client_connection.write(Buffer.from("You have succesfully connected to the server\n"))}
        
    }//close for loop for each client connected
  

    //when connection closes say goodbye
    connection.on('close', () => {
        console.log("CLIENT DISCONNECTED")
        connectedUsers.pop(connection)
        pastUsers.push(connection)
    })

    //when something goes wrong w connection, print this
    connection.on('error', () => {
        console.log("ERROR: Connection Interrupted")
    })

    
})//finish instructions for each connection

server.listen(1234)