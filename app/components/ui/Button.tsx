import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({
  title,
  variant = 'primary',
  style,
  disabled,
  ...props
}: ButtonProps) {
  const backgroundColor = useThemeColor(
    {
      light: variant === 'primary' ? '#0a7ea4' : '#e0e0e0',
      dark: variant === 'primary' ? '#1D3D47' : '#353636',
    },
    'background'
  );

  const textColor = useThemeColor(
    {
      light: variant === 'primary' ? '#ffffff' : '#000000',
      dark: variant === 'primary' ? '#ffffff' : '#ffffff',
    },
    'text'
  );

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
