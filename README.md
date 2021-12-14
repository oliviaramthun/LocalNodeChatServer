# LocalNodeChatServer
A simple server and client program that allows users to connect to the server, enter a username, send, and receive messages from other users on the server!

A chat server and client in Node.js as follows:

- Chat client asks for user's name on startup
- Chat client can send multiple messages
- Chat server can accept connections and receive messages from multiple clients AT THE SAME TIME
- Chat server forwards messages from each client to all other clients
- Server should run in Azure VM.
 
Message format is a single UTF-8 encoded string that looks like "Name: Message"
