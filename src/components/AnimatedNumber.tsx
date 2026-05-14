import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface Props {
  value: number;
  format?: (n: number) => string;
  className?: string;
}

const czk = new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });

export function AnimatedNumber({ value, format = (n) => czk.format(n), className }: Props) {
  const spring = useSpring(value, { stiffness: 90, damping: 22 });
  const display = useTransform(spring, (v) => format(Math.round(v)));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
}
