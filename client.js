const net = require('net')
const readline = require("readline");


//creating interface for i/o from client
const commandLine = readline.createInterface({
    input: process.stdin, output: process.stdout
})

//prompts the user for a message, using username as a parameter
let askForMessage = (username) => {
    commandLine.question('Message:', (message) => {
        username = username.toString("utf-8")
        message = message.toString("utf-8")
    
        //creates single string of username: message
        dataToWrite = username + ":" + message
        if(message[1]!="\n"){
            //writes username:message to all connections
            connection.write(dataToWrite)
            //reprompts for another message using same username 
            askForMessage(username)
        }
        else{
            console.log("Invalid character")
        }
    })
}




//this is the statement that executes the routine
//prompts each connection for username, calls askformessage with initial username entry
let initmessage = (connection)=> {
    commandLine.question('Username: ', (username) =>{
        
        if(username != "\n"){
            askForMessage(username)
            }        
    })
}
                /*
                messagesent = await (askForMessage(username))

                if(messagesent == 1){
                    askForMessage(username)
                }else{
                    setInterval(() => {
                        console.log("Waiting for message sent status")
                    }, 1000)

                    console.log("error sending message")
                }
                //setting message sent flag so that the following instruction have to happen before the loop
                //messagesent = 1
                */
            //username= username.toString("utf-8")
            //commandLine.close();
            //clear message sent flag at the end of each loop so once the message has
            //been sent we can jump in again during the next iteration
           //messagesent = 0
           
       // }
       
       // }//end while

const connection = net.connect({host: "localhost", port: 1234})
//connection is not yet connected

//these instructions are independent of the connection, 
//do this once client connects, but dont wait for connection to keep running prog 
connection.on('data', (data) => {
    console.log(data.toString("utf-8"))
    //console.log("this works like i think it does")

})

//if server crashes / disconnects 
connection.on('error', () => {
    console.log("Server has died... Pay your respects")
    process.exit(1)
})


connection.on('connect', () => {
    //connection has connected
    setTimeout(()=>{initmessage(connection)},1000)
})
