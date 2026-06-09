'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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
  const mouseCleanupRef = useRef<(() => void) | null>(null);

  const SWIPE_THRESHOLD = 120; // полный сброс
  const DRAG_START_THRESHOLD = 5; // минимальное движение для начала захвата (в px)
  const MAX_BLUR = 7;

  useEffect(() => {
    setMounted(true);
    return () => {
      mouseCleanupRef.current?.();
    };
  }, []);

  const resetStyles = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (contentRef.current) {
      contentRef.current.style.transform = '';
      contentRef.current.style.transition = '';
    }
    if (modalRef.current) {
      modalRef.current.style.backdropFilter = '';
      modalRef.current.style.removeProperty('-webkit-backdrop-filter');
      modalRef.current.style.transition = '';
    }
  }, []);

  // Центральный обработчик перемещения
  const handleDragMove = useCallback(
    (clientY: number, e?: Event) => {
      if (startY.current === null) return;
      const deltaY = clientY - startY.current;

      if (deltaY > DRAG_START_THRESHOLD) {
        // Захватываем управление только когда смещение превысило порог
        if (e && e.cancelable) {
          e.preventDefault();
        }
      } else {
        // Не мешаем стандартному поведению (скролл, клик)
        return;
      }

      // Двигаем только вниз
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
            modalRef.current.style.setProperty(
              '-webkit-backdrop-filter',
              `blur(${currentBlur}px)`
            );
          }
        });
      }
    },
    [DRAG_START_THRESHOLD]
  );

  const handleDragEnd = useCallback(() => {
    if (startY.current === null) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    mouseCleanupRef.current?.();
    mouseCleanupRef.current = null;

    if (currentY.current > SWIPE_THRESHOLD) {
      resetStyles();
      onClose();
    } else {
      // Возвращаем на место
      if (contentRef.current) {
        contentRef.current.style.transition = 'transform 0.3s ease-out';
        contentRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      if (modalRef.current) {
        modalRef.current.style.transition =
          'backdrop-filter 0.3s ease-out, -webkit-backdrop-filter 0.3s ease-out';
        modalRef.current.style.backdropFilter = '';
        modalRef.current.style.removeProperty('-webkit-backdrop-filter');
      }
    }

    startY.current = null;
    currentY.current = 0;
  }, [onClose, resetStyles]);

  // Запуск драга – больше НЕ вызывает preventDefault здесь
  const handleDragStart = useCallback(
    (clientY: number, e: TouchEvent | React.MouseEvent) => {
      // Для touchstart не блокируем стандартное поведение, иначе сломается тап
      startY.current = clientY;
      contentHeight.current =
        contentRef.current?.offsetHeight || window.innerHeight;

      if (contentRef.current) contentRef.current.style.transition = 'none';
      if (modalRef.current) modalRef.current.style.transition = 'none';

      if (e.type === 'mousedown') {
        const onMouseMove = (ev: MouseEvent) => handleDragMove(ev.clientY, ev);
        const onMouseUp = () => handleDragEnd();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        mouseCleanupRef.current = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };
      }
    },
    [handleDragMove, handleDragEnd]
  );

  // Навешиваем нативные не-пассивные обработчики
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const content = contentRef.current;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';
    resetStyles();

    const onTouchStart = (e: TouchEvent) => {
      handleDragStart(e.touches[0].clientY, e);
    };
    const onTouchMove = (e: TouchEvent) => {
      handleDragMove(e.touches[0].clientY, e);
    };
    const onTouchEnd = () => {
      handleDragEnd();
    };

    content.addEventListener('touchstart', onTouchStart, { passive: false });
    content.addEventListener('touchmove', onTouchMove, { passive: false });
    content.addEventListener('touchend', onTouchEnd);

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.scrollbarGutter = '';
      resetStyles();
      content.removeEventListener('touchstart', onTouchStart);
      content.removeEventListener('touchmove', onTouchMove);
      content.removeEventListener('touchend', onTouchEnd);
      mouseCleanupRef.current?.();
    };
  }, [isOpen, handleDragStart, handleDragMove, handleDragEnd, resetStyles]);

  if (!mounted) return null;

  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;

  const modalVisibilityClass = isOpen ? styles.active : '';

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      className={`${styles.modal} p-fixed flex justify-center z-20 cursor-pointer w-full visibility-hidden blur-7 inset-0 ${className} ${modalVisibilityClass}`}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className={`${styles.content} bg-3-100 cursor-auto br-20 shadow-3 scrollbar-none overflow-auto`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => handleDragStart(e.clientY, e)}
      >
        {/* Драг-ручка только для мыши, touch обрабатывается на content */}
        <button
          className={`${styles.drag} flex justify-center w-full pd-20 active_scale_09 cursor-grab active:cursor-grabbing`}
          style={{ touchAction: 'none' }}
          onMouseDown={(e) => handleDragStart(e.clientY, e)}
        >
          <span className="h-4 w-40 bg-2-50 br-36 mg-auto pointer-events-none"></span>
        </button>

        <button
          onClick={onClose}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className={`${styles.close} p-absolute justify-center flex align-center w-36 h-36 t-10 r-10 br-36 active_scale_09`}
          aria-label="Закрыть"
        >
          <CloseIcon width={20} height={20} fill="#679efe" viewBox="0 0 24 24" />
        </button>

        {children}
      </div>
    </div>,
    portalRoot
  );
}