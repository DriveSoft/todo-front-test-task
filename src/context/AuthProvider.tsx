import React, { createContext, useState } from "react";

type AuthContextType = {auth?: {accessToken?: string}, setAuth?: (auth: {accessToken?: string}) => void};
const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState<{accessToken?: string}>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;