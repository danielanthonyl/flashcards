import { collection, getDocs } from "firebase/firestore";
import { ECollectionNames } from "./enums/ECollectionNames";
import { database } from "../database";

export const readCollection = async <T extends object>(collectionName: ECollectionNames) => {
  try {
    const collectionData: T[] = [];
    const querySnapshot = await getDocs(collection(database, collectionName));
    
    querySnapshot.forEach((doc) => collectionData.push({ id: doc.id, ...doc.data() } as T));

    console.info(`read collection from ${collectionName}`);
    return collectionData;
  } catch (error) {
    console.error(`error reading collection ${collectionName}`, error);

    return [];
  }
};
