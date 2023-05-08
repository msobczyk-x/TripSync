import React from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
    user: any;
};
const AuthContext = React.createContext<Partial<AuthContextType>>({});


const AuthProvider = ({ children }: any) => {
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        checkLogin();
    }, []);

    function checkLogin() {
        // check if the user is logged in or not
        // setUser(user);

        SecureStore.getItemAsync('user').then((user) => {
            if (user) {
                setUser(JSON.parse(user));
            }
        }
        );
    }
    return (
        <AuthContext.Provider value={{
            user
        }}>
            {children}
        </AuthContext.Provider>

    )
}

export { AuthProvider, AuthContext };