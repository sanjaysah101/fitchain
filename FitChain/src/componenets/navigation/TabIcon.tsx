import React, { memo, useCallback, useMemo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LAYOUT, ANIMATION } from '../../constants/theme';
import { TabIconProps } from '../../types/navigation';
import { FootprintIcon, SettingsIcon, InfoIcon } from '../icons/TabIcons';

const { TAB_WIDTH } = LAYOUT;

const TabIcon: React.FC<TabIconProps> = memo(({ color, focused, icon, label }) => {
  const scaleValue = useMemo(() => new Animated.Value(1), []);
  const opacity = useMemo(() => new Animated.Value(ANIMATION.OPACITY_INACTIVE), []);

  React.useEffect(() => {
    const animations = [
      Animated.spring(scaleValue, {
        toValue: focused ? ANIMATION.SCALE_ACTIVE : ANIMATION.SCALE_INACTIVE,
        friction: ANIMATION.FRICTION,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: focused ? ANIMATION.OPACITY_ACTIVE : ANIMATION.OPACITY_INACTIVE,
        duration: ANIMATION.DURATION,
        useNativeDriver: true,
      }),
    ];

    Animated.parallel(animations).start();

    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [focused, scaleValue, opacity]);

  const renderIcon = useCallback(() => {
    switch (icon) {
      case 'footprint':
        return <FootprintIcon color={color} />;
      case 'settings':
        return <SettingsIcon color={color} />;
      case 'info':
        return <InfoIcon color={color} />;
      default:
        return null;
    }
  }, [icon, color]);

  const animatedStyle = useMemo(() => ({
    transform: [{ scale: scaleValue }],
    opacity,
  }), [scaleValue, opacity]);

  return (
    <View style={[styles.tabItemContainer, { width: TAB_WIDTH }]}>
      <Animated.View style={[styles.iconWrapper, animatedStyle]}>
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        <Animated.Text
          style={[
            styles.tabLabel,
            { color },
            {
              opacity,
              transform: [{ scale: focused ? 1.1 : 1 }],
            },
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: LAYOUT.TAB_BAR_HEIGHT - (Platform.OS === 'ios' ? 25 : 10),
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 0,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 0,
    letterSpacing: 0.2,
  },
});

export default TabIcon; 