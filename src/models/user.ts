import mongoose, { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  FirstName: string;
  LastName: string;
  email: string;
  password: string;
  token: string,
  resetPasswordExpires : Date,
  accountType: "Admin" | "student" | "Instructor";
  additionalDetals: mongoose.Types.ObjectId;
  courses: mongoose.Types.ObjectId[];
  image: string;
  courseProgress: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    FirstName: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    accountType: {
      type: String,
      enum: ["Admin", "student", "Instructor"],
      required: true,
    },
    additionalDetals: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    token : {
      type : String,
    },
    resetPasswordExpires : {
      type : Date
    },
    courses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: [] },
    ],
    image: { type: String, required: true },
    courseProgress: [
      { type: mongoose.Schema.Types.ObjectId, ref: "CourseProgress" },
    ],
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
