const WebSocket = require('ws');
const net = require('net');
var x_pre =0;
var y_pre =0;

// WebSocket server
const wss = new WebSocket.Server({ port: 44444 });
let receivedMessageFromWebSocket=[0,0]  ; // Global variable to store the received message
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
   
    ws.on('message', (message) => {
        //  the message is sensor data in JSON format
        const sensorData = JSON.parse(message);

        // Process the sensor data (replace this with your processing logic)
       const processedData  = processSensorData(sensorData);
       receivedMessageFromWebSocket = processedData; 
        
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

// TCP client for sending data to MATLAB
const tcpClient = net.createConnection({ host: '127.0.0.1', port: 8999 }, () => {
    console.log('Connected to MATLAB');
});
//console.log('hi');
tcpClient.on('data', (data) => {
    // Handle data received from MATLAB
    const receivedMessage = data.toString();
    console.log('Data received from MATLAB:', receivedMessage);

    // Check if MATLAB is requesting data
    if (receivedMessage.trim() === 'send') {
        // Signal from MATLAB to send data
        sendToMatlab(receivedMessageFromWebSocket);
        receivedMessageFromWebSocket = []; // Reset the global variable
    }
});

tcpClient.on('end', () => {
    console.log('Disconnected from MATLAB');
});

function processSensorData(sensorData) {
  

    
    if (JSON.stringify(sensorData)=='{}'){
        console.log("empty");
        x =0;
        y=0;
    }
    else{
        
        //console.log(sensorData.multiHandLandmarks[0][7]["x"]);
       x = sensorData.multiHandLandmarks[0][7]["x"];
       y = sensorData.multiHandLandmarks[0][7]["y"];
    }
    
   // console.log("this is x");
    //console.log(x);
    //console.log("this is y");
    //console.log(y);
    return [x, y ];
}
function delay(ms) {
    const date = Date.now();
    let currentDate = null;
 
    do {
        currentDate = Date.now();
    } while (currentDate - date < ms);
}

function sendToMatlab(new_x_y) {
    //console.log(new_x_y);
    if(new_x_y[0] ==0 && new_x_y[1] ==0) {
        new_x_y[0] = (new_x_y[0]) *5;
        new_x_y[1] = (new_x_y[1]) *5;
    }
    else{
        console.log(new_x_y);
        new_x_y[0] = (new_x_y[0]-0.5)*5 ;
        new_x_y[1] = (((new_x_y[1]-1) *-1 )-0.5)*5;
        console.log(new_x_y);
    }
    console.log('sendToMatlab');
        

   const controlSignal = new_x_y.map(String);
   const s = controlSignal.join(',');
   const s_l = Buffer.from(s, 'utf8');
   
     
    // Send data to MATLAB using TCP
    //if (Math.abs(new_x_y[0]-x_pre)>0.01 && Math.abs(new_x_y[1]-y_pre)<0.01 ){
        console.log('mabe');
      // console.log(s_l);
        tcpClient.write(s_l);
        x_pre = new_x_y[0];
        y_pre = new_x_y[1];
   // }
    
    //delay( 5000);
}

// Handle errors
tcpClient.on('error', (err) => {
    console.error('TCP client error:', err.message);
});

wss.on('error', (err) => {
    console.error('WebSocket server error:', err.message);
});