import { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption: string;
}

export default function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="project-card">
      {imageError ? (
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-600 text-sm font-light tracking-wide">Project Image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="project-card-image"
          onError={() => setImageError(true)}
        />
      )}
      <div className="project-card-caption">
        <p className="project-card-caption-text">{caption}</p>
      </div>
    </div>
  );
}