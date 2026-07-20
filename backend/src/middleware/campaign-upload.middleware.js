import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const handleCampaignUpload = (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error) {
      const isFileTooLarge =
        error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE";

      return res.status(isFileTooLarge ? 413 : 400).json({
        success: false,
        message: isFileTooLarge
          ? "File is too large"
          : error.message || "Failed to upload file",
      });
    }

    return next();
  });
};