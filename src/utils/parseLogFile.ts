import { LogData } from "../components/UserLogTable/UserLogTable.type";

export const parseLogFile = (file: File, callback: (parsedData: LogData[]) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
      const content: string = reader.result as string;
      console.log(content)
      const lines = content.split('\n').filter(line => line.trim() !== '');
      const parsedData: LogData[] = lines.map(parseLogLine);
      callback(parsedData);
    };
    reader.readAsText(file);
  };


export  const parseLogLine = (line: string): LogData => {
    const parts = line && line.split(' ');
  
    return {
      ip: parts[0],
      timestamp: `${parts[3]?.slice(1)} ${parts[4]?.slice(0, -1)}`,
      request: `${parts[5]} ${parts[6]} ${parts[7]}`,
      status: parts[8],
      size: parts[9],
    };
  };