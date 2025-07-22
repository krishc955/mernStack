import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "lucide-react";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(imageId) {
    // Add confirmation for safety
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(deleteFeatureImage(imageId)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
        } else {
          console.error("Failed to delete image:", data?.payload?.message);
          // Still refresh the list in case the database record was deleted
          dispatch(getFeatureImages());
        }
      }).catch((error) => {
        console.error("Delete error:", error);
        // Refresh the list anyway to sync with server state
        dispatch(getFeatureImages());
      });
    }
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-lg"
                  onError={(e) => {
                    // Handle broken images
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback for broken images */}
                <div 
                  className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <p>Image not available</p>
                    <p className="text-sm">URL: {featureImgItem.image}</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
