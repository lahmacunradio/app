import { NavigationProp } from '@react-navigation/core';
import { Show } from '../Arcsi/types';

export interface ShowItemProps {
  width: number | 152;
  show: Show;
  nav: NavigationProp<any>;
}
