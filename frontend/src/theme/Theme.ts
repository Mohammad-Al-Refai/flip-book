import { ColorKeys } from "./ColorKeys";
import { BaseSpacing } from "./DesignTokens";

export interface Theme {
    isDarkMode: boolean
    isLightMode: boolean
    horizontalSpacing: BaseSpacing
    verticalSpacing: BaseSpacing
    surrounding: BaseSpacing
    fontSizes: BaseSpacing
    colors: ColorKeys
}