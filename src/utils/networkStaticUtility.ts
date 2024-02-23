import { LogData } from "../components/UserLogTable/UserLogTable.type";

export const findUniqueIP = (parsedData: LogData[]) => {
    return new Set(parsedData.map((log) => log.ip));
}

const findTopN = <T>(countMap: Map<T, number>, n: number): T[] => {
    return Array.from(countMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([item]) => item);
  };

const findItemCount = <T>(parsedData: LogData[], extractItem: (log: LogData) => T): Map<T, number> => {
    const countMap = new Map<T, number>();
    parsedData.forEach((log) => {
      const item = extractItem(log);
      const count = countMap.get(item) || 0;
      countMap.set(item, count + 1);
    });
    return countMap;
  };
  
  export const findUrlCount = (parsedData: LogData[]): string[] => {
    const urlCountMap = findItemCount(parsedData, (log) => log.request.split(' ')[1]);
    return findTopN(urlCountMap, 3);
  };
  
  export const findIpCount = (parsedData: LogData[]): string[] => {
    const ipCountMap = findItemCount(parsedData, (log) => log.ip);
    return findTopN(ipCountMap, 3);
  };   
         