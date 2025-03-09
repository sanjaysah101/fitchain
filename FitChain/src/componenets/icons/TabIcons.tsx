import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { LAYOUT } from '../../constants/theme';

const { ICON_SIZE } = LAYOUT;

interface IconProps {
  color: string;
}

export const FootprintIcon = memo(({ color }: IconProps) => (
  <View style={styles.iconBase}>
    <View style={[styles.stepCircle, { borderColor: color }]}>
      <View style={[styles.stepArrow, { borderColor: color }]} />
      <View style={[styles.stepLine, { backgroundColor: color }]} />
    </View>
  </View>
));

export const SettingsIcon = memo(({ color }: IconProps) => (
  <View style={styles.iconBase}>
    <View style={[styles.settingsOuter, { borderColor: color }]} />
    <View style={[styles.settingsInner, { borderColor: color }]} />
    <View style={[styles.settingsDot, { backgroundColor: color }]} />
  </View>
));

export const InfoIcon = memo(({ color }: IconProps) => (
  <View style={styles.iconBase}>
    <View style={[styles.infoCircle, { borderColor: color }]}>
      <View style={[styles.infoDot, { backgroundColor: color }]} />
      <View style={[styles.infoLine, { backgroundColor: color }]} />
    </View>
  </View>
));

const styles = StyleSheet.create({
  iconBase: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Step counter icon styles
  stepCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepArrow: {
    width: ICON_SIZE * 0.4,
    height: ICON_SIZE * 0.4,
    borderRightWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: '45deg' }, { translateY: ICON_SIZE * 0.1 }],
  },
  stepLine: {
    position: 'absolute',
    width: 2,
    height: ICON_SIZE * 0.5,
    transform: [{ translateY: -ICON_SIZE * 0.1 }],
  },
  // Settings icon styles
  settingsOuter: {
    position: 'absolute',
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
  },
  settingsInner: {
    position: 'absolute',
    width: ICON_SIZE * 0.6,
    height: ICON_SIZE * 0.6,
    borderRadius: (ICON_SIZE * 0.6) / 2,
    borderWidth: 2,
    left: ICON_SIZE * 0.2,
    top: ICON_SIZE * 0.2,
  },
  settingsDot: {
    width: ICON_SIZE * 0.15,
    height: ICON_SIZE * 0.15,
    borderRadius: ICON_SIZE * 0.075,
    position: 'absolute',
    left: ICON_SIZE * 0.425,
    top: ICON_SIZE * 0.425,
  },
  // Info icon styles
  infoCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
  },
  infoDot: {
    width: ICON_SIZE * 0.15,
    height: ICON_SIZE * 0.15,
    borderRadius: ICON_SIZE * 0.075,
    marginTop: ICON_SIZE * 0.15,
  },
  infoLine: {
    width: 2,
    height: ICON_SIZE * 0.4,
    marginTop: ICON_SIZE * 0.1,
  },
}); 