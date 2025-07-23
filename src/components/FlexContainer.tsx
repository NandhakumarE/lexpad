import type { ReactNode } from "react";

interface FlexContainerProps{
    className?: string,
    children: ReactNode
}

const FlexContainer = ({ className, children }: FlexContainerProps)=> {
    return <div className={`flex items-center gap-1 ${className}`}>{children}</div>
}

export default FlexContainer;