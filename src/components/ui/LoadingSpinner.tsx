// src/components/ui/LoadingSpinner.tsx
export function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-slate-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          {/* 3D Rotating Cube */}
          <div className="relative w-16 h-16 perspective">
            <div className="absolute inset-0 bg-blue-500 w-full h-full animate-spin-3d"></div>
            <div className="absolute inset-0 bg-blue-400 w-full h-full transform rotate-y-180 backface-hidden"></div>
            <div className="absolute inset-0 bg-blue-300 w-full h-full transform rotate-x-90 backface-hidden"></div>
            <div className="absolute inset-0 bg-blue-200 w-full h-full transform rotate-x--90 backface-hidden"></div>
            <div className="absolute inset-0 bg-blue-100 w-full h-full transform rotate-z-90 backface-hidden"></div>
            <div className="absolute inset-0 bg-blue-50 w-full h-full transform rotate-z--90 backface-hidden"></div>
          </div>
          <p className="mt-4 text-slate-600 dark:text-gray-300">Loading mining data...</p>
        </div>
      </div>
    );
  }
  