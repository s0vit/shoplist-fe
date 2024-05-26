import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme } from "@mui/material"
import { PropsWithChildren, createContext, useMemo, useState } from "react"

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
})

const ThemeProviderWithToggle = ({ children }: PropsWithChildren) => {
    const [mode, setMode] = useState<"light" | "dark">("dark")
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
            },
        }),
        [],
    )

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    )

    return (
        <ColorModeContext.Provider value={colorMode}>
            <CssBaseline />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )
}
export default ThemeProviderWithToggle
