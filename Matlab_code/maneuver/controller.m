open_system('parrotMinidroneCompetition')

sim_time_step = 50;
x_prev =0;
y_prev =1;
 %start the simulation and pause the simulation, waiting for singal from python
x_pos = 0;
y_pos = 0;
set_param(gcs,'SimulationCommand','start');
set_param('parrotMinidroneCompetition/x_pos','Gain',num2str(0));
set_param('parrotMinidroneCompetition/y_pos','Gain',num2str(1));
pause(8);
data = [0,0];
%set_param(gcs,'SimulationCommand','pause');
 %open a server, it will block until a client connect to it
s = tcpip('127.0.0.1', 8999,  'NetworkRole', 'server');
fopen(s);

all_data = [0,0];
count=0;
% main loop
while count<1200 % just run for 120 steps for demo  
    fwrite(s,'send');
    while(1) %loop, until read some data
        
        nBytes = get(s,'BytesAvailable');
        if nBytes>0
            break;
        end
    end
   
    
    command = fread(s,nBytes); % fread() will read binary as str
    data=str2num(char(command')); % tranform str into numerical matrix

    %disp(count);
    
    disp(data);
    %all_data = [all_data;data]; % store history data
    if isempty(data)
        data(1)=x_pos;
        data(2)=y_pos;
    end
    x_pos = round(data(1),2); 
    y_pos = round(data(2),2); 
    %disp(x_pos);
    %disp(y_pos);
     % separate each data in the matrix
    
     %set a paramter in the simulink model using the data get from python
    set_param('parrotMinidroneCompetition/x_pos','Gain',num2str(x_pos));
    set_param('parrotMinidroneCompetition/y_pos','Gain',num2str(y_pos+1.2));
  % pause(3);
    % run the simulink model for one step
    set_param(gcs, 'SimulationCommand', "continue");  
    pause(4);
    set_param(gcs, 'SimulationCommand', "pause");
 
    count=count+1;
end
fclose(s);
set_param(gcs,'SimulationCommand','stop');