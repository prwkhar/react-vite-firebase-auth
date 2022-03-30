import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }/* : any*/) {

    const [currentUser, setCurrentUser] = React.useState/*<User>*/(/*{email: '', password: ''}*/);
    const [loading, setLoading] = React.useState(true);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function reauthUser(email, password) {
        //const credential = EmailAuthProvider.credential(email, password);
        //return reauthenticateWithCredential(email, password);
        try {
            const credential = EmailAuthProvider.credential(
                email,
                password
            );
            reauthenticateWithCredential(currentUser, credential).then(() => {
                console.log('reauth success');
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    async function updateUserEmail(newEmail, password) {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        console.log(credential);


            await reauthenticateWithCredential(currentUser, credential);
            return updateEmail(currentUser, newEmail)


        /*reauthenticateWithCredential(currentUser, credential).then(() => {
            return updateEmail(currentUser, newEmail);
        });*/

    }

    function updateUserPassword(newPassword) {
        return updatePassword(auth, newPassword);
    }

    React.useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);

        });

        return unsuscribe;
    }, []);


    const value = {
        currentUser,
        logIn,
        logOut,
        signUp,
        resetPassword,
        reauthUser,
        updateUserEmail,
        updateUserPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}