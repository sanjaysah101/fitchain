import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
  PRIMARY: '#4CAF50',
  INACTIVE: '#9E9E9E',
  WHITE: '#ffffff',
  SHADOW: '#000000',
  BACKGROUND_LIGHT: '#ffffff',
  BACKGROUND_DARK: '#000000',
};

export const LAYOUT = {
  TAB_BAR_WIDTH: width,
  TAB_WIDTH: width / 3,
  TAB_BAR_HEIGHT: Platform.OS === 'ios' ? 90 : 75,
  ICON_SIZE: 24,
};

export const ANIMATION = {
  SCALE_ACTIVE: 1.2,
  SCALE_INACTIVE: 1,
  OPACITY_ACTIVE: 1,
  OPACITY_INACTIVE: 0.8,
  DURATION: 250,
  FRICTION: 5,
};

export const SHADOW = {
  LIGHT: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 8,
  },
}; 