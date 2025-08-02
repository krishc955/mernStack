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
  videoUrl: "",
  embedCode: "",
  platform: "facebook",
  thumbnail: "",
  category: "fashion",
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
      const url = currentEditedId
        ? `${import.meta.env.VITE_API_URL}/api/admin/videos/update/${currentEditedId}`
        : `${import.meta.env.VITE_API_URL}/api/admin/videos/add`;
      
      const method = currentEditedId ? "PUT" : "POST";

      const result = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      <div className="mb-5 w-full flex justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Video Management</h1>
          <div className="flex gap-2">
            <select 
              value={filters.platform}
              onChange={(e) => setFilters({...filters, platform: e.target.value})}
              className="px-3 py-1 border rounded-md text-sm"
            >
              <option value="all">All Platforms</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
            
            <select 
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-3 py-1 border rounded-md text-sm"
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
              className="px-3 py-1 border rounded-md text-sm"
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
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Video
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Videos ({videosList.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Actions</TableHead>
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
                              className="w-12 h-8 object-cover rounded"
                            />
                          )}
                          <div>
                            <div className="font-medium">{video.title}</div>
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
                                ...video,
                                tags: video.tags ? video.tags.join(', ') : '',
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
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Video" : "Add New Video"}
            </SheetTitle>
            <SheetDescription>
              Add social media videos to display on your website
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
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
