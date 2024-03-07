/**
 * DEBTS:
 * - any document/collection should return item or null. instead should always return the value or error.
 */
import { addDoc, collection } from "firebase/firestore";
import { database } from "../database";
import { ECollectionNames } from "./enums/ECollectionNames";
import { readDocument } from "./readDocument";

export const createDocument = async <In, Out>(
  collectionName: ECollectionNames,
  databaseDocument: In
): Promise<(Out & { id: string }) | null> => {
  try {
    const docRef = await addDoc(collection(database, collectionName), databaseDocument);
    const newDocument = await readDocument(collectionName, docRef.id);

    console.info(`document written at collection ${collectionName}.`, { docRef: docRef.id, databaseDocument });

    return { id: docRef.id, ...newDocument } as Out & { id: string };
  } catch (error) {
    console.error("Error writing document: ", error);
    return null;
  }
};
