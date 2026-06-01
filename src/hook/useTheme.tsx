"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();
  // Состояние монтирования
  const [mounted, setMounted] = useState(false);

  // Ждем, пока компонент смонтируется на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Удобный хелпер для проверки текущей темы
  const isDark = mounted && (theme === "dark" || (theme === "system" && systemTheme === "dark"));

  return {
    // Если клиент еще не загрузился, отдаем undefined, чтобы не рендерить неверный UI
    theme: mounted ? theme : undefined,
    setTheme,
    systemTheme,
    isDark,
    mounted,
  };
};