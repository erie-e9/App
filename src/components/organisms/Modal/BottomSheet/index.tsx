import React, {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ModalPayload } from '@slices/types/modal';
import { screen_height } from '@utils/functions';
import { useNativeActions, useLanguage } from '@hooks';
import { hideModal } from '@slices/shared/modal';
import { CloseButton } from '@components/molecules';
import ModalHeader from '@components/organisms/Modal/ModalHeader';
import ModalItem from '@components/organisms/Modal/ModalItem';
import AnimatedBackground from '@components/organisms/Modal/AnimatedBackground';
import {
  AnimatedBottomSheet,
  CloseIconContainer,
  PanGestureHandlerView,
  CloseBottomSheetButton,
  BodyContainer,
  StyledList,
} from './styles';

const MAX_TRANSLATE_Y = -screen_height + 80;

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

export const BottomSheet = React.forwardRef<BottomSheetRefProps, ModalPayload>(
  (
    {
      title,
      description,
      isVisible,
      testID,
      showCancelIcon,
      body,
      list,
      loading,
      drawerOptions,
    },
    ref,
  ) => {
    const dispatch = useDispatch();
    const { switchLanguage } = useLanguage();
    const { useNativeBackButton } = useNativeActions();
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, {
        stiffness: 200,
        damping: 25,
      });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const handleClose = useCallback(async () => {
      scrollTo(100);
      setTimeout(() => {
        dispatch(hideModal());
      }, 500);
    }, [translateY.value]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate(event => {
        if (list) {
          translateY.value = event.translationY + context.value.y;
          translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        }
      })
      .onEnd(() => {
        if (translateY.value > -screen_height / 5) {
          runOnJS(handleClose)();
        } else if (translateY.value < -screen_height / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const bottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    useNativeBackButton({ callback: handleClose });

    const bottomSheetSizeHandler = () => {
      if (!active.value) {
        scrollTo(
          drawerOptions?.height ? -drawerOptions?.height : -screen_height / 3,
        );
      }
      if (active.value && translateY.value < -screen_height / 3) {
        scrollTo(-screen_height / 3);
      }
      if (list && active.value && translateY.value >= -screen_height / 3) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    };

    useEffect(() => {
      if (isVisible) {
        bottomSheetSizeHandler();
      }
    }, [isVisible]);

    const onPressHandler = ({ item }: any) => {
      if (list?.onPressItem) list?.onPressItem();
      if (list?.predefinedList === 'languages') switchLanguage(item);
      handleClose();
    };

    return (
      <>
        <AnimatedBackground onTouch={handleClose} isActive={!active.value} />
        <GestureDetector gesture={gesture}>
          <AnimatedBottomSheet testID={testID} style={[bottomSheetStyle]}>
            <CloseBottomSheetButton onPress={bottomSheetSizeHandler}>
              <PanGestureHandlerView />
            </CloseBottomSheetButton>
            {!showCancelIcon && (
              <CloseIconContainer>
                <CloseButton onPress={handleClose} />
              </CloseIconContainer>
            )}
            <ModalHeader title={title} description={description || ''} />
            {body && (
              <BodyContainer height={drawerOptions?.height || 30}>
                {body}
              </BodyContainer>
            )}
            {loading ? (
              <ActivityIndicator size={25} />
            ) : (
              list && (
                <StyledList
                  data={list.data || []}
                  renderItem={({ item }) => (
                    <ModalItem
                      item={item}
                      predefinedList={list.predefinedList}
                      onPress={() => onPressHandler({ item })}
                    />
                  )}
                />
              )
            )}
          </AnimatedBottomSheet>
        </GestureDetector>
      </>
    );
  },
);

BottomSheet.defaultProps = {
  testID: 'BottomSheetID',
  title: undefined,
  description: undefined,
  body: undefined,
  showCancelIcon: false,
  titleColor: undefined,
  isVisible: false,
  loading: false,
};

export default memo(BottomSheet);
