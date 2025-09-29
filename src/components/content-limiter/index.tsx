"use client";

import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import { IconArrowDown } from "../icons/arrow-down";

type Props = {
  label: string;
  className?: string;
  maxHeight?: number;
};

const ContentLimiter = ({
  children,
  className,
  maxHeight = 400,
  label,
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames("relative", className)}>
      <div
        style={!isOpen ? { maxHeight } : undefined}
        className={classNames(!isOpen && `overflow-hidden`)}
      >
        {children}
      </div>

      {!isOpen && (
        <div className="w-full absolute left-0 bottom-0">
          <div className="flex w-full bg-linear-to-t from-white to-white/10 h-[40px] items-end">
            <button
              className="text-blue-primary text-sm gap flex items-center"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              <span>Ver {label} completos</span>
              <IconArrowDown width={20} height={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentLimiter;
