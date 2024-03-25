import React from 'react';
import HeatMapGrid from 'react-heatmap-grid';
import '../styles/HeatMap.css';
import emptyMapImage from '../assets/empty-map.png'; // Import the empty-map.jpg file


interface HeatMapProps {
  data: number[][];
}

const BINARY_DIMENSION_X = 36000;
const DIMENSION_Y = 17999;


//func using react-heatmap-grid from heatmap data to points image
const HeatMap: React.FC<HeatMapProps> = ({ data }) => {
  const renderHeatMap = () => {
    if (data.length === 0) {
      return <div>Loading...</div>;
    }

    return (
            <HeatMapGrid
                xLabels={Array.from({ length: BINARY_DIMENSION_X }, (_, i) => i.toString())}
                yLabels={Array.from({ length: DIMENSION_Y }, (_, i) => i.toString())}
                data={data}
            />
    );
  };


  //component div of the page
  return (
    <div >
      {renderHeatMap()}
    </div>
  );
};

export default HeatMap;
