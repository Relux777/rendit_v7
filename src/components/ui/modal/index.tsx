'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/svg/x.svg';
import styles from './modal.module.scss';

export default function Modal({
  children,
  className = '',
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const startY = useRef<number | null>(null);
  const currentY = useRef<number>(0);
  
  const contentHeight = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 120;
  const MAX_BLUR = 7;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.scrollbarGutter = 'stable';
      
      if (contentRef.current) contentRef.current.style.cssText = '';
      if (modalRef.current) modalRef.current.style.cssText = '';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
      
      if (contentRef.current) {
        contentRef.current.style.transform = '';
        contentRef.current.style.transition = '';
      }
      if (modalRef.current) {
        modalRef.current.style.backdropFilter = '';
        modalRef.current.style.removeProperty('-webkit-backdrop-filter');
        modalRef.current.style.transition = '';
      }
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen]);

  const handleDragStart = (clientY: number) => {
    startY.current = clientY;
    contentHeight.current = contentRef.current?.offsetHeight || window.innerHeight;

    if (contentRef.current) contentRef.current.style.transition = 'none';
    if (modalRef.current) modalRef.current.style.transition = 'none';
  };

  const handleDragMove = (clientY: number) => {
    if (startY.current === null) return;
    const deltaY = clientY - startY.current;

    if (deltaY > 0) {
      currentY.current = deltaY;
      
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      rafRef.current = requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${deltaY}px, 0)`;
        }

        const progress = Math.min(deltaY / contentHeight.current, 1);
        const currentBlur = MAX_BLUR * (1 - progress);

        if (modalRef.current) {
          modalRef.current.style.backdropFilter = `blur(${currentBlur}px)`;
          modalRef.current.style.setProperty('-webkit-backdrop-filter', `blur(${currentBlur}px)`);
        }
      });
    }
  };

  const handleDragEnd = () => {
    if (startY.current === null) return;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (currentY.current > SWIPE_THRESHOLD) {
      onClose();
    } else {
      if (contentRef.current) {
        contentRef.current.style.transition = 'transform 0.3s ease-out';
        contentRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      if (modalRef.current) {
        modalRef.current.style.transition = 'backdrop-filter 0.3s ease-out, -webkit-backdrop-filter 0.3s ease-out';
        modalRef.current.style.backdropFilter = '';
        modalRef.current.style.removeProperty('-webkit-backdrop-filter');
      }
    }

    startY.current = null;
    currentY.current = 0;
  };

  if (!mounted) return null;

  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;

  const modalVisibilityClass = isOpen ? styles.active : '';

  return createPortal(
    <div
      ref={modalRef}
      className={`${styles.modal} p-fixed flex justify-center z-20 cursor-pointer w-full visibility-hidden blur-7 inset-0 ${className} ${modalVisibilityClass}`}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className={`${styles.content} bg-3-100 cursor-auto br-20 shadow-3 scrollbar-none overflow-auto`}
        onClick={(e) => e.stopPropagation()}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onMouseMove={(e) => {
          if (startY.current !== null) handleDragMove(e.clientY);
        }}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <button 
          className={`${styles.drag} flex justify-center w-full pd-20 active_scale_09 cursor-grab active:cursor-grabbing`}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onMouseDown={(e) => handleDragStart(e.clientY)}
        >
          <span className="h-4 w-40 bg-2-50 br-36 mg-auto pointer-events-none"></span>
        </button>

        <button 
          onClick={onClose} 
          onMouseDown={(e) => e.stopPropagation()} 
          onTouchStart={(e) => e.stopPropagation()} 
          className={`${styles.close} p-absolute justify-center flex align-center w-36 h-36 t-10 r-10 br-36 active_scale_09`} 
        >
          <CloseIcon width={20} height={20} fill="#679efe" viewBox="0 0 24 24" />
        </button>

        {children}
      </div>
    </div>,
    portalRoot
  );
}