import API from "./api";

export const getAllCourses    = async () => (await API.get("/courses/getAllCourses")).data;
export const getCourseDetails = async (id: string) =>
  (await API.get("/courses/getCourseDetails", { params: { courseId: id } })).data;
export const getEnrolledCourses = async () =>
  (await API.get("/profile/getEnrolledCourses")).data;
