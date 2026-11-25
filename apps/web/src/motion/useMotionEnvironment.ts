import { useContext } from 'react';
import { MotionContext, type MotionEnvironment } from './MotionProvider';

export function useMotionEnvironment(): MotionEnvironment {
  return useContext(MotionContext);
}
