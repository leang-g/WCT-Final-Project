import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 2, className = '' }) {
  const numericVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;
  const isNegative = numericVal < 0;
  const absVal = Math.abs(numericVal);
  
  const spring = useSpring(absVal, {
    stiffness: 75,
    damping: 18,
    mass: 0.6
  });

  const [displayVal, setDisplayVal] = useState(() => 
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(absVal)
  );

  useEffect(() => {
    spring.set(absVal);
  }, [absVal, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayVal(
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }).format(Math.abs(latest))
      );
    });
    return () => unsubscribe();
  }, [spring, decimals]);

  // Adjust sign prefix cleanly
  let finalPrefix = prefix;
  if (isNegative && !prefix.includes('-')) {
    finalPrefix = `-${prefix}`;
  }

  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {finalPrefix}{displayVal}{suffix}
    </span>
  );
}
