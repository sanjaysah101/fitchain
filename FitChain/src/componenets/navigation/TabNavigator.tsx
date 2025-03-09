import React, { memo, useMemo } from 'react';

import { Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, LAYOUT, SHADOW } from '../../constants/theme';
import { TabParamList } from '../../types/navigation';
import TabIcon from './TabIcon';

// Import screens
import StepCounter from '../../screens/StepCounter';
import Settings from '../../screens/Settings';
import AboutScreen from '../../screens/AboutScreen';
import { HomeScreen } from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = memo(() => {
  const tabBarStyle = useMemo(() => ({
    backgroundColor: COLORS.WHITE,
    borderTopWidth: 0,
    ...SHADOW.LIGHT,
    height: LAYOUT.TAB_BAR_HEIGHT,
    paddingBottom: Platform.OS === 'ios' ? 15 : 8,
    paddingTop: 8,
    position: 'absolute' as const,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: LAYOUT.TAB_BAR_WIDTH,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 999,
  }), []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.INACTIVE,
        tabBarStyle,
        headerShown: false,
      }}
    >
       <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color} 
              focused={focused} 
              icon="footprint" 
              label="Steps"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="StepCounter" 
        component={StepCounter} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color} 
              focused={focused} 
              icon="footprint" 
              label="Steps"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color} 
              focused={focused} 
              icon="settings" 
              label="Settings"
            />
          ),
        }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              color={color} 
              focused={focused} 
              icon="info" 
              label="About"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

export default TabNavigator; 