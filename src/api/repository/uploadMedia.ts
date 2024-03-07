import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { bucket } from "../database";
import { EBucketDirectories } from "./enums/EBucketDirectories";

export const uploadMedia = async (file: File, directory: EBucketDirectories) => {
    try {
    const fileRef = ref(bucket, `${directory}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);

      console.info(`media "${file.name}" sent to bucket directory: "${directory}". `, snapshot);

      const downloadURL =  await getDownloadURL(fileRef);

      return downloadURL
    } catch (error) {
      console.error(`error sending media "${file.name}" to directory "${directory}". `, error);

      return null
    }
}