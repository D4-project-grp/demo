import { Navigate } from "react-router";

export default function ProtectedRoute({ allowedRoles, children }) {
    // localStorage.setItem("role","ROLE_CUSTOMER");    
    // localStorage.setItem("role","ROLE_VENUE_OWNER");    
    // localStorage.setItem("role","ROLE_ADMIN");    
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(token)
    // console.log(user)
    if (!token)
        return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role))
        return <Navigate to="/unauthorized" replace />;

    return children;
}