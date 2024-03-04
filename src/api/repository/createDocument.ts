import { addDoc, collection } from "firebase/firestore";
import { database } from "../database";
import { ECollectionNames } from "./ECollectionNames";

export const createDocument = async (collectionName: ECollectionNames, databaseDocument: object) => {
  try {
    const docRef = await addDoc(collection(database, collectionName), databaseDocument);

    console.info(`document written at collection ${collectionName}.`, { docRef: docRef.id, databaseDocument});
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};
