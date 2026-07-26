import { useEffect, useState } from "react";

type Dimensions = { width: number; height: number };

export function useImageDimensions(urls: string[]) {
  const [dimensions, setDimensions] = useState<Record<string, Dimensions>>({});

  useEffect(() => {
    urls.forEach((url) => {
      if (dimensions[url]) return;
      const img = new Image();
      img.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [url]: { width: img.naturalWidth, height: img.naturalHeight },
        }));
      };
      img.src = url;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls]);

  return dimensions;
}