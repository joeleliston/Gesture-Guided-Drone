function  closeParrotVirtualLabManeuver
%

%   Copyright 2022 The MathWorks, Inc.

filePath = which('Module3ManeuverTheMinidroneExample.mlx');

fileObj = matlab.desktop.editor.findOpenDocument(filePath);
check_file = matlab.desktop.editor.isOpen(filePath);

if(check_file)
    fileObj.close;
end

end
