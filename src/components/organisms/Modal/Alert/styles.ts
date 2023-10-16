import { PixelRatio, Platform, ViewStyle } from 'react-native';
import styled, { css } from 'styled-components/native';
import {
  SCREEN_WIDTH,
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { ActionButton, Typography } from '@components/atoms';

export const MODAL_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
};

export const StyledModal = styled.Modal``;

export const ModalBodyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.View<{ width?: number }>`
  height: auto;
  width: ${({ width }) => width || SCREEN_WIDTH - 30 + 'px'};
  z-index: 100;
  border-radius: ${getNormalizedHorizontalSize(15)}px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 10px;
  elevation: 5;
  background-color: ${({ theme: { tokens, mode } }) =>
    mode === 'dark' ? tokens.colors.none : tokens.colors.none};
  shadow-offset: ${getNormalizedVerticalSize(1)}px
    ${getNormalizedHorizontalSize(1)}px;
`;

export const HeaderContainer = styled.View<{ paddingBottom?: number }>`
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  padding: ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(30)}px ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(30)}px;
`;

export const CloseIconContainer = styled.View`
  height: ${getNormalizedVerticalSize(30)}px;
  width: ${getNormalizedHorizontalSize(30)}px;
  padding: ${getNormalizedVerticalSize(10)}px
    ${getNormalizedHorizontalSize(0)}px ${getNormalizedVerticalSize(0)}px
    ${getNormalizedHorizontalSize(0)}px;
  z-index: 2;
`;

export const ActionsWrapper = styled.View`
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
  margin-top: ${getNormalizedVerticalSize(10)}px;
`;

export interface StyledButtonProps {
  minWidth?: number;
}

export const StyledButton = styled(ActionButton)<StyledButtonProps>`
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(3)}px
    ${getNormalizedVerticalSize(15)}px ${getNormalizedHorizontalSize(3)}px;
  align-self: center;
  border: ${({ theme: { colors } }) => colors.opposing};
  color: ${({ theme }) =>
    theme.mode === 'dark' ? theme.tokens.colors.surfaceL5 : '#67686b'};
  ${({ minWidth }) =>
    minWidth &&
    css`
      min-width: ${getNormalizedHorizontalSize(minWidth)};
    `}
`;

export const TextButtonItem = styled(Typography)<{
  isSimpleButton?: boolean;
}>`
  margin-top: ${({ isSimpleButton }) =>
    getNormalizedVerticalSize(isSimpleButton ? 20 : 0)}px;
  ${({ isSimpleButton, theme }) => {
    const colorByTheme =
      theme.mode === 'dark'
        ? `color: ${theme.tokens.colors.darkBlueL3}`
        : `color: ${theme.tokens.colors.darkBlueD2}`;
    return isSimpleButton ? colorByTheme : undefined;
  }}
`;

export const TypographyStyled = styled(Typography)<{
  lineHeight?: number;
  fontSize?: number;
}>`
  text-align: center;
  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight}px;
    `}
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}
`;

export const StyledActionButton = styled(ActionButton)<{
  mainBtn: boolean;
  backgroundForMainBtn?: string;
  elevation?: string;
}>`
  width: 100%;
  height: ${PixelRatio.roundToNearestPixel(48)}px;
  margin: ${getNormalizedVerticalSize(10)}px ${getNormalizedHorizontalSize(0)}px;
  text-transform: uppercase;
  border-color: ${({ mainBtn }) => (mainBtn ? '#5b707b' : 'transparent')};
  border-width: ${({ mainBtn }) => (mainBtn ? '1px' : '0px')};
  ${({ elevation }) =>
    elevation &&
    css`
      elevation: ${elevation};
    `}
`;
