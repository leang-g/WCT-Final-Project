import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 2, className = '' }) {
  const numericVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;
  
  const spring = useSpring(numericVal, {
    stiffness: 75,
    damping: 18,
    mass: 0.6
  });

  const [displayVal, setDisplayVal] = useState(() => 
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(numericVal)
  );

  useEffect(() => {
    spring.set(numericVal);
  }, [numericVal, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayVal(
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }).format(latest)
      );
    });
    return () => unsubscribe();
  }, [spring, decimals]);

  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {prefix}{displayVal}{suffix}
    </span>
  );
}
