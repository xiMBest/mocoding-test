import React, { useState } from 'react';
import HeatMap from './HeatMap';
import readSSTGridFile from '../utils/readSSTGridFile';
import '../styles/App.css';
import emptyMapImage from '../assets/empty-map.png'; // Import the empty-map.jpg file

const App: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<number[][] | null>(null);

  // Catch file input, call readSSTGridFile func
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const data = await readSSTGridFile(file);
        setHeatmapData(data);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };

  // Main render of content project
  return (
    <div className="app-container">
      <div className="background-container" style={{ backgroundImage: `url(${emptyMapImage})` }}>
        <h1>Global Sea Surface Temperature Heatmap</h1>
        <input type="file" onChange={handleFileChange} accept=".zip" />
      </div>
      <div className="heatmap-container">
        {heatmapData ? (
          <HeatMap data={heatmapData} />
        ) : (
          <div>No heatmap data to display</div>
        )}
      </div>
    </div>
  );
};

export default App;
