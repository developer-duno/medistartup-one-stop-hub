
import React, { useState } from 'react';

interface HeroVideoProps {
  videoUrl: string;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ videoUrl }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="aspect-[5/4] relative z-10">
      <video 
        className="w-full h-full object-cover rounded-2xl shadow-xl"
        autoPlay
        muted
        loop
        playsInline
        controls={isVideoPlaying}
        onClick={handleVideoPlay}
        src={videoUrl}
      />
      {!isVideoPlaying && (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handleVideoPlay}>
          <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center animate-pulse-light">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVideo;
