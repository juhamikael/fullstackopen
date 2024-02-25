import { Platform } from "react-native";

//src/theme.js
const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    mainBackground: "#e1e4e8",
    appBarBackground: "#24292e",
    error: "#d73a4a",
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 32,
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
