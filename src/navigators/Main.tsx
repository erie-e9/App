import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStackParamList } from '@utils/@types/navigation';
import { ExampleScreen } from '@components/screens';

const { Navigator, Screen } = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={ExampleScreen} />
    </Navigator>
  );
};

export default memo(MainNavigator);
