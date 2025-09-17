"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubsectionUpdate = exports.SubsectionDelete = exports.createSubSection = void 0;
const SubSection_1 = require("../models/SubSection");
const Section_1 = require("../models/Section");
const zod_1 = __importDefault(require("zod"));
const ImageUploader_1 = require("../utils/ImageUploader");
// Create SubSection
const createSubSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Fetch data & Validation
        const SubSectionInputSchema = zod_1.default.object({
            sectionId: zod_1.default.string(),
            title: zod_1.default.string(),
            timeDuration: zod_1.default.string(),
            description: zod_1.default.string(),
        });
        const { sectionId, title, timeDuration, description } = SubSectionInputSchema.parse(req.body);
        // Extract File
        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({
                success: false,
                message: "Video File Missing"
            });
        }
        const video = req.files.videoFile;
        // Some Typescript Fixxes
        let videoFile;
        if (Array.isArray(req.files.videoFile)) {
            videoFile = req.files.videoFile[0]; // take the first file if multiple uploaded
        }
        else {
            videoFile = req.files.videoFile;
        }
        // Upload video at cloudanary / fetch secure_url
        const uploadDetails = yield (0, ImageUploader_1.uploadImageToCloudinary)(videoFile, (_a = process.env.FOLDER_NAME) !== null && _a !== void 0 ? _a : "default_folder");
        // Create
        const subSectionDetails = yield SubSection_1.SubSectionModel.create({
            title: title,
            description: description,
            timeDuration: timeDuration,
            videoUrl: uploadDetails.secure_url,
        });
        // update Section weith subsection => ObjectId just created
        const updatedSection = yield Section_1.SectionModel.findByIdAndUpdate(sectionId, {
            $push: {
                subsection: subSectionDetails._id
            }
        }, {
            new: true
        }).populate("subsection").exec();
        // Return Response
        return res.status(200).json({
            success: true,
            message: "SubSection Created Successfully",
            data: updatedSection
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something wrong Happened while creating The SubSection"
        });
    }
});
exports.createSubSection = createSubSection;
// Update SubSection
const SubsectionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch Data
        const SubSectionInputSchema = zod_1.default.object({
            subsectionId: zod_1.default.string(),
            title: zod_1.default.string(),
            timeDuration: zod_1.default.string(),
            description: zod_1.default.string(),
        });
        const { subsectionId, title, description, timeDuration, } = SubSectionInputSchema.parse(req.body);
        // Update
        const updatedSubSectionDetails = yield SubSection_1.SubSectionModel.findByIdAndUpdate(subsectionId, {
            title,
            description,
            timeDuration
        }, {
            new: true
        });
        // Return
        return res.status(200).json({
            success: true,
            message: "SubSection Updated Suuccessully",
            data: updatedSubSectionDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened during Deleting a SubSection",
        });
    }
});
exports.SubsectionDelete = SubsectionDelete;
// Delete SubSection
const SubsectionUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch
        const { subsectionId } = req.body;
        // Delete
        yield SubSection_1.SubSectionModel.findByIdAndDelete(subsectionId);
        // Return Response
        return res.status(200).json({
            success: true,
            message: "SubSection Deleted Suuccessully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened during Updateing a SubSection",
        });
    }
});
exports.SubsectionUpdate = SubsectionUpdate;
