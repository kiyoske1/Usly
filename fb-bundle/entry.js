import {initializeApp} from 'firebase/app';
import {getFirestore,initializeFirestore,doc,getDoc,setDoc,onSnapshot,increment,arrayUnion,runTransaction} from 'firebase/firestore';
import {getAuth,signInAnonymously} from 'firebase/auth';
window.FB={initializeApp,getFirestore,initializeFirestore,doc,getDoc,setDoc,onSnapshot,increment,arrayUnion,runTransaction,getAuth,signInAnonymously};
