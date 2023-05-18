import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";

import { useState, createContext, useContext } from "react";

export const PRIMARY_COLOR = "#4bb9c4"; // "#FC6B3F"; // "#4bb9c4" //"#C93D1B"; // ref: https://colorhunt.co/palettes/neon-retro

export interface IThemeContext {
  isDark: boolean;
}

export const ThemeContext = createContext<IThemeContext>({
  isDark: false,
});

export const useTheme = (): IThemeContext => {
  return useContext(ThemeContext);
};

export const LIGHT = "light";
export const DARK = "dark";

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === DARK ? LIGHT : DARK));
  const isDark = colorScheme === DARK ? true : false;

  const contextProvider = {
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextProvider}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: "cyan",
            colors: {
              light: ["#F0F1F5"], // #F7F7F8
            },
          }}
        >
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
// ENHANCE: save color scheme in cookie? ref: https://mantine.dev/guides/dark-theme/#save-color-scheme-in-cookie
