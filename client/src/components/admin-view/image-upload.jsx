import { FileIcon, UploadCloudIcon, XIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { API_BASE_URL } from "../../config/api";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  console.log(isEditMode, "isEditMode");

  function handleImageFileChange(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleDeleteUploadedImage() {
    if (!uploadedImageUrl) return;
    
    try {
      setImageLoadingState(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/products/delete-image`,
        { imageUrl: uploadedImageUrl }
      );
      
      if (response?.data?.success) {
        setUploadedImageUrl("");
        setImageFile(null);
        console.log("Image deleted successfully");
      } else {
        console.error("Failed to delete image:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/products/upload-image`,
      data
    );
    console.log(response, "response");

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          uploadedImageUrl ? (
            // Show uploaded image with delete option
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={uploadedImageUrl}
                  alt="Uploaded"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={handleDeleteUploadedImage}
                  disabled={isEditMode || imageLoadingState}
                >
                  {imageLoadingState ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <XIcon className="w-3 h-3" />
                  )}
                </Button>
              </div>
              <Label
                htmlFor="image-upload"
                className={`${
                  isEditMode ? "cursor-not-allowed" : ""
                } flex flex-col items-center justify-center h-16 cursor-pointer border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100`}
              >
                <UploadCloudIcon className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-sm">Click to replace image</span>
              </Label>
            </div>
          ) : (
            // Show upload area when no image
            <Label
              htmlFor="image-upload"
              className={`${
                isEditMode ? "cursor-not-allowed" : ""
              } flex flex-col items-center justify-center h-32 cursor-pointer`}
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span>Drag & drop or click to upload image</span>
            </Label>
          )
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
