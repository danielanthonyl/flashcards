import { ReactNode } from "react"
import './Layout.css'

export const Layout = ({children}: {children: ReactNode}) => {
    return <div className="layout">{children}</div>
}