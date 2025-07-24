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
  maxImages = 5,
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  function handleImageFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    
    // Validate file types on mobile
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/');
      if (!isValidType) {
        console.warn('Invalid file type:', file.type);
      }
      return isValidType;
    });
    
    if (validFiles.length !== selectedFiles.length) {
      alert('Some files were skipped. Please select only image files.');
    }
    
    const remainingSlots = maxImages - uploadedImageUrls.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);
    
    if (validFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images. Maximum ${maxImages} images allowed.`);
    }

    filesToAdd.forEach(file => {
      uploadImageToCloudinary(file);
    });
    
    // Reset input to allow selecting the same file again if needed
    if (event.target) {
      event.target.value = '';
    }
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
      
      // Validate file on frontend as well
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files (JPG, PNG, WebP).');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File is too large. Please select an image smaller than 10MB.');
        return;
      }
      
      console.log('Uploading file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        isMobile: /Mobi|Android/i.test(navigator.userAgent)
      });
      
      const data = new FormData();
      data.append("my_file", file);
      
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout
        }
      );
      
      console.log('Upload response:', response.data);
      
      if (response?.data?.success) {
        const newUrl = response.data.result.url;
        setUploadedImageUrls(prev => [...prev, newUrl]);
        
        // Show success message on mobile
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          alert('Image uploaded successfully!');
        }
      } else {
        const errorMessage = response?.data?.message || 'Upload failed. Please try again.';
        alert(errorMessage);
        console.error('Upload failed:', errorMessage);
      }
    } catch (error) {
      console.error("Upload error:", error);
      
      let errorMessage = 'Upload failed. Please check your internet connection and try again.';
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Upload timeout. Please try with a smaller image or check your internet connection.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      alert(errorMessage);
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
      // Add a small delay to ensure proper mobile handling
      setTimeout(() => {
        inputRef.current.click();
      }, 10);
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
          className={`${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
          border-2 border-dashed rounded-lg p-4 sm:p-6 mb-4 transition-colors
          touch-manipulation select-none active:bg-gray-50 active:border-blue-400`}
        >
          <Input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,image/jpeg,image/jpg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={handleImageFileChange}
            disabled={imageLoadingState}
          />
          
          <div 
            className="flex flex-col items-center justify-center cursor-pointer text-center min-h-[120px] p-4"
            onClick={triggerFileInput}
            onTouchEnd={(e) => {
              // Handle touch events for better mobile support
              e.preventDefault();
              triggerFileInput();
            }}
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
                  <span className="block sm:inline">
                    {window.innerWidth < 640 ? "Tap to select images" : "Drag & drop images here or "}
                  </span>
                  <span className="text-blue-500 font-medium">
                    {uploadedImageUrls.length >= maxImages ? "Maximum images reached" : "Click to browse"}
                  </span>
                </span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1">
                  {maxImages - uploadedImageUrls.length} slots remaining (Max: {maxImages})
                </span>
                
                {/* Mobile-specific button */}
                <div className="sm:hidden mt-3">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerFileInput();
                    }}
                    disabled={imageLoadingState}
                    className="w-full"
                  >
                    Select Images from Device
                  </Button>
                </div>
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
                      disabled={imageLoadingState}
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
              className="relative border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors touch-manipulation"
              onClick={triggerFileInput}
              onTouchEnd={(e) => {
                e.preventDefault();
                triggerFileInput();
              }}
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
        <p>• Maximum file size: 10MB per image</p>
        
        {/* Mobile diagnostic info */}
        {/Mobi|Android/i.test(navigator.userAgent) && (
          <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
            <p className="font-medium text-blue-800">Mobile Device Detected</p>
            <p className="text-blue-600">If upload doesn't work, try using the "Select Images from Device" button above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultipleImageUpload;
