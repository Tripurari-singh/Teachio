import { Schema, model } from "mongoose";

export interface ISubSection {
  title: string;
  timeDuration: string;
  description: string;
  videoUrl: string;
}

const SubSectionSchema = new Schema<ISubSection>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  timeDuration: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

export const SubSectionModel = model<ISubSection>( "SubSection",  SubSectionSchema);
