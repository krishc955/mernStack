import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { videoFormControls } from "@/config";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Play,
  Filter
} from "lucide-react";

const initialFormData = {
  title: "",
  description: "",
  embedCode: "",
  // Auto-filled with sensible defaults
  category: "fashion", // Default category
  platform: "facebook",
  thumbnail: "",
  videoUrl: "",
  tags: "",
  displayOrder: 0,
  isActive: true,
};

function AdminVideos() {
  const [openCreateVideoDialog, setOpenCreateVideoDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [videosList, setVideosList] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    platform: 'all',
    category: 'all',
    isActive: 'all'
  });
  const { toast } = useToast();

  // Fetch videos
  async function fetchAllVideos() {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== 'all') {
          queryParams.append(key, filters[key]);
        }
      });
      
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/videos?${queryParams}`,
        {
          method: "GET",
        }
      );
      const data = await result.json();

      if (data?.success) {
        setVideosList(data.data);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast({
        title: "Error",
        description: "Failed to fetch videos",
        variant: "destructive",
      });
    }
  }

  // Add or update video
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Auto-detect platform from embed code
      let detectedPlatform = "facebook";
      if (formData.embedCode) {
        if (formData.embedCode.includes("instagram")) {
          detectedPlatform = "instagram";
        } else if (formData.embedCode.includes("youtube") || formData.embedCode.includes("youtu.be")) {
          detectedPlatform = "youtube";
        }
      }

      // Prepare form data with auto-detected values and sensible defaults
      const submitData = {
        ...formData,
        platform: detectedPlatform,
        category: "fashion", // Default category since it's not in the form
        isActive: true, // Always active by default
        displayOrder: 0, // Always show at top by default
        tags: "", // No tags by default
        thumbnail: "", // No custom thumbnail by default
        videoUrl: "", // Not required for embed code approach
      };

      const url = currentEditedId
        ? `${import.meta.env.VITE_API_URL}/api/admin/videos/update/${currentEditedId}`
        : `${import.meta.env.VITE_API_URL}/api/admin/videos/add`;
      
      const method = currentEditedId ? "PUT" : "POST";

      const result = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await result.json();

      if (data?.success) {
        fetchAllVideos();
        setFormData(initialFormData);
        setOpenCreateVideoDialog(false);
        setCurrentEditedId(null);
        toast({
          title: "Success",
          description: data.message,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting video:", error);
      toast({
        title: "Error",
        description: "Failed to save video",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Delete video
  async function handleDeleteVideo(getCurrentVideoId) {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/videos/delete/${getCurrentVideoId}`,
        {
          method: "DELETE",
        }
      );

      const data = await result.json();

      if (data?.success) {
        fetchAllVideos();
        toast({
          title: "Success",
          description: "Video deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      });
    }
  }

  // Toggle video status
  async function handleToggleStatus(videoId) {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/videos/toggle-status/${videoId}`,
        {
          method: "PATCH",
        }
      );

      const data = await result.json();

      if (data?.success) {
        fetchAllVideos();
        toast({
          title: "Success",
          description: data.message,
        });
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  }

  function isFormValid() {
    return (
      formData &&
      formData.title &&
      formData.title.trim() !== "" &&
      formData.embedCode &&
      formData.embedCode.trim() !== ""
    );
  }

  useEffect(() => {
    fetchAllVideos();
  }, [filters]);

  console.log(videosList, "videosList");

  return (
    <Fragment>
      {/* Mobile-responsive header */}
      <div className="mb-5 w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Video Management</h1>
            
            {/* Mobile-responsive filters */}
            <div className="flex flex-wrap gap-2">
              <select 
                value={filters.platform}
                onChange={(e) => setFilters({...filters, platform: e.target.value})}
                className="px-2 py-1 border rounded-md text-xs sm:text-sm flex-1 sm:flex-none min-w-0"
              >
                <option value="all">All Platforms</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
              </select>
              
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="px-2 py-1 border rounded-md text-xs sm:text-sm flex-1 sm:flex-none min-w-0"
              >
                <option value="all">All Categories</option>
                <option value="fashion">Fashion</option>
                <option value="styling">Styling</option>
                <option value="behind-scenes">Behind Scenes</option>
                <option value="customer-stories">Customer Stories</option>
                <option value="tutorials">Tutorials</option>
              </select>
              
              <select 
                value={filters.isActive}
                onChange={(e) => setFilters({...filters, isActive: e.target.value})}
                className="px-2 py-1 border rounded-md text-xs sm:text-sm flex-1 sm:flex-none min-w-0"
              >
                <option value="all">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          
          <Button
            onClick={() => {
              setOpenCreateVideoDialog(true);
              setCurrentEditedId(null);
              setFormData(initialFormData);
            }}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Video
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Play className="h-4 w-4 sm:h-5 sm:w-5" />
            Videos ({videosList.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Card View */}
          <div className="block md:hidden">
            {videosList && videosList.length > 0 ? (
              <div className="space-y-3 p-4">
                {videosList.map((video) => (
                  <div key={video._id} className="border rounded-lg p-3 bg-white shadow-sm">
                    <div className="flex items-start gap-3 mb-3">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-16 h-12 object-cover rounded flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{video.title}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {video.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge 
                        variant={
                          video.platform === 'facebook' ? 'default' :
                          video.platform === 'instagram' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {video.platform}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{video.category}</Badge>
                      <Badge variant={video.isActive ? "default" : "secondary"} className="text-xs">
                        {video.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Views: {video.views || 0}</span>
                      <span>Order: {video.displayOrder}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(video.videoUrl, '_blank')}
                        className="flex-1 text-xs h-8"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(video._id)}
                        className="px-2 h-8"
                      >
                        {video.isActive ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setOpenCreateVideoDialog(true);
                          setCurrentEditedId(video._id);
                          setFormData({
                            title: video.title || '',
                            description: video.description || '',
                            embedCode: video.embedCode || '',
                          });
                        }}
                        className="px-2 h-8"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteVideo(video._id)}
                        className="px-2 h-8"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <div className="text-gray-500">
                  <Play className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No videos found. Add your first video!</p>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title</TableHead>
                  <TableHead className="min-w-[100px]">Platform</TableHead>
                  <TableHead className="min-w-[100px]">Category</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">Views</TableHead>
                  <TableHead className="min-w-[80px]">Order</TableHead>
                  <TableHead className="min-w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videosList && videosList.length > 0
                  ? videosList.map((video) => (
                      <TableRow key={video._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            {video.thumbnail && (
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-12 h-8 object-cover rounded flex-shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="font-medium truncate">{video.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {video.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              video.platform === 'facebook' ? 'default' :
                              video.platform === 'instagram' ? 'secondary' : 'outline'
                            }
                          >
                            {video.platform}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{video.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={video.isActive ? "default" : "secondary"}>
                            {video.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{video.views || 0}</TableCell>
                        <TableCell>{video.displayOrder}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(video.videoUrl, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleStatus(video._id)}
                            >
                              {video.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setOpenCreateVideoDialog(true);
                                setCurrentEditedId(video._id);
                                setFormData({
                                  title: video.title || '',
                                  description: video.description || '',
                                  embedCode: video.embedCode || '',
                                });
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteVideo(video._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : <TableRow>
                      <TableCell colSpan="7" className="text-center py-8">
                        <div className="text-gray-500">
                          <Play className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          No videos found. Add your first video!
                        </div>
                      </TableCell>
                    </TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Sheet
        open={openCreateVideoDialog}
        onOpenChange={() => {
          setOpenCreateVideoDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto w-full sm:w-[500px] sm:max-w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-lg sm:text-xl">
              {currentEditedId !== null ? "Edit Video" : "Add New Video"}
            </SheetTitle>
            <SheetDescription className="text-sm">
              Add videos easily - just enter the title, description, embed code and category. Platform is auto-detected!
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 sm:py-6">
            {/* Help section for simplified interface */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Quick Guide:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• <strong>Title:</strong> Enter an elegant, descriptive name for your video</li>
                <li>• <strong>Description:</strong> Share a beautiful description of your video content</li>
                <li>• <strong>Embed Code:</strong> Copy and paste the embed code from Facebook, Instagram, or YouTube</li>
              </ul>
              <p className="text-xs text-blue-600 mt-2 italic">Platform is automatically detected from your embed code!</p>
            </div>
            
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update Video" : "Add Video"}
              formControls={videoFormControls}
              isBtnDisabled={!isFormValid() || isLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminVideos;
