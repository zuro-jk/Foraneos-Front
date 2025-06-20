import { useMutation } from "@tanstack/react-query";
import { uploadImageApi } from "../../api/uploadthing/uploadThingApi";

export function useUploadThingAndUploadImage() {
  return useMutation({
    mutationFn: async (file: File) => await uploadImageApi(file),
  });
}
