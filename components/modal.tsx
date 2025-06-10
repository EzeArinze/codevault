"use client";

import {
  // useEffect
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === "Escape") {
  //     onClose();
  //   }
  // };

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleOutsideClick}
      // onKeyUp={handleKeyDown}
    >
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-3xl max-h-[70vh] overflow-auto rounded-lg bg-background p-6 shadow-lg",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          <XIcon className="w-4 h-4" />
        </button>
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold">
                {title}
              </h2>
            )}
            {description && (
              <p
                id="modal-description"
                className="text-sm text-muted-foreground"
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
