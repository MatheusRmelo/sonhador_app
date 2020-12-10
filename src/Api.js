import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '793601712243-ughg5eivepl4o93n91mvp8vn8pgt0kir.apps.googleusercontent.com',
  });
  
export default {
    login: async ()=>{
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
}