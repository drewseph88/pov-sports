"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, FileVideo } from "lucide-react";
import { supabase } from "@/lib/supabase";

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime"];

const uploadSchema = z.object({
  sport: z.string().min(1, "Please select a sport"),
  socialHandle: z.string().optional(),
  eventDate: z.string().min(1, "Please enter the event date"),
  city: z.string().min(1, "Please enter the city"),
  description: z.string().optional(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

const sportOptions = [
  { value: "nba", label: "NBA (Basketball)" },
  { value: "nfl", label: "NFL (Football)" },
  { value: "ufc", label: "UFC / MMA" },
  { value: "soccer", label: "Soccer" },
  { value: "other", label: "Other" },
];

const placeholderExamples = [
  "Game-winning shot from behind the basket",
  "Crowd reaction after the knockout",
  "Final whistle from the supporters section",
];

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  // Cycle through placeholder examples
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      return "Please upload an MP4 or MOV file";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 500MB";
    }
    return null;
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    const error = validateFile(selectedFile);
    if (error) {
      setFileError(error);
      setFile(null);
    } else {
      setFileError(null);
      setFile(selectedFile);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const onSubmit = async (data: UploadFormData) => {
    if (!file) {
      setFileError("Please upload a video file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Generate a unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `submissions/${fileName}`;

      // Upload video to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("clip-videos")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      setUploadProgress(70);

      // Get the public URL for the uploaded video
      const { data: urlData } = supabase.storage
        .from("clip-videos")
        .getPublicUrl(filePath);

      // Save submission data to clip_submissions table
      const { error: dbError } = await supabase
        .from("clip_submissions")
        .insert({
          sport: data.sport,
          social_handle: data.socialHandle || null,
          event_date: data.eventDate,
          city: data.city,
          description: data.description || null,
          video_url: urlData.publicUrl,
          video_path: filePath,
          original_filename: file.name,
          file_size: file.size,
        });

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      setUploadProgress(100);

      // Small delay to show 100% before redirect
      await new Promise((resolve) => setTimeout(resolve, 300));

      router.push("/upload/success");
    } catch (error) {
      setFileError(error instanceof Error ? error.message : "An error occurred during submission");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Submit your POV clip
          </h1>
          <p className="text-text-muted text-lg">
            Upload the full-quality video you filmed at the game. We&apos;ll
            review it and credit you if it&apos;s featured.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload Zone */}
          <div className="mb-8">
            <div
              onClick={() => !file && !isUploading && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-250 ${
                isDragging
                  ? "border-accent bg-accent/10"
                  : file
                  ? "border-border bg-surface"
                  : "border-border hover:border-text-subtle cursor-pointer"
              } ${isUploading ? "pointer-events-none opacity-75" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.mov,video/mp4,video/quicktime"
                onChange={handleInputChange}
                className="hidden"
                disabled={isUploading}
              />

              {!file ? (
                <div className="py-8">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-text-subtle" />
                  <p className="text-lg font-medium mb-2">
                    Drag & drop your video or click to upload
                  </p>
                  <p className="text-text-subtle text-sm">
                    Full quality — no compression • MP4, MOV up to 500MB
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-4 py-4">
                  <div className="w-12 h-12 bg-surface-hover rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileVideo className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-text-subtle text-sm">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  {!isUploading && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="w-10 h-10 flex items-center justify-center text-text-subtle hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="mt-4">
                  <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-text-muted text-sm mt-2">
                    Uploading your clip...
                  </p>
                </div>
              )}
            </div>

            {fileError && (
              <p className="text-red-400 text-sm mt-2">{fileError}</p>
            )}

            <p className="text-text-subtle text-xs mt-3">
              This replaces sending clips via DM
            </p>
          </div>

          {/* Sport/League */}
          <div>
            <label
              htmlFor="sport"
              className="block text-sm font-medium mb-2"
            >
              Sport / League <span className="text-red-400">*</span>
            </label>
            <select
              id="sport"
              {...register("sport")}
              disabled={isUploading}
              className="w-full px-4 py-3 bg-surface border border-border rounded-[12px] text-white focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            >
              <option value="">Select a sport</option>
              {sportOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.sport && (
              <p className="text-red-400 text-sm mt-1">{errors.sport.message}</p>
            )}
          </div>

          {/* Social Handle */}
          <div>
            <label
              htmlFor="socialHandle"
              className="block text-sm font-medium mb-2"
            >
              Your social handle
            </label>
            <input
              id="socialHandle"
              type="text"
              placeholder="@yourhandle"
              {...register("socialHandle")}
              disabled={isUploading}
              className="w-full px-4 py-3 bg-surface border border-border rounded-[12px] text-white placeholder:text-text-subtle focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            />
            <p className="text-text-subtle text-xs mt-1">
              So we can credit you if this clip is featured.
            </p>
          </div>

          {/* Event Date */}
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium mb-2"
            >
              Event date <span className="text-red-400">*</span>
            </label>
            <input
              id="eventDate"
              type="date"
              {...register("eventDate")}
              disabled={isUploading}
              className="w-full px-4 py-3 bg-surface border border-border rounded-[12px] text-white focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50 [color-scheme:dark]"
            />
            {errors.eventDate && (
              <p className="text-red-400 text-sm mt-1">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              City <span className="text-red-400">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="Phoenix, AZ"
              {...register("city")}
              disabled={isUploading}
              className="w-full px-4 py-3 bg-surface border border-border rounded-[12px] text-white placeholder:text-text-subtle focus:border-accent focus:ring-1 focus:ring-accent transition-colors disabled:opacity-50"
            />
            {errors.city && (
              <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Clip description
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder={placeholderExamples[placeholderIndex]}
              {...register("description")}
              disabled={isUploading}
              className="w-full px-4 py-3 bg-surface border border-border rounded-[12px] text-white placeholder:text-text-subtle focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none disabled:opacity-50"
            />
            <p className="text-text-subtle text-xs mt-1">
              Add context or a caption — what&apos;s happening in the clip?
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full sm:max-w-[400px] sm:mx-auto sm:block px-8 py-4 min-h-touch text-base font-semibold text-black bg-white rounded-[12px] hover:bg-white/90 transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Submit POV clip"}
            </button>
            <p className="text-text-subtle text-xs text-center mt-4 max-w-sm mx-auto">
              By submitting, you confirm this is footage you filmed and you
              allow POV to share it with credit.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
