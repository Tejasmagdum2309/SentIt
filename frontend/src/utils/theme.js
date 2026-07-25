import { createTheme } from '@mui/material/styles';


// ============================================================
// Primary: Soft blue (#1a73e8)
// No gradients, no glassmorphism, lots of whitespace
// ============================================================

const theme = createTheme({
  // ----------------------------------------------------------
  // 1. PALETTE
  // ----------------------------------------------------------
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
      light: '#4d8ff0',
      dark: '#1557b0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5f6368',
      light: '#80868b',
      dark: '#3c4043',
      contrastText: '#ffffff',
    },
    success: {
      main: '#1e8e3e',
      light: '#e6f4ea',
      dark: '#137333',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d93025',
      light: '#fce8e6',
      dark: '#b31412',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f9ab00',
      light: '#fef7e0',
      dark: '#c78300',
      contrastText: '#202124',
    },
    info: {
      main: '#1a73e8',
      light: '#e8f0fe',
      dark: '#1557b0',
      contrastText: '#ffffff',
    },
    // Gmail-inspired neutrals
    grey: {
      50: '#f8f9fa',   // Surface / sidebar bg
      100: '#f1f3f4',  // Hover backgrounds, search bar
      200: '#e8eaed',  // Light borders
      300: '#dadce0',  // Input borders, dividers
      400: '#bdc1c6',  // Disabled states
      500: '#9aa0a6',  // Muted text, pending status
      600: '#80868b',  // Timestamps, meta text
      700: '#5f6368',  // Secondary text, subjects
      800: '#3c4043',  // Darker secondary
      900: '#202124',  // Primary text, headings
    },
    background: {
      default: '#F8FAFC',
      paper: '#ffffff',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
      disabled: '#9aa0a6',
    },
    divider: '#e0e0e0',
  },

  // ----------------------------------------------------------
  // 2. TYPOGRAPHY
  // ----------------------------------------------------------
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    // Page Title
    h4: {
      fontSize: '20px',
      fontWeight: 500,
      color: '#202124',
      lineHeight: 1.3,
    },
    // Section Heading
    h5: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#202124',
      lineHeight: 1.4,
    },
    // Card Title, Campaign Name
    h6: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#202124',
      lineHeight: 1.4,
    },
    // Body text, descriptions
    body1: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#5f6368',
      lineHeight: 1.5,
    },
    // Smaller body, previews
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      color: '#80868b',
      lineHeight: 1.5,
    },
    // Timestamps, counts, meta
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      color: '#80868b',
      lineHeight: 1.4,
    },
    // Buttons
    button: {
      fontSize: '14px',
      fontWeight: 500,
      textTransform: 'none', // Gmail doesn't uppercase buttons
      letterSpacing: '0.25px',
    },
    // Labels, chips
    overline: {
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      color: '#5f6368',
    },
  },

  // ----------------------------------------------------------
  // 3. SHAPE (Border Radius)
  // ----------------------------------------------------------
  shape: {
    borderRadius: 4,        // Default: buttons, inputs
    // Custom overrides per component below
  },

  // ----------------------------------------------------------
  // 4. SHADOWS (Minimal, Gmail-style)
  // ----------------------------------------------------------
  shadows: [
    'none',                                                           // 0
    '0 1px 2px 0 rgba(60,64,67,0.1)',                                // 1 — Subtle hover
    '0 1px 3px 0 rgba(60,64,67,0.15)',                               // 2
    '0 2px 4px 0 rgba(60,64,67,0.15)',                               // 3
    '0 2px 6px 0 rgba(60,64,67,0.15)',                               // 4
    '0 3px 8px 0 rgba(60,64,67,0.2)',                                // 5
    '0 4px 12px 0 rgba(60,64,67,0.2)',                               // 6
    '0 6px 16px 0 rgba(60,64,67,0.25)',                              // 7
    '0 8px 24px 0 rgba(60,64,67,0.25)',                              // 8
    '0 12px 32px 0 rgba(60,64,67,0.3)',                              // 9
    '0 16px 40px 0 rgba(60,64,67,0.3)',                              // 10
    '0 20px 48px 0 rgba(60,64,67,0.35)',                             // 11
    '0 24px 56px 0 rgba(60,64,67,0.35)',                             // 12
    '0 0 0 0 rgba(0,0,0,0)',                                         // 13
    '0 0 0 0 rgba(0,0,0,0)',                                         // 14
    '0 0 0 0 rgba(0,0,0,0)',                                         // 15
    '0 0 0 0 rgba(0,0,0,0)',                                         // 16
    '0 0 0 0 rgba(0,0,0,0)',                                         // 17
    '0 0 0 0 rgba(0,0,0,0)',                                         // 18
    '0 0 0 0 rgba(0,0,0,0)',                                         // 19
    '0 0 0 0 rgba(0,0,0,0)',                                         // 20
    '0 0 0 0 rgba(0,0,0,0)',                                         // 21
    '0 0 0 0 rgba(0,0,0,0)',                                         // 22
    '0 0 0 0 rgba(0,0,0,0)',                                         // 23
    '0 0 0 0 rgba(0,0,0,0)',                                         // 24
  ],

  // ----------------------------------------------------------
  // 5. COMPONENT OVERRIDES
  // ----------------------------------------------------------
  components: {
    // ---- BUTTON ----
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.25px',
          transition: 'background-color 150ms ease, box-shadow 150ms ease',
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#1557b0',
          },
        },
        outlined: {
          borderColor: '#dadce0',
          color: '#1a73e8',
          '&:hover': {
            backgroundColor: '#f6f9fe',
            borderColor: '#1a73e8',
          },
        },
        text: {
          color: '#5f6368',
          '&:hover': {
            backgroundColor: '#f2f2f2',
          },
        },
        sizeSmall: {
          padding: '4px 12px',
          fontSize: '13px',
        },
      },
    },

    // ---- ICON BUTTON ----
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: '#5f6368',
          '&:hover': {
            backgroundColor: '#f2f2f2',
          },
        },
      },
    },

    // ---- TEXT FIELD / INPUT ----
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: '#dadce0',
            },
            '&:hover fieldset': {
              borderColor: '#80868b',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a73e8',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#5f6368',
            '&.Mui-focused': {
              color: '#1a73e8',
            },
          },
        },
      },
    },

    // ---- OUTLINED INPUT ----
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dadce0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#80868b',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1a73e8',
            borderWidth: 2,
          },
        },
      },
    },

    // ---- INPUT LABEL ----
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#5f6368',
          '&.Mui-focused': {
            color: '#1a73e8',
          },
        },
      },
    },

    // ---- CHIP / BADGE ----
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Pill shape
          height: 24,
          fontSize: '12px',
          fontWeight: 500,
          '& .MuiChip-label': {
            padding: '0 12px',
          },
        },
        // Status variants
        colorSuccess: {
          backgroundColor: '#e6f4ea',
          color: '#1e8e3e',
        },
        colorError: {
          backgroundColor: '#fce8e6',
          color: '#d93025',
        },
        colorDefault: {
          backgroundColor: '#f1f3f4',
          color: '#5f6368',
        },
        colorPrimary: {
          backgroundColor: '#e8f0fe',
          color: '#1a73e8',
        },
      },
    },

    // ---- LIST / LIST ITEM ----
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: '12px 16px',
          '&:hover': {
            backgroundColor: '#f2f2f2',
          },
          '&.Mui-selected': {
            backgroundColor: '#e8f0fe',
            '&:hover': {
              backgroundColor: '#d2e3fc',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '10px 16px',
          '&:hover': {
            backgroundColor: '#f1f3f4',
          },
          '&.Mui-selected': {
            backgroundColor: '#e8f0fe',
            borderLeft: '4px solid #1a73e8',
            '&:hover': {
              backgroundColor: '#d2e3fc',
            },
          },
        },
      },
    },

    // ---- CARD ----
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
          backgroundColor: '#ffffff',
          '&:hover': {
            boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
          },
          transition: 'box-shadow 200ms ease',
        },
      },
    },

    // ---- PAPER ----
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#ffffff',
        },
        elevation0: {
          boxShadow: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 2px 0 rgba(60,64,67,0.1)',
        },
        elevation2: {
          boxShadow: '0 1px 3px 0 rgba(60,64,67,0.15)',
        },
      },
    },

    // ---- DIALOG ----
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 24px 56px 0 rgba(60,64,67,0.35)',
          maxWidth: 720,
          width: '100%',
          margin: 24,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px',
          fontSize: '20px',
          fontWeight: 500,
          color: '#202124',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '0 24px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
          borderTop: '1px solid #e0e0e0',
        },
      },
    },

    // ---- BACKDROP ----
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.32)',
        },
      },
    },

    // ---- APP BAR ----
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#202124',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },

    // ---- TOOLBAR ----
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          padding: '0 16px',
        },
      },
    },

    // ---- DRAWER (Sidebar) ----
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e0e0e0',
          width: 240,
          boxShadow: 'none',
        },
      },
    },

    // ---- DIVIDER ----
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e0e0e0',
        },
      },
    },

    // ---- SNACKBAR / ALERT ----
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#323232',
            color: '#ffffff',
            borderRadius: 4,
            padding: '14px 16px',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        standardSuccess: {
          backgroundColor: '#e6f4ea',
          color: '#1e8e3e',
        },
        standardError: {
          backgroundColor: '#fce8e6',
          color: '#d93025',
        },
        standardWarning: {
          backgroundColor: '#fef7e0',
          color: '#c78300',
        },
        standardInfo: {
          backgroundColor: '#e8f0fe',
          color: '#1a73e8',
        },
      },
    },

    // ---- STEP / STEPPER ----
    MuiStep: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-label': {
            fontSize: '14px',
            color: '#5f6368',
            '&.Mui-active': {
              color: '#1a73e8',
              fontWeight: 500,
            },
            '&.Mui-completed': {
              color: '#1e8e3e',
            },
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: '#dadce0',
          '&.Mui-active': {
            color: '#1a73e8',
          },
          '&.Mui-completed': {
            color: '#1e8e3e',
          },
        },
      },
    },

    // ---- TABLE ----
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: 'separate',
          borderSpacing: 0,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f2f2f2',
          },
          '&:last-child td': {
            borderBottom: 'none',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e0e0e0',
          padding: '12px 16px',
          fontSize: '14px',
          color: '#5f6368',
        },
        head: {
          fontWeight: 500,
          color: '#202124',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },

    // ---- TABS ----
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #e0e0e0',
          minHeight: 48,
        },
        indicator: {
          backgroundColor: '#1a73e8',
          height: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 500,
          color: '#5f6368',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#1a73e8',
          },
        },
      },
    },

    // ---- AVATAR ----
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#e8f0fe',
          color: '#1a73e8',
          fontSize: '14px',
          fontWeight: 500,
        },
      },
    },

    // ---- TOOLTIP ----
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#3c4043',
          color: '#ffffff',
          fontSize: '12px',
          borderRadius: 4,
          padding: '6px 10px',
        },
      },
    },

    // ---- MENU / MENU ITEM ----
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          boxShadow: '0 2px 6px 0 rgba(60,64,67,0.15)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#202124',
          padding: '10px 16px',
          '&:hover': {
            backgroundColor: '#f2f2f2',
          },
        },
      },
    },

    // ---- LINEAR PROGRESS ----
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#e8eaed',
          height: 4,
        },
        bar: {
          borderRadius: 4,
        },
      },
    },

    // ---- CHECKBOX / RADIO / SWITCH ----
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#dadce0',
          '&.Mui-checked': {
            color: '#1a73e8',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#dadce0',
          '&.Mui-checked': {
            color: '#1a73e8',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
              color: '#1a73e8',
              '& + .MuiSwitch-track': {
                backgroundColor: '#1a73e8',
              },
            },
          },
          '& .MuiSwitch-track': {
            backgroundColor: '#dadce0',
          },
        },
      },
    },

    // ---- FORM HELPER TEXT ----
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          color: '#80868b',
          marginTop: 4,
        },
      },
    },

    // ---- SELECT ----
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#dadce0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#80868b',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1a73e8',
          },
        },
      },
    },
  },

  // ----------------------------------------------------------
  // 6. TRANSITIONS
  // ----------------------------------------------------------
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

  // ----------------------------------------------------------
  // 7. Z-INDEX
  // ----------------------------------------------------------
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

// ============================================================
// CUSTOM STYLED COMPONENTS (Optional helpers)
// ============================================================
// You can add these as separate styled components in your app:
//
// const CampaignRow = styled(Box)(({ theme }) => ({
//   padding: '12px 16px',
//   borderBottom: `1px solid ${theme.palette.divider}`,
//   cursor: 'pointer',
//   transition: 'background-color 150ms ease',
//   '&:hover': {
//     backgroundColor: '#f2f2f2',
//   },
// }));
//
// const StatusBadge = styled(Chip)(({ status }) => ({
//   ...(status === 'sent' && {
//     backgroundColor: '#e6f4ea',
//     color: '#1e8e3e',
//   }),
//   ...(status === 'failed' && {
//     backgroundColor: '#fce8e6',
//     color: '#d93025',
//   }),
//   ...(status === 'pending' && {
//     backgroundColor: '#f1f3f4',
//     color: '#9aa0a6',
//   }),
// }));
//
// const SearchBar = styled(TextField)(({ theme }) => ({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: 8,
//     backgroundColor: '#f1f3f4',
//     '& fieldset': {
//       borderColor: 'transparent',
//     },
//     '&:hover fieldset': {
//       borderColor: '#dadce0',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#dadce0',
//       backgroundColor: '#ffffff',
//       boxShadow: '0 1px 2px 0 rgba(60,64,67,0.1)',
//     },
//   },
// }));

export default theme;