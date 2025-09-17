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
exports.sectionDelete = exports.updateSection = exports.createSection = void 0;
const zod_1 = __importDefault(require("zod"));
const Section_1 = require("../models/Section");
const createSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch Data & Validation
        const sectionInputschema = zod_1.default.object({
            sectionName: zod_1.default.string(),
            courseId: zod_1.default.string(),
        });
        const { sectionName, courseId } = sectionInputschema.parse(req.body);
        // Create Section
        const sectionDetails = yield Section_1.SectionModel.create({ sectionName });
        // Update coursModel with section -> ObjectId
        const updatedCourseDetails = yield Section_1.SectionModel.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: sectionDetails._id,
            }
        }, {
            new: true
        });
        // Return Response
        return res.status(200).json({
            success: true,
            message: "SEction Created Successfully !",
            data: updatedCourseDetails,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened during creating a Section",
        });
    }
});
exports.createSection = createSection;
const updateSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch Data
        const sectionUpdateInputschema = zod_1.default.object({
            sectionName: zod_1.default.string(),
            sectionId: zod_1.default.string(),
        });
        const { sectionName, sectionId } = sectionUpdateInputschema.parse(req.body);
        // Update 
        const updatedDetails = yield Section_1.SectionModel.findByIdAndUpdate(sectionId, {
            sectionName: sectionName
        }, {
            new: true
        });
        // Return response
        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            data: updatedDetails
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened during Updating a Section",
        });
    }
});
exports.updateSection = updateSection;
const sectionDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch
        const { sectionId } = req.params;
        // Delete
        yield Section_1.SectionModel.findByIdAndDelete(sectionId);
        //Return Response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened during Deleting a Section",
        });
    }
});
exports.sectionDelete = sectionDelete;
