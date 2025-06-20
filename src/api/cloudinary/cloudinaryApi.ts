import api from "@/lib/api";
import type { ImageResponseCloudinary } from "../../dto/response/image/ImageResponse";

export const uploadImageToCloudinary = async (
  file: File
): Promise<ImageResponseCloudinary> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
