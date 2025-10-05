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
exports.categoryPageDetails = exports.showAllcategory = exports.createcategory = void 0;
const zod_1 = __importDefault(require("zod"));
const category_1 = require("../models/category");
const createcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch Data
        const TagSchema = zod_1.default.object({
            name: zod_1.default.string(),
            description: zod_1.default.string(),
        });
        const { name, description } = TagSchema.parse(req.body);
        // Both Feild are required Validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Both feilds Are Required"
            });
        }
        // Add to UserModel
        const tagDetails = yield category_1.categoryModel.create({
            name: name,
            description: description, z: zod_1.default
        });
        console.log(tagDetails);
        // Return The Respnnse
        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while Creating Category...",
        });
    }
});
exports.createcategory = createcategory;
//  Get All Tags Handeler Function
const showAllcategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all Tags That have name , description
        const allcategory = yield category_1.categoryModel.find({}, {
            name: true,
            description: true,
        });
        return res.status(200).json({
            success: true,
            message: "All Tags Returned Successfully",
            allcategory,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while Getting All Categories....",
        });
    }
});
exports.showAllcategory = showAllcategory;
const categoryPageDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Categoty id
        const categoryId = req.body;
        // Fetch all the courses for that CategoryId
        const selectedCategoryCourses = yield category_1.categoryModel.findById(categoryId)
            .populate("courses").exec();
        // validation
        if (!selectedCategoryCourses) {
            return res.status(400).json({
                success: false,
                message: "Failed to Fetch the cources Related To Category"
            });
        }
        // get cources for different categories
        const differentCategoriesCourses = yield category_1.categoryModel.findById({
            _id: { $ne: categoryId }
        }).populate("courses").exec();
        // get top selling courses => Determine Top selling cources
        // Return response
        return res.status(200).json({
            success: true,
            message: "Category page Details Fetched Successfullly",
            selectedCategoryCourses,
            differentCategoriesCourses,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something wrong Happened while Getting category pages Content....",
        });
    }
});
exports.categoryPageDetails = categoryPageDetails;
