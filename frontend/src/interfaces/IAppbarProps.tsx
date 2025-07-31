import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface IAppBarProps extends MuiAppBarProps {
  open?: boolean;
}