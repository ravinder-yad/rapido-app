import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#7df9ff" },
        secondary: { main: "#ff4ecd" },
        background: {
            default: "#0b0f1a",
            paper: "rgba(255,255,255,0.08)",
        },
    },
    shape: { borderRadius: 16 },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(10px)',
                },
            },
        },
    },
});
