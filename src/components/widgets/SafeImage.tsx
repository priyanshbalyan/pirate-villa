'use client';
import Image, { ImageProps } from 'next/image';
import React, { useEffect, useState } from 'react';

const SafeImage = ({ fallbackSrc = '/bgpic.jpeg', src, ...rest }: ImageProps & { fallbackSrc?: string }) => {
  const [imageSrc, setImageSrc] = useState(typeof src === 'string' && !src.startsWith('/') ? `/${src}` : src);

  const handleError = () => {
    setImageSrc(fallbackSrc); // Switch to fallback image
  };

  useEffect(() => {
    setImageSrc(src)
  }, [src])

  return (
    <Image
      onError={handleError}
      blurDataURL={fallbackSrc}
      src={imageSrc}
      {...rest}
    />
  )
};

export default SafeImage;