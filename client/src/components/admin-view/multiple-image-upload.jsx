import { FileIcon, UploadCloudIcon, XIcon, Loader2, Plus, Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function MultipleImageUpload({
  imageFiles,
  setImageFiles,
  uploadedImageUrls,
  setUploadedImageUrls,
  imageLoadingState,
  setImageLoadingState,
  isEditMode = false,
  maxImages = 5,
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    const remainingSlots = maxImages - uploadedImageUrls.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);
    
    if (selectedFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images. Maximum ${maxImages} images allowed.`);
    }

    filesToAdd.forEach(file => {
      uploadImageToCloudinary(file);
    });
  }

  function handleDragOver(event) {
    event.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDragActive(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragActive(false);
    
    const droppedFiles = Array.from(event.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxImages - uploadedImageUrls.length;
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (imageFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images. Maximum ${maxImages} images allowed.`);
    }

    filesToAdd.forEach(file => {
      uploadImageToCloudinary(file);
    });
  }

  async function uploadImageToCloudinary(file) {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", file);
      
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      
      if (response?.data?.success) {
        const newUrl = response.data.result.url;
        setUploadedImageUrls(prev => [...prev, newUrl]);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  async function handleDeleteImage(imageUrl, index) {
    try {
      setImageLoadingState(true);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/delete-image",
        { imageUrl }
      );
      
      if (response?.data?.success) {
        setUploadedImageUrls(prev => prev.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error("Delete error:", error);
      // Remove from UI even if Cloudinary deletion fails
      setUploadedImageUrls(prev => prev.filter((_, i) => i !== index));
    } finally {
      setImageLoadingState(false);
    }
  }

  function triggerFileInput() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <div className="w-full mt-4">
      <Label className="text-lg font-semibold mb-4 block">
        Product Images ({uploadedImageUrls.length}/{maxImages})
      </Label>
      
      {/* Upload Area */}
      {uploadedImageUrls.length < maxImages && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`${
            isEditMode ? "opacity-60" : ""
          } ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
          border-2 border-dashed rounded-lg p-4 sm:p-6 mb-4 transition-colors`}
        >
          <Input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageFileChange}
            disabled={isEditMode || imageLoadingState}
          />
          
          <div 
            className="flex flex-col items-center justify-center cursor-pointer text-center"
            onClick={triggerFileInput}
          >
            {imageLoadingState ? (
              <>
                <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-blue-500 mb-2" />
                <span className="text-sm sm:text-base text-gray-600">Uploading images...</span>
              </>
            ) : (
              <>
                <UploadCloudIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-2" />
                <span className="text-center text-sm sm:text-base text-gray-600 px-2">
                  <span className="hidden sm:inline">Drag & drop images here or </span>
                  <span className="text-blue-500 font-medium">
                    {uploadedImageUrls.length >= maxImages ? "Maximum images reached" : "Click to browse"}
                  </span>
                </span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1">
                  {maxImages - uploadedImageUrls.length} slots remaining (Max: {maxImages})
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Image Grid */}
      {uploadedImageUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {uploadedImageUrls.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors aspect-square">
                <img
                  src={imageUrl}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBMMTIwIDkwSDgwTDEwMCA3MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+SW1hZ2UgTm90IEF2YWlsYWJsZTwvcD4KPC9zdmc+";
                  }}
                />
                
                {/* Image Controls */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      onClick={() => handleDeleteImage(imageUrl, index)}
                      disabled={isEditMode || imageLoadingState}
                    >
                      {imageLoadingState ? (
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                      ) : (
                        <XIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Image Index */}
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
          
          {/* Add More Images Button */}
          {uploadedImageUrls.length < maxImages && (
            <div 
              className="relative border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
              onClick={triggerFileInput}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <span className="text-sm text-gray-500">Add More</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-sm text-muted-foreground">
        <p>• Maximum {maxImages} images allowed</p>
        <p>• Supported formats: JPG, PNG, WebP</p>
        <p>• Recommended size: 800x800px or higher</p>
      </div>
    </div>
  );
}

export default MultipleImageUpload;
