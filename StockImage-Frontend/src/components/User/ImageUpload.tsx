import React, { useState } from 'react';
import { type TImageUpload } from '../../types/image.types';
import { Upload, X } from 'lucide-react';
import ImageService from '../../services/imageService';
import { toast } from 'react-toastify';

interface ImageUploadProps {
  userId: string;
  update: (val: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ userId, update }) => {
  const [images, setImages] = useState<TImageUpload[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTitle = (index: number, value: string) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, title: value } : img))
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files).map((file, i) => ({
      file,
      title: '',
      preview: URL.createObjectURL(file),
      order: images.length + i,
    }));
    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      const files = images.map((image) => image.file);
      const titles = images.map((image) => image.title);
      const orders = images.map((image) => image.order);

      files.forEach((file) => formData.append('images', file));

      formData.append('titles', JSON.stringify(titles));
      formData.append('orders', JSON.stringify(orders));
      formData.append('userId', userId);

      const res = await ImageService.uploadImages(formData);
      if (res) {
        toast.success('Successfully uploaded images');
        setImages([]);
        update(true);
      } else {
        toast.error('Upload images failed');
      }
    } catch (error) {
      toast.error('An error occurred while uploading');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Clear all selected images
    images.forEach((img) => URL.revokeObjectURL(img.preview)); // Clean up memory
    setImages([]);
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Upload Section - Always visible */}
      <div className="mb-8">
        <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-teal-300 rounded-2xl cursor-pointer bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-16 h-16 mb-4 rounded-full bg-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-8 h-8 text-teal-600" />
            </div>
            <p className="mb-2 text-lg font-semibold text-gray-700">
              <span className="text-teal-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            {images.length > 0 && (
              <p className="mt-3 text-sm font-medium text-teal-600">
                {images.length} image{images.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Selected Images Preview & Form */}
      {images.length > 0 && (
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Selected Images ({images.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
                >
                  {/* Remove Button */}
                  <button
                    aria-label='remove-button'
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image Preview */}
                  <div className="relative h-32 overflow-hidden bg-gray-100">
                    <img
                      src={img.preview}
                      alt={img.title || `Image ${ idx + 1 }`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Title Input */}
                  <div className="p-3">
                    <input
                      type="text"
                      value={img.title}
                      onChange={(e) => handleTitle(idx, e.target.value)}
                      placeholder="Enter title..."
                      className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">#{idx + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Save Images
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ImageUpload;
