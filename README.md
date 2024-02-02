# Gesture Guided Drone
***
![image](/screenshots/overview.PNG)
### Video
***
https://youtu.be/xXGLSvz1RHc

###  Introduction
***
This project introduces an innovative approach to control a quadcopter using hand gestures through the integration of a hand pose estimation model, Posecaster. By leveraging Posecaster's hand landmark detection capabilities, real-time coordinates of hand gestures are transmitted to a JavaScript code via WebSocket. The extracted index finger position is then communicated to MATLAB, where it serves as dynamic control inputs for a quadcopter simulation in Simulink. This integration showcases the convergence of computer vision, web communication, and simulation technologies, resulting in a hands-free and intuitive control system for unmanned aerial vehicles.

### Model Design
1. Model Overview

The model seamlessly integrates key components, including Posecaster, JavaScript code, and Simulink, to enable hand gesture-controlled quadcopter navigation. Posecaster captures hand landmarks through a webcam, JavaScript processes the data and communicates with MATLAB, and Simulink interprets the coordinates for a responsive drone simulation.

2. Posecaster

Posecaster, built on the Mediapipe framework, delivers precise and real-time hand landmark coordinates through a user-friendly interface. It utilizes WebSocket communication (wurl: ws://localhost:44444/) to transmit hand landmarks, making it an efficient solution for applications like interactive systems, games, and drone navigation.

3. JavaScript Code
   
The JavaScript code acts as a bridge, facilitating communication between Posecaster and MATLAB. It establishes a WebSocket server, processes received hand pose coordinates, adjusts coordinates, and establishes a TCP connection to relay the data to MATLAB for simulation control.

4. MATLAB Code
   
The MATLAB code integrates hand gesture-controlled coordinates into the Simulink model. It handles simulation initialization, communication setup, a control loop for updating coordinates, coordinate adjustment, and simulation step execution. This ensures accurate and responsive control of the simulated drone within the Simulink environment.

5. Simulink

The modified Simulink model, based on the "Parrot Minidrones Support from Simulink" add-on example, incorporates key alterations for dynamic drone control. Two gain blocks receive position coordinates from MATLAB, guiding the drone's behavior through a Stateflow chart. This modification allows precise coordination between MATLAB and the Simulink environment, resulting in a controlled and responsive drone simulation.
