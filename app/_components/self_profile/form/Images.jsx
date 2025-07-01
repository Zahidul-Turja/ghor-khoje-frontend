import { Upload, Trash2 } from "lucide-react";

function Images({
  activeTab,
  formData,
  handleImageUpload,
  handleRemoveImage,
  handleImageDescriptionChange,
  dragActive,
  handleDrag,
  handleDrop,
}) {
  return (
    <div className={activeTab === "images" ? "block" : "hidden"}>
      <div className="space-y-6">
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <div
            className={`rounded-lg border-2 border-dashed p-6 text-center ${
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload size={36} className="text-gray-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drag & drop images here
                </p>
                <p className="text-sm text-gray-500">or</p>
              </div>
              <label className="cursor-pointer rounded-lg bg-primary/70 px-4 py-2 font-medium text-white transition-colors hover:bg-primary/70">
                Browse Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </label>
              <p className="text-xs text-gray-500">
                Upload up to 10 images (max 5MB each)
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Property Images
          </label>
          <div className="space-y-4">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:bg-gray-950"
              >
                <div className="flex w-full items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-950">
                    <img
                      src={image.preview}
                      alt={`Property image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center">
                    <textarea
                      type="text"
                      placeholder="Please describe what the image is about"
                      value={image.description}
                      onChange={(e) =>
                        handleImageDescriptionChange(index, e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 p-2 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-950 dark:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-gray-500 sm:p-3 sm:text-base"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="ml-4 rounded p-1 text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {formData.images.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                <p className="text-gray-500">No images uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Images;
