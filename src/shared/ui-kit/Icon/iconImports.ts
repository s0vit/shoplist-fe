// Импорты всех иконок
import PlusIcon from '../assets/icons/plus.svg?react';
import DeclineIcon from '../assets/icons/decline.svg?react';
import ChevroneRightIcon from '../assets/icons/chevroneRight.svg?react';
import PencilSquareIcon from '../assets/icons/pencilSquare.svg?react';
import CalendarIcon from '../assets/icons/calendar.svg?react';
import BurgerMenuIcon from '../assets/icons/burgerMenu.svg?react';
import HomeIcon from '../assets/icons/home.svg?react';
import CardIcon from '../assets/icons/card.svg?react';
import CoinIcon from '../assets/icons/coin.svg?react';
import MenuIcon from '../assets/icons/menu.svg?react';
import CameraIcon from '../assets/icons/camera.svg?react';
import EyeIcon from '../assets/icons/eye.svg?react';
import EyeSlashIcon from '../assets/icons/eyeSlash.svg?react';

import type { TIconName } from './types';
import type React from 'react';

// Маппер иконок
export const ICON_MAP: Record<TIconName, React.FC<React.SVGProps<SVGSVGElement>>> = {
  plus: PlusIcon,
  decline: DeclineIcon,
  chevroneRight: ChevroneRightIcon,
  pencilSquare: PencilSquareIcon,
  calendar: CalendarIcon,
  burgerMenu: BurgerMenuIcon,
  home: HomeIcon,
  card: CardIcon,
  coin: CoinIcon,
  menu: MenuIcon,
  camera: CameraIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
};
