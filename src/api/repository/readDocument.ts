import { getDoc, doc } from "firebase/firestore";
import { database } from "../database";
import { ECollectionNames } from "./enums/ECollectionNames";

export const readDocument = async <T extends object>(
  collectionName: ECollectionNames,
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(database, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.info(`Read document ${collectionName}/${documentId}`);

      return docSnapshot.data() as T;
    }

    throw new Error(`Document ${collectionName}/${documentId} not found`);
  } catch (error) {
    console.error(`error reading document ${collectionName}/${documentId}.`, error);

    return null;
  }
};
