export interface IconProps {
  color: string;
  focused: boolean;
}

export interface TabIconProps extends IconProps {
  icon: string;
  label: string;
}

export type TabParamList = {
  Home: undefined;
  StepCounter: undefined;
  Settings: undefined;
  About: undefined;
}; 