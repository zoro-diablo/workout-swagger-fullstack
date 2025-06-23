import { AuthContext } from "./authContext"

export const AuthProvider = ({children}) =>{
    return(
        <AuthContext.Provider value={} >
            {children}
        </AuthContext.Provider>
    )
}