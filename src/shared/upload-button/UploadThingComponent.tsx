import { UploadButton } from "./UploadButton";

const UploadThingComponent = () => {
  return (
    <div>
      <h2>Sube tu imagen</h2>
      <UploadButton
        appearance={{
          button:
            "bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-800 transition",
          container: "flex flex-col items-center gap-2",
        }}
        content={{
          button: "Subir imagen",
          allowedContent: "JPG, PNG, hasta 4MB",
        }}
        endpoint="imageUploader" // Debe coincidir con el nombre del endpoint en tu backend
        onClientUploadComplete={(res) => {
          console.log("Archivos subidos:", res);
          alert("Archivo subido exitosamente");
        }}
        onUploadError={(error) => {
          console.error(error);
          alert(`Error al subir: ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadThingComponent;
