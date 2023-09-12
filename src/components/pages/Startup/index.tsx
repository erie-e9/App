import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme, useDeviceSecurity } from '@hooks';
import { Brand } from '@components';
import { setDefaultTheme } from '@slices/shared/appPreferences';
import { ApplicationScreenProps } from 'types/navigation';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();
  const { checkPhoneIntegrity } = useDeviceSecurity();
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    await checkPhoneIntegrity({
      callback: () =>
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        }),
      fallback: () => navigation.replace('WarningScreen'),
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export { Startup };
