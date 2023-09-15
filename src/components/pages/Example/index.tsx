import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Brand } from '@components';
import { useTheme, useSVG, useLanguage } from '@hooks';
import { changeTheme } from '@slices/shared/appPreferences';
import { AppPreferencesState, Language } from '@slices/types/appPreferences';
import { useCopy, i18next } from '@services/copyLibrary';
import { ApplicationScreenProps } from 'types/navigation';
import { StyledScrollView } from './styles';

interface Props {
  navigation: ApplicationScreenProps;
}

const Example: React.FC<Props> = ({ navigation }) => {
  const { getCopyValue } = useCopy();
  const SVGIconExample = useSVG('QRCodeNavigator');
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const dispatch = useDispatch();
  const { switchLanguage } = useLanguage();

  const appPresentation = (): void => {
    Alert.alert(
      getCopyValue('example:helloUser' as string, {
        name: process.env.APP_NAME,
      }),
    );
  };

  const onChangeTheme = ({
    theme,
    darkMode,
  }: Partial<AppPreferencesState>): any => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (languageParam: Language): void => {
    switchLanguage(languageParam);
  };

  return (
    <StyledScrollView
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.colCenter,
        Layout.scrollSpaceBetween,
      ]}
    >
      <View
        style={[
          Layout.fill,
          Layout.relative,
          Layout.fullWidth,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}
      >
        <View
          style={[
            Layout.absolute,
            {
              height: 250,
              width: 250,
              backgroundColor: isDark ? '#000000' : '#DFDFDF',
              borderRadius: 140,
            },
          ]}
        />
        <Image
          style={[
            Layout.absolute,
            {
              bottom: '-30%',
              left: 0,
            },
          ]}
          source={Images.sparkles.bottomLeft}
          resizeMode={'contain'}
        />
        <View
          style={[
            Layout.absolute,
            {
              height: 300,
              width: 300,
              transform: [{ translateY: 40 }],
            },
          ]}
        >
          <Brand height={300} width={300} />
        </View>
        <Image
          style={[
            Layout.absolute,
            Layout.fill,
            {
              top: 0,
              left: 0,
            },
          ]}
          source={Images.sparkles.topLeft}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '-5%',
              right: 0,
            },
          ]}
          source={Images.sparkles.top}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '15%',
              right: 20,
            },
          ]}
          source={Images.sparkles.topRight}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              bottom: '-10%',
              right: 0,
            },
          ]}
          source={Images.sparkles.right}
          resizeMode={'contain'}
        />

        <Image
          style={[
            Layout.absolute,
            {
              top: '75%',
              right: 0,
            },
          ]}
          source={Images.sparkles.bottom}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '60%',
              right: 0,
            },
          ]}
          source={Images.sparkles.bottomRight}
          resizeMode={'contain'}
        />
      </View>
      <View
        style={[
          Layout.fill,
          Layout.justifyContentBetween,
          Layout.alignItemsStart,
          Layout.fullWidth,
          Gutters.regularHPadding,
        ]}
      >
        <View>
          <Text style={[Fonts.titleRegular]}>
            {getCopyValue('welcome:title')}
          </Text>
          <Text
            style={[Fonts.textBold, Fonts.textRegular, Gutters.regularBMargin]}
          >
            {getCopyValue('welcome:subtitle')}
          </Text>
          <Text style={[Fonts.textSmall, Fonts.textLight]}>
            {getCopyValue('welcome:description')}
          </Text>
        </View>

        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Layout.fullWidth,
            Gutters.smallTMargin,
          ]}
        >
          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => appPresentation()}
          >
            <Image
              source={Images.icons.send}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => navigation.navigate('WarningScreen')}
          >
            <SVGIconExample />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => onChangeTheme({ darkMode: !isDark })}
          >
            <Image
              source={Images.icons.colors}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() =>
              onChangeLanguage(i18next.language === 'es' ? 'en' : 'es')
            }
          >
            <Image
              source={Images.icons.translate}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </StyledScrollView>
  );
};

export { Example };
export default Example;
