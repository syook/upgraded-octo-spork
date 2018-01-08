## Notification Emitter Engine

This engine listens to Redis for a targetted app's notification payloads and delivers them to the client app via socket.io

### Usage
Clone the repo and cd into the project

```sh
npm install
node index.js app_name server_port socket_port
```