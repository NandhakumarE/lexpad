import type { ReactNode } from "react";

interface FlexContainerProps{
    children: ReactNode
}

const FlexContainer = ({ children }: FlexContainerProps)=> {
    return <div className="flex items-center gap-1">{children}</div>
}

export default FlexContainer;