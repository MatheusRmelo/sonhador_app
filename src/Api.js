import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '793601712243-ughg5eivepl4o93n91mvp8vn8pgt0kir.apps.googleusercontent.com',
});

export default {
    loginGmail: async ()=>{
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
      
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    },
    login: async (email, password)=>{
        await auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
		    console.log('Usuário logado!');
		})
		.catch(error => {
            if (error.code === 'auth/invalid-email') {
                console.log('Esse e-mail é inválido!');
            }
		});
    },
    logout:async ()=>{
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return auth().signOut();
    },
    
}