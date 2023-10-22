import 'styled-components';
import { ColorKeys } from "./theme/ColorKeys"
import { BaseSpacing } from "./theme/DesignTokens"

declare module 'styled-components' {
    export interface DefaultTheme {
        surrounding: BaseSpacing
        horizontalSpacing: BaseSpacing
        verticalSpacing: BaseSpacing
        fontSizes: BaseSpacing
        colors: ColorKeys
        isLightMode: boolean
        isDarkMode: boolean
    }
}