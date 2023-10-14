import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { components } from "./component";
import { global } from "./global";
import { fonts } from "./fonts";

export const AppTheme = extendTheme({
    styles: {
        global
    },
    colors,
    components,
    fonts,
})