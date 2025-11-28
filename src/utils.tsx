import { useState } from 'react';

export function useSequentialTypewriter(texts: string[], speed: number = 50, initialDelay: number = 0) {
  const delays = texts.reduce((acc, _, index) => {
    if (index === 0) {
      acc.push(initialDelay);
    } else {
      const previousDelay = acc[index - 1];
      const previousTextLength = texts[index - 1].length;
      acc.push(previousDelay + (previousTextLength * speed));
    }
    return acc;
  }, [] as number[]);
  
  return delays;
}

export function AspectRatioImage({
  src,
  alt,
  width,  
}: {
  src: string;
  alt: string;
  width: number;
}) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };
  return (
    <img
      src={src}
      alt={alt}
      onLoad={handleLoad}
      style={{
        width:`${width}px`,
        height: aspectRatio ? `${width/aspectRatio}px` : 'auto',
      }}
    /> 
  );
}

