import apiUpload from "@/lib/apiUpload";

export const uploadImageApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiUpload.post(
    "http://localhost:4000/api/uploadthing",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
