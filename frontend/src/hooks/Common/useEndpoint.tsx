import { useContext } from "react";
import { UserContext } from "../../context/User/UserContext";

export const useEndpoint = () => {
    const { userRole } = useContext(UserContext);
    const endpointCurrentUser = userRole === "employer" ? "/employers" : "/companies";
    const endpointAllUsers = userRole === "employer" ? "/companies" : "/employers";
    return { endpointCurrentUser, endpointAllUsers };
}