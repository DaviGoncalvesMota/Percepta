import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface IAppBar extends MuiAppBarProps {
  open?: boolean;
}