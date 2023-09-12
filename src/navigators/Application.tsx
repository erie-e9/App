import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from '@components/pages/Startup';
import { useTheme } from '@hooks';
import MainNavigator from './Main';
import { darkTheme, lightTheme } from '@theme/themesi';
import { useFlipper } from '@react-navigation/devtools';
import { StyledSafeAreaView } from '@components/atoms';
import { ApplicationStackParamList } from 'types/navigation';
import { WarningScreen } from '@components/pages/Shared/WarningScreen';
import { useCheckNet } from '@hooks/useCheckNet';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  const { darkMode, NavigationTheme } = useTheme();
  const { appConnected } = useCheckNet();

  const theme = (): DefaultTheme => {
    if (darkMode) {
      return darkTheme;
    }
    return lightTheme;
  };

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    console.log('check connection', {
      isConnected: appConnected.isConnected,
      type: appConnected.type,
      isInternetReachable: appConnected.isInternetReachable,
    });
  }, [appConnected.isConnected, appConnected.type]);

  useFlipper(navigationRef);

  return (
    <ThemeProvider theme={theme}>
      <StyledSafeAreaView>
        <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
          <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
          <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Startup" component={Startup} />
            <Screen name="Main" component={MainNavigator} />
            <Screen name="WarningScreen" component={WarningScreen} />
          </Navigator>
        </NavigationContainer>
      </StyledSafeAreaView>
    </ThemeProvider>
  );
};

export default ApplicationNavigator;
