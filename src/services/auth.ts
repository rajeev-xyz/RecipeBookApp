import firebase from 'firebase';

export class AuthService {

    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    singin(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    signout() {
        return firebase.auth().signOut();
    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }

}