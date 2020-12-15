import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');
const booksCollection = firestore().collection('Books');
const booksPublishedCollection = firestore().collection('BooksPublished');

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
    firstUse: async (userId, userName)=>{
        const user = await usersCollection.doc(userId).get();
        let data = user.data();

        var nome = userName.split(" ")[0];
        var qtdnome = userName.split(" ").length;
        var sobrenome = userName.split(" ")[qtdnome-1]; 
        let newUserName = (nome+sobrenome).toLowerCase();

        if(data){
            return true;
        }else{
            let users = [];
            let result = await usersCollection.where('userName','==',newUserName)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    users.push(doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
            if(users.length>0){
                newUserName=newUserName+users.length.toString();
            }
            await usersCollection.doc(userId).set({
                userName:newUserName
            }).then(()=>true)
            .catch(e=>console.log(e));
        }
    },
    saveBook:async (book)=>{

        let result = await booksCollection.add({
           ...book
        })
        .then(() => {
            return {error:''};
        }).catch((e)=>{
            return {error:e};
        })

        return result;
    },
    getMyBooks:async (userId)=>{
        let books = [];
        await booksCollection.where('userId', '==', userId)
            .limit(20)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                  console.log('No matching documents.');
                  return;
                }
                snapshot.forEach(doc => {
                  //console.log(doc.id, '=>', doc.data());
                  books.push({id:doc.id, book:doc.data()});
                });
              })
            .catch(err => {
                console.log('Error getting documents', err);
            }
        );
        return books;
    },
    publishBook:async (book)=>{

        let result = await booksPublishedCollection.add({
           ...book
        })
        .then(() => {
            return {error:''};
        }).catch((e)=>{
            return {error:e};
        })

        return result;
    },


    
}