import React, { useState, useEffect } from 'react';

const NetworkNode = ({ x, y, z, rotation }) => {
  const perspective = 1000;
  const scaleFactor = perspective / (perspective + z);
  const projectedX = x * scaleFactor;
  const projectedY = y * scaleFactor;
  
  // Create hexagon points
  const size = 12;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 + rotation) * Math.PI / 180;
    const px = size * Math.cos(angle);
    const py = size * Math.sin(angle);
    return `${px},${py}`;
  }).join(' ');
  
  return (
    <g transform={`translate(${projectedX}, ${projectedY}) scale(${scaleFactor})`}>
      <polygon
        points={points}
        className="fill-blue-400 opacity-80"
      />
      <polygon
        points={points}
        className="fill-blue-300 opacity-40 scale-75"
        transform="rotate(30)"
      />
    </g>
  );
};

const NetworkLine = ({ startX, startY, startZ, endX, endY, endZ }) => {
  const perspective = 1000;
  const startScale = perspective / (perspective + startZ);
  const endScale = perspective / (perspective + endZ);
  
  return (
    <line
      x1={startX * startScale}
      y1={startY * startScale}
      x2={endX * endScale}
      y2={endY * endScale}
      className="stroke-blue-300 opacity-30"
      strokeWidth="1"
    />
  );
};

export function LoadingSpinner() {
  const [nodes, setNodes] = useState([]);
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const nodeCount = 20;
    const radius = 150;
    
    // Create nodes in a spherical pattern
    const initialNodes = Array.from({ length: nodeCount }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      return {
        id: i,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        rotation: Math.random() * 360,
        orbitSpeed: 0.2 + Math.random() * 0.3,
        rotationSpeed: 0.3 + Math.random() * 0.5,
        orbitOffset: Math.random() * Math.PI * 2
      };
    });
    setNodes(initialNodes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          // Update orbit position
          const time = Date.now() * 0.001 * node.orbitSpeed;
          const orbit = node.orbitOffset + time;
          
          // Calculate new position on the sphere
          const radius = 150;
          const x = radius * Math.cos(orbit) * Math.cos(time * 0.5);
          const y = radius * Math.sin(orbit) * Math.cos(time * 0.5);
          const z = radius * Math.sin(time * 0.5);
          
          return {
            ...node,
            x,
            y,
            z,
            rotation: node.rotation + node.rotationSpeed
          };
        });
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate connections
  const connections = [];
  nodes.forEach((node1, i) => {
    nodes.slice(i + 1).forEach(node2 => {
      const distance = Math.sqrt(
        Math.pow(node1.x - node2.x, 2) +
        Math.pow(node1.y - node2.y, 2) +
        Math.pow(node1.z - node2.z, 2)
      );
      
      if (distance < 200) {
        connections.push({
          start: node1,
          end: node2,
          distance
        });
      }
    });
  });

  return (
    <div className="relative flex items-center justify-center h-screen w-screen bg-slate-50 dark:bg-gray-900 overflow-hidden">
      {/* Animated Waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top waves */}
        <div className="absolute top-0 left-0 w-full h-40">
          <svg 
            className="absolute top-0 left-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wave 1 - Fastest, smallest */}
            <path 
              d="M0,0 C150,20 300,40 450,40 C600,40 750,20 900,35 C1050,50 1200,20 1200,20 V0 H0"
              className="fill-blue-100/20 dark:fill-blue-800/20"
              style={{
                animation: 'wave1 25s cubic-bezier(0.36, 0, 0.64, 1) infinite',
                animationDelay: '-2s'
              }}
            />
            {/* Wave 2 - Medium speed and size */}
            <path 
              d="M0,0 C300,60 600,100 900,80 C1200,60 1500,80 1800,70 V0 H0"
              className="fill-blue-200/15 dark:fill-blue-700/15"
              style={{
                animation: 'wave2 30s cubic-bezier(0.36, 0, 0.64, 1) infinite',
                animationDelay: '-5s'
              }}
            />
            {/* Wave 3 - Slowest, largest */}
            <path 
              d="M0,0 C400,80 800,120 1200,100 C1600,80 2000,100 2400,90 V0 H0"
              className="fill-blue-300/10 dark:fill-blue-600/10"
              style={{
                animation: 'wave3 35s cubic-bezier(0.36, 0, 0.64, 1) infinite',
                animationDelay: '-8s'
              }}
            />
          </svg>
        </div>

        {/* Bottom waves */}
        <div className="absolute bottom-0 left-0 w-full h-40">
          <svg 
            className="absolute bottom-0 left-0 w-full h-full rotate-180"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wave 1 - Fastest, smallest */}
            <path 
              d="M0,0 C150,20 300,40 450,40 C600,40 750,20 900,35 C1050,50 1200,20 1200,20 V0 H0"
              className="fill-blue-100/20 dark:fill-blue-800/20"
              style={{
                animation: 'wave1 25s cubic-bezier(0.36, 0, 0.64, 1) infinite',
                animationDelay: '-12s'
              }}
            />
            {/* Wave 2 - Medium speed and size */}
            <path 
              d="M0,0 C300,60 600,100 900,80 C1200,60 1500,80 1800,70 V0 H0"
              className="fill-blue-200/15 dark:fill-blue-700/15"
              style={{
                animation: 'wave2 30s cubic-bezier(0.36, 0, 0.64, 1) infinite',
                animationDelay: '-15s'
              }}
            />
            {/* Wave 3 - Slowest, largest */}
            <path 
              d="M0,0 C400,80 800,120 1200,100 C1600,80 2000,100 2400,90 V0 H0"
              className="fill-blue-300/10 dark:fill-blue-600/10"
              style={{
                animation: 'wave3 35s cubic-bezier(0.36, 0, 0.64, 1) infinite',
                animationDelay: '-18s'
              }}
            />
          </svg>
        </div>
      </div>

      {/* Network Animation */}
      <div className="flex flex-col items-center">
        <div className="relative w-96 h-96">
          <svg
            viewBox="-200 -200 400 400"
            className="w-full h-full"
          >
            <g>
              {connections.map((connection, i) => (
                <NetworkLine
                  key={`line-${i}`}
                  startX={connection.start.x}
                  startY={connection.start.y}
                  startZ={connection.start.z}
                  endX={connection.end.x}
                  endY={connection.end.y}
                  endZ={connection.end.z}
                />
              ))}
              
              {nodes.map((node) => (
                <NetworkNode
                  key={node.id}
                  x={node.x}
                  y={node.y}
                  z={node.z}
                  rotation={node.rotation}
                />
              ))}
            </g>
          </svg>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-gray-300 text-lg font-medium">
            Loading mining data...
          </p>
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;