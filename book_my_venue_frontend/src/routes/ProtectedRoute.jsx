import { Navigate } from "react-router";

export default function ProtectedRoute({ allowedRoles, children }) {
    // localStorage.setItem("role","ROLE_CUSTOMER");    
    localStorage.setItem("role","ROLE_VENUE_OWNER");    
    // localStorage.setItem("role","ROLE_ADMIN");    
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // if (!token)
    //     return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(role))
        return <Navigate to="/unauthorized" replace />;

    return children;
}