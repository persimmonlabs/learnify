import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import Card from '../atoms/Card';

/**
 * VideoPlayer Component - Organism
 * Video player with controls
 */

const VideoPlayer = ({
  src,
  poster,
  title,
  onTimeUpdate,
  onEnded,
  onProgress,
  className,
  ...props
}) => {
  return (
    <Card
      variant="elevated"
      padding="none"
      className={cn('overflow-hidden bg-black', className)}
      {...props}
    >
      <div className="relative aspect-video bg-slate-900">
        {/* Video element */}
        <video
          className="w-full h-full"
          src={src}
          poster={poster}
          controls
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onProgress={onProgress}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom overlay (if needed) */}
        {/* You can add custom controls here */}
      </div>

      {/* Video Info */}
      {title && (
        <div className="p-4 bg-white border-t border-slate-100">
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>
      )}
    </Card>
  );
};

export default VideoPlayer;
