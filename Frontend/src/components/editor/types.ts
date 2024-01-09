import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ReactQuillProps } from 'react-quill';

// ----------------------------------------------------------------------

export interface EditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
}
