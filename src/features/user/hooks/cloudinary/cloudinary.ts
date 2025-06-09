import { useMutation } from "@tanstack/react-query";
import { uploadImageToCloudinary } from "../../api/cloudinary/cloudinaryApi";

export function useUploadImageToCloudinary() {
  return useMutation({
    mutationFn: (file: File) => uploadImageToCloudinary(file),
  });
}
