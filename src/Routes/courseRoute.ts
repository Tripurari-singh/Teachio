import { Router } from "express";
import {  createcategory,  showAllcategory,  categoryPageDetails } from "../controllers/categoryHandeler";
import {  createCourse,  getAllCources,  getCourseDetails } from "../controllers/CoursesHandeler";
import {  createSection,  updateSection,  sectionDelete } from "../controllers/SectionHandeler";
import {  createSubSection,  SubsectionUpdate,  SubsectionDelete } from "../controllers/SubSectionHandeler";
import {  auth,  isInstructor,  isStudent, IsAdmin } from "../Middleware/Middlewares";
import {  createRating,  getAllRatings,  averageRating } from "../controllers/RatingAndReviewHandeler";

const router = Router();

router.post("/api/v1/category/create", auth, IsAdmin, createcategory);     
router.get("/api/v1/category/all", showAllcategory);                         
router.get("/api/v1/category/:id", categoryPageDetails);                     

router.post("/api/v1/course/create", auth, isInstructor, createCourse);     
router.get("/api/v1/course/all", getAllCources);                             
router.get("/api/v1/course/:id", getCourseDetails);                         

router.post("/api/v1/section/create", auth, isInstructor, createSection);   
router.put("/api/v1/section/update/:id", auth, isInstructor, updateSection);
router.delete("/api/v1/section/delete/:id", auth, isInstructor, sectionDelete); 

router.post("/api/v1/subsection/create", auth, isInstructor, createSubSection);  
router.put("/api/v1/subsection/update/:id", auth, isInstructor, SubsectionUpdate); 
router.delete("/api/v1/subsection/delete/:id", auth, isInstructor, SubsectionDelete); 

router.post("/api/v1/rating/create", auth, isStudent, createRating);        
router.get("/api/v1/rating/all", getAllRatings);                         
router.get("/api/v1/rating/average/:courseId", averageRating);             

export default router;
