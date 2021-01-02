import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';

const usersCollection = firestore().collection('Users');
const textsCollection = firestore().collection('Texts');
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
    saveBook:async (text)=>{
        let result = await textsCollection.add({
           ...text
        })
        .then((document) => {
            bookId = document.id;
            return {error:'', bookId};
        }).catch((e)=>{
            return {error:e};
        })
        return result;
    },
    deleteBook:async (id)=>{
        const deleted = await textsCollection.doc(id).delete()
            .then(() =>true)
            .catch((e)=>false);
        return deleted;
    },
    updateBook: async (id, text)=>{
        const updated = await textsCollection.doc(id).update({
            ...text
        })
        .then(() =>true)
        .catch((e)=>false);
        return updated;
    },
    getMyTexts:async (userId)=>{
        let texts = [];
        await textsCollection.where('userId', '==', userId)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                  console.log('No matching documents.');
                  return;
                }
                snapshot.forEach(doc => {
                  //console.log(doc.id, '=>', doc.data());
                  texts.push({id:doc.id, text:doc.data()});
                });
              })
            .catch(err => {
                console.log('Error getting documents', err);
            }
        );
        return texts;
    },
    getTextById:async (id)=>{
        let book = {};
        await textsCollection.doc(id).get()
            .then(documentSnapshot => {
                //console.log('User exists: ', documentSnapshot.exists);
                if (documentSnapshot.exists) {
                    book = documentSnapshot.data();
                };
        });
        return book;
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
    addImageInStorage: async (source, local)=>{
        const { uri } = source;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage()
          .ref(local+filename)
          .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
        });
        try {
          await task;
          return {error: '', data:filename};
        } catch (error) {
          return {error, data:''};
        }
    },
    delImageInStorage: async (ref, local)=>{
        const result = await storage()
            .ref(local+ref)
            .delete()
            .then(()=>{
                return {
                    error: '',
                    data: true 
                }
            }).catch((error)=>{
                return {
                    error,
                    data: ''
                }
        });
        console.log(result);
        return result;  
    },
    getImageInStorage: async (ref, local)=>{
        const result = await storage()
            .ref(local+ref)
            .getDownloadURL()
            .then((url)=>{
                return {
                    error: '',
                    data: url 
                }
            }).catch((error)=>{
                return {
                    error,
                    data: ''
                }
        });
        return result;      
    },


    
}