import { useState, useEffect } from 'react';

import { parseLogFile } from '../../utils/parseLogFile';
import { findUniqueIP, findUrlCount, findIpCount } from '../../utils/networkStaticUtility';

import './UserLogTable.css';
import { LogData } from './UserLogTable.type';

const UserLogTable = () => {
  const [logData, setLogData] = useState<LogData[]>([]);
  const [networkStats, setNetworkStats] = useState<{ uniqueIPCount: number; topUrls: string[]; topIPs: string[] }>({
    uniqueIPCount: 0,
    topUrls: [],
    topIPs: [],
  });

  useEffect(() => {
    if (logData.length > 0) {
      const uniqueIPSet = findUniqueIP(logData);
      const top3Urls = findUrlCount(logData);
      const top3IPs = findIpCount(logData);
      setNetworkStats({ uniqueIPCount: uniqueIPSet.size, topUrls: top3Urls, topIPs: top3IPs });
    }
  }, [logData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      parseLogFile(file, (parsedData) => {
        setLogData(parsedData);
      });
    }
  };

  return (
    <div>
      <h2>Upload your Log file</h2>
      <input type="file" accept=".log" onChange={handleFileChange} />
      {logData.length > 0 && (
        <>
          <div className='network-stats'>
            <div>
              <h2>Number of Unique IP Addresses: {networkStats.uniqueIPCount}</h2>
            </div>

            <div>
              <h2>Top 3 Most Visited URLs</h2>
              <ul>
                {networkStats.topUrls.map((url, index) => (
                  <li key={index}>{url}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Top 3 Most Active IP Addresses</h2>
              <ul>
                {networkStats.topIPs.map((ip, index) => (
                  <li key={index}>{ip}</li>
                ))}
              </ul>
            </div>
          </div>
          <table id="users">
            <thead>
              <tr>
                <th>IP</th>
                <th>Timestamp</th>
                <th>Request</th>
                <th>Status</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {logData.map((log, index) => (
                <tr key={index}>
                  <td>{log.ip}</td>
                  <td>{log.timestamp}</td>
                  <td>{log.request}</td>
                  <td>{log.status}</td>
                  <td>{log.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserLogTable;
