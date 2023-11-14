import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      10: '#FFEFE5',
      40: '#FFC198',
      70: '#FF8332',
      200: '#D95500',
      300: '#B34600',
      main: '#5F54E5', // Thay đổi giá trị chính tại đây
    },
    white: '#FFFFFF',
    borderElement: '#D1D1D6',
    black: '#000',
    gray: {
      80: '#1C1C1E',
      70: '#5f6368',
      60: '#3A3A3C',
      40: '#636366',
      30: '#AEAEB2',
      20: '#D1D1D6',
      10: '#F2F2F7',
    },
    yellow: {
      50: '#FFE680',
      10: '#FFF0B3',
      main: '#FFD326',
    },
    green: {
      50: '#30DA5B',
      10: '#CEFDD5',
      main: '#20B845',
    },
    red: {
      50: '#FF6961',
      10: '#FFAAA6',
      main: '#D70015',
    },
    purple: {
      50: '#DA8EFF',
      10: '#E6CDFD',
      main: '#8943AB',
    },
    blue: '#3872DD',
  },
  // Các giá trị khác từ cấu hình Tailwind có thể được thêm vào đây
});

export default muiTheme;
