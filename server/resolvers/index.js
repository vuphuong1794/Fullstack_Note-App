import fakeData from "../fakeData/index.js";
import { AuthorModel, FolderModel, NoteModel } from "../models/index.js";

export const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({ authorId: context.uid });
      console.log({ folders, context });
      return folders;
      //return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      console.log({ folderId });
      const foundFolder = await FolderModel.findById(folderId);
      return foundFolder;
    },
    note: (parent, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  Folder: {
    author: (parent, args) => {
      console.log({ parent, args });
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
      //return { id: "123", name: "HoleTex" };
    },
    notes: (parent, args) => {
      console.log({ parent });
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: "123" });
      console.log({ newFolder });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const newUser = new AuthorModel(args);
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return newUser;
    },
  },
};
