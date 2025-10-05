import { Router } from "express";
import {  createcategory,  showAllcategory,  categoryPageDetails } from "../controllers/categoryHandeler";
import {  createCourse,  getAllCources,  getCourseDetails } from "../controllers/CoursesHandeler";
import {  createSection,  updateSection,  sectionDelete } from "../controllers/SectionHandeler";
import {  createSubSection,  SubsectionUpdate,  SubsectionDelete } from "../controllers/SubSectionHandeler";
import {  auth,  isInstructor,  isStudent, IsAdmin } from "../Middleware/Middlewares";
import {  createRating,  getAllRatings,  averageRating } from "../controllers/RatingAndReviewHandeler";

const router = Router();

router.post("/create", auth, IsAdmin, createcategory);     
router.get("/all", showAllcategory);                         
router.get("/:id", categoryPageDetails);                     

router.post("/create", auth, isInstructor, createCourse);     
router.get("/all", getAllCources);                             
router.get("/:id", getCourseDetails);                         

router.post("/create", auth, isInstructor, createSection);   
router.put("/update/:id", auth, isInstructor, updateSection);
router.delete("/delete/:id", auth, isInstructor, sectionDelete); 

router.post("/create", auth, isInstructor, createSubSection);  
router.put("/update/:id", auth, isInstructor, SubsectionUpdate); 
router.delete("/delete/:id", auth, isInstructor, SubsectionDelete); 

router.post("/create", auth, isStudent, createRating);        
router.get("/all", getAllRatings);                         
router.get("/average/:courseId", averageRating);             

export default router;
