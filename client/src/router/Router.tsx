import * as React from 'react';
import { BrowserRouter, Routes } from "react-router-dom";

type Props = {
    children?: React.ReactNode
};

export const Router: React.FC<Props> = ({ children }) => {
    return <BrowserRouter>
        <Routes>
            {children}
        </Routes>
    </BrowserRouter>
}
