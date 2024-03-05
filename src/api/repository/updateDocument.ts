import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ECollectionNames } from "./enums/ECollectionNames";
import { database } from "../database";
import { readDocument } from "./readDocument";

export const updateDocument = async <T extends object>(
  collectionName: ECollectionNames,
  documentId: string,
  updateObject: Partial<T>
): Promise<T | null> => {
  try {
    const documentReference = doc(database, collectionName, documentId);
    const documentSnapshot = await getDoc(documentReference);

    await updateDoc(documentReference, { ...documentSnapshot.data(), ...updateObject });

    const updatedDocument = await readDocument<T>(collectionName, documentId);

    console.info(`updated document with id "${documentId}" on collection "${collectionName}".`);

    return updatedDocument;
  } catch (error) {
    console.error(`error updating document with id "${documentId}" on collection "${collectionName}". `, error);

    return null;
  }
};
