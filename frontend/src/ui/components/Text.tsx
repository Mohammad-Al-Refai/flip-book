import { ReactNode } from "react";
import styled from "styled-components";
import { ColorKeys } from "../../theme/ColorKeys";
import { BaseSpacingType } from "../../theme/DesignTokens";

type variant = keyof ColorKeys

const StyledElement = styled.p<{ variant: variant, fontSize: BaseSpacingType, background?: variant }>`
    font-size:${(props) => props.theme.fontSizes[props.fontSize]} ;
    background-color:${(props) => props.background && props.theme.colors[props.background]} ;
    color: ${(props) => {
        return props.theme.colors[props.variant]
    }};
`
export function Text({ children, variant, onClick, fontSize, className, background }: ButtonProps) {

    return <StyledElement fontSize={fontSize} variant={variant} background={background} onClick={onClick} className={className ? className : ""} >
        {children}
    </StyledElement>
}

interface ButtonProps {
    variant: variant
    children: ReactNode,
    className?: string
    fontSize: BaseSpacingType
    background?: variant
    onClick?: () => void
}