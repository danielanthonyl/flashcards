import {initializeApp} from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import firebaseConfiguration from '../../.firebase-credentials.json'
import { getFirestore } from 'firebase/firestore'

export const app = initializeApp(firebaseConfiguration)
export const analytics = getAnalytics(app);

export const database = getFirestore(app);
