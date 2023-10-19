import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //tu dong them createdAt và updateAt
);

const FolderModel = mongoose.model("Folder", folderSchema);
export default FolderModel;
