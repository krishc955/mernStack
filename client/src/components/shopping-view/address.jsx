import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            setIsAddressFormOpen(false); // Close form after successful edit
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            setIsAddressFormOpen(false); // Close form after successful add
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setIsAddressFormOpen(true); // Open form when editing
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  // Auto-open form if no addresses exist
  useEffect(() => {
    if (addressList && addressList.length === 0 && !isAddressFormOpen) {
      setIsAddressFormOpen(true);
    }
  }, [addressList]);

  console.log(addressList, "addressList");

  return (
    <div className="space-y-4">
      {/* Existing Addresses Grid */}
      {addressList && addressList.length > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {addressList.map((singleAddressItem) => (
            <AddressCard
              key={singleAddressItem._id}
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))}
        </div>
      )}
      
      {/* Add New Address Section */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <div 
          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            currentEditedId !== null ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
          }`}
          onClick={() => setIsAddressFormOpen(!isAddressFormOpen)}
        >
          <div className="flex items-center gap-2">
            <Plus className={`h-4 w-4 ${currentEditedId !== null ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className={`font-medium ${currentEditedId !== null ? 'text-blue-600' : 'text-gray-700'}`}>
              {currentEditedId !== null ? "Edit Address" : "Add New Address"}
            </span>
            {currentEditedId !== null && (
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                Editing
              </span>
            )}
          </div>
          {isAddressFormOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isAddressFormOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <CardContent className="space-y-4 pt-0 pb-4">
            <CommonForm
              formControls={addressFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update Address" : "Add Address"}
              onSubmit={handleManageAddress}
              isBtnDisabled={!isFormValid()}
            />
            {(currentEditedId !== null || isAddressFormOpen) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddressFormOpen(false);
                  setCurrentEditedId(null);
                  setFormData(initialAddressFormData);
                }}
                className="w-full"
              >
                Cancel
              </Button>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Address;
