import { useState, useEffect, useContext } from "react";
import { Pencil, Trash2, User, Mail, Phone, LogOut, Camera, Save, Image as ImageIcon, KeyRound, AlertTriangle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { type TResetPassword, type TResponseType, type TUserData } from "../../types/auth.types";
import { type TImage } from "../../types/image.types";
import ImageService from "../../services/imageService";
import ImageUpload from "./ImageUpload";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Modal from "../Modal";
import EditImage from "./EditImage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageCard from "./DragAndDrop";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import ResetPassword from "../Auth/ResetPassword";
import { AuthContext } from "../../Contexxt/authContext";


export default function ProfilePage() {
  const [uploaded, setUploaded] = useState<TImage[]>([]);
  const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}/uploads/`;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isChange, setOrderChange] = useState<boolean>(false);
  const [isResetPassword, setResetPassword] = useState<boolean>(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);
  const context = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editImage, setEditImage] = useState<{
    id: string;
    image: string;
    title: string;
  }>({
    id: "",
    image: "",
    title: "",
  });
  const [user, setUser] = useState<TUserData>({
    id: "",
    name: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;


  useEffect(() => {
    setUser(userData);
    const fetchData = async () => {
      const uploadedImages = await ImageService.fetchImages(userData.id);
      setUploaded(uploadedImages);
    };
    fetchData();
  }, [userData, refreshKey]);


  const handleUploadComplete = (shouldRefresh: boolean) => {
    if (shouldRefresh) {
      setRefreshKey((prev) => prev + 1);
    }
  };


  const handleEdit = (image: TImage) => {
    Swal.fire({
      title: "Edit Image?",
      text: "You can update the title or replace the image.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setModalOpen(true);
        setEditImage({ id: image._id, image: image.image, title: image.title });
      }
    });
  };


  const handleDelete = async (imageId: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#9333ea",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await ImageService.deleteImage(imageId);
          if (res) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setUploaded((prev) => prev.filter((img) => img._id !== imageId));
          } else {
            toast.error("Failed to delete image");
          }
        }
      });
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
    }
  };


  const handleImageSave = async (file: File, value: string) => {
    setModalOpen(false);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", JSON.stringify(value));
    const res = await ImageService.editImage(formData, editImage.id);
    setUploaded((prev) =>
      prev.map((val) => (val._id === editImage.id ? res : val))
    );
  };


  const moveImage = (from: number, to: number) => {
    const updated = [...uploaded];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setOrderChange(true);
    setUploaded(updated);
  };


  const handelChange = async () => {
    const updated = uploaded.map((image, index) => ({ ...image, order: index + 1 }));
    console.log("New order of Images ::", updated);
    const res = await ImageService.saveOrderChanges(updated);
    if (res) {
      setOrderChange(false);
      toast.success("Successfully changed order");
    }
  };


  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };


  const handleLogoutConfirm = async () => {
    const res: TResponseType = await authService.userLogout();
    if (res.success) {
      localStorage.removeItem("accessToken");
      context?.logout();
      toast.success(res.message);
      navigate("/");
    }
    setLogoutModalOpen(false);
  };


  const handleResetPassword = () => {
    setResetPassword(true);
  };


  const handleReset = async (data: TResetPassword) => {
    console.log(data);
    setResetPassword(false);
    const res: TResponseType = await ImageService.resetPassword(data);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <nav className="w-full bg-white/90 backdrop-blur-lg shadow-lg px-6 py-4 flex justify-between items-center border-b border-purple-100 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              RePix
            </h1>
          </div>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>


        {/* Profile Section */}
        <div className="max-w-5xl mx-auto mt-10 px-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-purple-100">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-purple-100">
              <div className="relative">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl">
                  <User size={48} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
              </div>


              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-2 justify-center sm:justify-start">
                  <Camera size={14} />
                  Member since 2025
                </p>
              </div>


              {/* Reset Password Button */}
              <button
                onClick={handleResetPassword}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <KeyRound size={16} />
                Reset Password
              </button>
            </div>


            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 mb-1">Email Address</p>
                  <p className="text-gray-800 font-medium truncate">{user.email}</p>
                </div>
              </div>


              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                  <p className="text-gray-800 font-medium">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto mt-10 px-4 pb-10">
          {uploaded.length > 0 ? (
            <div>
              {/* Gallery Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    Your Gallery
                  </h2>
                  <p className="text-gray-600">{uploaded.length} images in your collection</p>
                </div>
              </div>


              {/* Upload Component */}
              <div className="mb-8">
                <ImageUpload userId={user.id} update={handleUploadComplete} />
              </div>


              {/* Images Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {uploaded.map((image, index) => (
                  <div key={image._id} className="relative group">
                    <ImageCard
                      image={image}
                      index={index}
                      moveImage={moveImage}
                      baseUrl={`${baseUrl}${image.image}`}
                    />


                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        aria-label="edit image"
                        onClick={() => handleEdit(image)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        aria-label="delete image"
                        onClick={() => handleDelete(image._id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>


              {/* Save Order Button */}
              {isChange && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handelChange}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Save size={20} />
                    Save New Order
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageUpload userId={user.id} update={handleUploadComplete} />
            </div>
          )}
        </div>


        {/* Modals */}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <EditImage
              url={`${baseUrl}/${editImage.image}`}
              title={editImage.title}
              onSave={handleImageSave}
            />
          </Modal>
        )}


        {isResetPassword && (
          <Modal isOpen={isResetPassword} onClose={() => setResetPassword(false)}>
            <ResetPassword userId={userData.id} onReset={handleReset} />
          </Modal>
        )}


        {/* Logout Confirmation Modal */}
        {isLogoutModalOpen && (
          <Modal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
            <div className="p-6 max-w-md">
              <div className="flex flex-col items-center text-center">
                {/* Warning Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle size={32} className="text-red-600" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Confirm Logout
                </h2>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  Are you sure you want to logout? You will need to login again to access your account.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setLogoutModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogoutConfirm}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </DndProvider>
  );
}
