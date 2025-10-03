// src/components/ImageUpload.js - FINAL FREE VERSION
"use client";
import { useState } from 'react';

export default function ImageUpload({ onImageUpload, currentImage, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // File size check (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB');
      return;
    }

    // File type check
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);

    // Convert to base64 - YAHI FREE SOLUTION HAI
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      setPreviewUrl(base64Data);
      onImageUpload(base64Data); // Base64 data parent ko bhejo
      
      if (onUploadComplete) {
        onUploadComplete();
      }
      setUploading(false);
    };
    
    reader.onerror = () => {
      alert('Error reading file. Please try another image.');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {previewUrl && (
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Preview:</p>
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-600 mx-auto"
          />
        </div>
      )}

      {/* Upload Section */}
      <div>
        <label className="block text-gray-300 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          <label className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer transition disabled:opacity-50">
            {uploading ? '📤 Uploading...' : '📷 Choose Image'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
          <span className="text-gray-400 text-sm">
            {uploading ? 'Processing...' : 'JPG, PNG, GIF (max 2MB)'}
          </span>
        </div>
      </div>
    </div>
  );
}