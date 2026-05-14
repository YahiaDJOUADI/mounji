'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageOptimizedProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

const ImageOptimized = ({ src, alt, className, fill = false, width, height, priority = false }: ImageOptimizedProps) => {
  const [loaded, setLoaded] = useState(false);

  if (fill) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <div className={cn('absolute inset-0 bg-arch-surface animate-pulse transition-opacity duration-700', loaded ? 'opacity-0' : 'opacity-100')} />
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn('object-cover transition-all duration-700', loaded ? 'blur-0 scale-100' : 'blur-sm scale-105')}
          onLoad={() => setLoaded(true)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className={cn('absolute inset-0 bg-arch-surface animate-pulse transition-opacity duration-700', loaded ? 'opacity-0' : 'opacity-100')} />
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        priority={priority}
        className={cn('w-full h-full object-cover transition-all duration-700', loaded ? 'blur-0' : 'blur-sm')}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageOptimized;
