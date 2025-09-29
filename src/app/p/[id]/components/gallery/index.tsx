"use client";

import { useState } from "react";
import FullScreen from "./full-screen";
import { ProductImage } from "@/types";
import classNames from "classnames";

type Props = {
  images: ProductImage[];
};

const Gallery = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);

  const activeImage = images[activeIndex];

  const handleNext = () => {
    const nextIndex = activeIndex + 1;

    setActiveIndex(nextIndex >= images.length ? FIRST_INDEX : nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = activeIndex - 1;

    setActiveIndex(prevIndex < FIRST_INDEX ? images.length - 1 : prevIndex);
  };

  return (
    <>
      {isFullScreenVisible && (
        <FullScreen
          imageUrl={activeImage.full}
          onClose={() => setIsFullScreenVisible(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          totalItems={images.length}
          currentPosition={activeIndex + 1}
        />
      )}

      <div className="flex flex-1 gap-6 max-w-full flex-col xl:flex-row-reverse xl:h-fit">
        <div className="flex-1 flex justify-center items-center h-auto mb-auto">
          <img
            data-testid="image-full"
            src={activeImage.full}
            alt="Imagem ampliada"
            className="max-w-full w-auto max-h-[400px] xl:max-h-full"
            onClick={() => setIsFullScreenVisible(true)}
          />
        </div>

        <div className="flex gap-2 flex-row overflow-auto xl:flex-col">
          {images.map(({ miniature }, index) => (
            <button
              key={miniature}
              className={classNames(
                "w-[50px] h-[50px] border border-black/25 rounded-sm",
                index === activeIndex && "border-2 border-blue-primary"
              )}
              onClick={() => setActiveIndex(index)}
              data-testid="image-miniature-button"
            >
              <img
                src={miniature}
                alt={`Miniatura ${index + 1}`}
                className="rounded-sm max-w-full max-h-full"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const FIRST_INDEX = 0;

export default Gallery;
