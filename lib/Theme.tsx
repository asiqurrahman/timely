"use client";

import { ThemeProvider } from "styled-components";

export const GlobalTheme = {
  fontSize: {
    14: "0.875rem",
    16: "1rem",
    18: "1.125rem",
    20: "1.25rem",
    22: "1.375rem",
    24: "1.5rem",
    26: "1.625rem",
    34: "2.125rem",
    44: "2.75rem",
    64: "4rem",
  },
  breakpoints: {
    xs: "@media only screen and (min-width: 320px)",
    sm: "@media only screen and (min-width: 768px)",
    md: "@media only screen and (min-width: 1024px)",
    lg: "@media only screen and (min-width: 1200px)",
    lm: "@media only screen and (min-width: 1300px)",
    xl: "@media only screen and (min-width: 1400px)",
  },
};

const Theme = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={GlobalTheme}>{children}</ThemeProvider>;
};

export default Theme;
