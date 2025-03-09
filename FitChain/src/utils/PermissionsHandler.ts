import { Platform, Alert } from 'react-native';

// Mock implementation for when react-native-permissions is not available
const mockPermissions = {
  check: () => Promise.resolve('granted'),
  request: () => Promise.resolve('granted'),
  PERMISSIONS: {
    ANDROID: {
      ACTIVITY_RECOGNITION: 'android.permission.ACTIVITY_RECOGNITION',
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
    IOS: {
      MOTION: 'ios.permission.MOTION',
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
  },
};

// Try to import react-native-permissions, fall back to mock if not available
let check;
let request;
let PERMISSIONS;
let RESULTS;
let Permission;

try {
  const permissions = require('react-native-permissions');
  check = permissions.check;
  request = permissions.request;
  PERMISSIONS = permissions.PERMISSIONS;
  RESULTS = permissions.RESULTS;
  Permission = permissions.Permission;
} catch (error) {
  console.warn('react-native-permissions not available, using mock implementation');
  check = mockPermissions.check;
  request = mockPermissions.request;
  PERMISSIONS = mockPermissions.PERMISSIONS;
  RESULTS = mockPermissions.RESULTS;
  Permission = String;
}

export const checkStepCounterPermissions = async () => {
  try {
    let permissionStatus;
    let permission;

    if (Platform.OS === 'android') {
      // For Android 10+ (API level 29+)
      permission = PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.MOTION;
    } else {
      return false; // Unsupported platform
    }

    permissionStatus = await check(permission);
    return permissionStatus === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking permissions:', error);
    // In case of error, assume permission is granted to allow the app to function
    Alert.alert(
      'Permission Check Error',
      'Unable to check permissions. Some features may not work correctly.',
      [{ text: 'OK' }]
    );
    return true;
  }
};

export const requestStepCounterPermissions = async () => {
  try {
    let permissionStatus;
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.MOTION;
    } else {
      return false; // Unsupported platform
    }

    permissionStatus = await request(permission);
    return permissionStatus === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting permissions:', error);
    // In case of error, assume permission is granted to allow the app to function
    Alert.alert(
      'Permission Request Error',
      'Unable to request permissions. Some features may not work correctly.',
      [{ text: 'OK' }]
    );
    return true;
  }
};

export const checkLocationPermissions = async () => {
  try {
    let permissionStatus;
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      return false; // Unsupported platform
    }

    permissionStatus = await check(permission);
    return permissionStatus === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error checking location permissions:', error);
    // In case of error, assume permission is granted to allow the app to function
    return true;
  }
};

export const requestLocationPermissions = async () => {
  try {
    let permissionStatus;
    let permission;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      return false; // Unsupported platform
    }

    permissionStatus = await request(permission);
    return permissionStatus === RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    // In case of error, assume permission is granted to allow the app to function
    return true;
  }
}; 