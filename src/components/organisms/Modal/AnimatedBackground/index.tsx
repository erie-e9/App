import React, { ReactElement, memo } from 'react';
import {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedBackgroundContainer } from './styles';

export interface AnimatedBackgroundProps {
  isActive: boolean | undefined;
  children?: ReactElement | React.ReactNode;
  onTouch?: () => void;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  isActive,
  children,
  onTouch,
}) => {
  const backgroundAnimted = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isActive ? 1 : 0, {
        duration: 200,
      }),
    };
  });

  const backdropProps = useAnimatedProps(() => {
    return {
      pointerEvents: isActive ? 'auto' : 'none',
    } as any;
  }, []);

  return (
    <AnimatedBackgroundContainer
      onTouchStart={onTouch}
      animatedProps={backdropProps}
      style={backgroundAnimted}
    >
      {children && children}
    </AnimatedBackgroundContainer>
  );
};

AnimatedBackground.defaultProps = {
  children: undefined,
  onTouch: () => null,
};

export default memo(AnimatedBackground);
