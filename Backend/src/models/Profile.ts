import { Schema, model, Document } from "mongoose";

export interface IProfile extends Document {
  gender?: string;       
  dateOfBirth?: string;
  about?: string;
  contactNumber?: number;
}

const ProfileSchema = new Schema<IProfile>(
  {
    gender: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: Number,
    },
  },
  { timestamps: true } 
);

export const ProfileModel = model<IProfile>("Profile", ProfileSchema);
