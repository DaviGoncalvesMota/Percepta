import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface IAppBar extends MuiAppBarProps {
  open?: boolean;
}

export interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}