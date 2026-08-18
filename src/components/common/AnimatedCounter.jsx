import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 2, className = '' }) {
  const numericVal = typeof value === 'number' && !isNaN(value) 
    ? value 
    : (parseFloat(String(value || '0').replace(/[^0-9.-]+/g, '')) || 0);
  
  const isNegative = numericVal < 0;
  const absTarget = Math.abs(numericVal);

  const [currentVal, setCurrentVal] = useState(absTarget);
  const prevValRef = useRef(absTarget);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const startVal = prevValRef.current;
    const endVal = absTarget;
    const duration = 650; // ms
    const startTime = performance.now();

    if (startVal === endVal) {
      setCurrentVal(endVal);
      return;
    }

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth cubic-out easing
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const nextVal = startVal + (endVal - startVal) * easeOut;

      setCurrentVal(nextVal);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        prevValRef.current = endVal;
        setCurrentVal(endVal);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [absTarget]);

  const formattedVal = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(currentVal);

  // Safely adjust sign prefix
  let finalPrefix = prefix;
  if (isNegative && !prefix.includes('-')) {
    finalPrefix = `-${prefix}`;
  }

  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {finalPrefix}{formattedVal}{suffix}
    </span>
  );
}
