import { useEffect, useState } from "react";
import { getAuth, signInWithPopup } from 'firebase/auth'; // Импортируйте signInWithPopup и getAuth из Firebase
import { app, googleAuthProvider } from './firebase'; // Убедитесь, что googleAuthProvider импортирован из вашего файла firebase

export const AuthProvider = () => {
    const auth = getAuth(app);
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((maybeUser) => {
            if (maybeUser != null) {
                return setUser(maybeUser);
            }
            signInWithPopup(auth, googleAuthProvider) // Используйте signInWithPopup здесь
                .then(credentials => {
                    setUser(credentials.user);
                })
                .catch((e) => console.error(e));
        });

        return unsub;
    }, [auth]);

    return user != null ? <>{user.displayName}</> : <>Loading...</>;
};
