import { extendTheme } from "@chakra-ui/react";
import styles from './styles'
import colors from './foundations/color'
import InputStyle from "./components/input";
import SelectStyle from "./components/select";


// <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
const overrides = {
  fonts: {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif",
    mono: "Roboto, sans-serif",
  },
  colors,
  styles,
  components: {
    Input: InputStyle,
    Select: SelectStyle
  },
  config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    }
}

const theme = extendTheme(overrides)

export default theme;