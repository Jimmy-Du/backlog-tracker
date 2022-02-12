import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  'xl': '1920px',
  '2xl': '2560px',
  '3xl': '3840px'
})

const theme = extendTheme({
    styles: {
        global: {
            "#navbar": {
                background: "tomato",
                width: "100vw",
                color: "white",
                padding: "5px"
            },
            "#navbar li": {
                display: "inline",
                padding: "1% 2%"
            },
            input: {
                textAlign: "center"
            }
        }
    },
    breakpoints
})

export default theme