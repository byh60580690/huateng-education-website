import { useEffect, useRef, useState } from 'react';

/**
 * 自定义 Hook：使用 IntersectionObserver 实现元素进入视口时的淡入/滑动进入动画
 * @param threshold - 元素可见比例阈值，默认 0.15
 * @returns { ref, className } - ref 绑定到目标元素，className 用于控制动画
 */
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const className = isVisible ? 'scroll-hidden scroll-visible' : 'scroll-hidden';

  return { ref, className };
}
