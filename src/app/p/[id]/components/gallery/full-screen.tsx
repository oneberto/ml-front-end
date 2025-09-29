"use client";

import { IconArrowLeft } from "@/components/icons/arrow-left";
import { IconArrowRight } from "@/components/icons/arrow-right";
import { IconClose } from "@/components/icons/close";
import { IconZoomIn } from "@/components/icons/zoom-in";
import { IconZoomOut } from "@/components/icons/zoom-out";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  imageUrl: string;
  currentPosition: number;
  totalItems: number;
  onClose(): void;
  onNext(): void;
  onPrevious(): void;
};

const FullScreen = ({
  imageUrl,
  onClose,
  onNext,
  onPrevious,
  currentPosition,
  totalItems,
}: Props) => {
  const [scale, setScale] = useState(100);

  useEffect(() => {
    if (!document.body) {
      return;
    }

    document.body.style = "overflow: hidden;";

    return () => {
      document.body.style = "overflow: auto;";
    };
  }, []);

  return createPortal(
    <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center overflow-hidden">
      <div
        data-testid="overlay"
        className="bg-red-transparent top-0 left-0 w-full h-full absolute"
        onClick={onClose}
      ></div>

      <img
        data-testid="full-image"
        src={imageUrl}
        role="img"
        alt="Imagem cheia"
        className="w-auto max-w-full absolute"
        style={{
          scale: `${scale}%`,
        }}
      />

      <span
        data-testid="progress"
        className="bg-black/25 text-white absolute top-[40px] left-[45px] p-1 rounded-xl px-2.5"
      >
        {currentPosition}/{totalItems}
      </span>

      <button
        data-testid="close"
        className="bg-black/25 text-white absolute top-[40px] right-[40px] p-1"
        type="button"
        onClick={onClose}
      >
        <IconClose width={30} height={30} />
      </button>

      <button
        data-testid="prev"
        className="bg-black/25 text-white absolute p-2 left-[20px] xl:left-[40px]"
        type="button"
        onClick={onPrevious}
      >
        <IconArrowLeft width={40} height={40} />
      </button>

      <button
        data-testid="next"
        className="bg-black/25 text-white absolute p-2 right-[20px] xl:right-[40px]"
        type="button"
        onClick={onNext}
      >
        <IconArrowRight width={40} height={40} />
      </button>

      <button
        data-testid="zoom-in"
        className="bg-black/25 text-white absolute p-2 bottom-[40px] mr-[60px]"
        type="button"
        onClick={() => setScale((scale) => scale + SCALE_STEP)}
      >
        <IconZoomIn width={40} height={40} />
      </button>

      <button
        data-testid="zoom-out"
        className="bg-black/25 text-white absolute p-2 bottom-[40px] mr-[-60px]"
        type="button"
        onClick={() => setScale((scale) => scale - SCALE_STEP)}
      >
        <IconZoomOut width={40} height={40} />
      </button>
    </div>,
    document.body
  );
};

const SCALE_STEP = 15;

export default FullScreen;
