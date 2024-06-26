/* eslint-disable react/require-default-props */
import React, { memo, useCallback, useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { StyledAnimatedContainer } from './styles';

interface Props {
  testID?: string;
  trigger?: any;
  children?: string | React.ReactElement | React.ReactElement[];
  duration?: number;
  initialValue?: number;
  finalValue?: number;
  delay?: number;
  repeat?: number;
  reverse?: boolean;
  easing?: typeof Easing | string | unknown;
}

export const OpacityAnimation: React.FC<Props> = ({
  testID = 'OpacityAnimationID',
  trigger = true,
  children = undefined,
  duration = 2000,
  initialValue = 0,
  finalValue = 1,
  delay = 0,
  repeat = 1,
  reverse = false,
  easing = 'linear',
}) => {
  const opacity = useSharedValue(initialValue);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value ?? 1,
    };
  }, [opacity.value]);

  const triggerAnimate = useCallback((): void => {
    if (trigger && (initialValue || finalValue)) {
      opacity.value = withDelay(
        delay ?? 0,
        withRepeat(
          withTiming(finalValue ?? 0, {
            duration: duration ?? 2000,
            easing: easing ? Easing[easing] : Easing.inOut(Easing.quad),
          }),
          repeat ?? 1,
          reverse ?? false,
        ),
      );
    }
  }, [
    trigger,
    duration,
    initialValue,
    finalValue,
    delay,
    repeat,
    reverse,
    opacity.value,
  ]);

  useEffect(() => {
    const cleanup = () => {
      cancelAnimation(opacity);
      opacity.value = initialValue;
    };

    if (typeof trigger === 'boolean') {
      if (trigger) {
        triggerAnimate();
      } else {
        cleanup();
      }
    } else {
      triggerAnimate();
    }
    return () => {
      cleanup();
    };
  }, [opacity, trigger]);

  return (
    <StyledAnimatedContainer testID={testID} style={[animatedStyles]}>
      {children && children}
    </StyledAnimatedContainer>
  );
};

export default memo(OpacityAnimation);
