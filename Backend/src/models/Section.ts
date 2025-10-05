import mongoose, { model, Schema } from "mongoose";

interface Isection {
    sectionName: string;
    subsection: mongoose.Types.ObjectId[]; 
}

const SectionSchema = new Schema<Isection>({
    sectionName: {
        type: String,
        required: true, 
        trim: true,
    },
    subsection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
            required: true,
        }
    ]
});

export const SectionModel = model<Isection>("Section", SectionSchema);
