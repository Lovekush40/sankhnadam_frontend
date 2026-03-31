import { jsx as _jsx } from "react/jsx-runtime";
const Container = ({ children, className = "" }) => {
    return (_jsx("div", { className: `px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl ${className}`, children: children }));
};
export default Container;
