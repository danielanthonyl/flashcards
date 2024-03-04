import { collection, getDocs } from "firebase/firestore";
import { ECollectionNames } from "./ECollectionNames";
import { database } from "../database";

export const readCollection = async <T extends { id: string }>(collectionName: ECollectionNames) => {
  try {
    const collectionData: T[] = [];
    const querySnapshot = await getDocs(collection(database, collectionName));

    querySnapshot.forEach(({ id, data }) => collectionData.push({ id, ...data } as T));

    console.info(`read collection from ${collectionName}`);
    return collectionData;
  } catch (error) {
    console.error(`error reading collection ${collectionName}`, error);

    return [];
  }
};
