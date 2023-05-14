import { post } from "@/utils/request";

export default {
  getMyTeachCourseClass:form =>post('/api/teacher/course/class/page',form),
  getMyTeachCourse:form =>post('/api/admin/subject/page',form),
  getMyTeachCourseList: () => post('/api/teacher/subject/list'),


  getCourseList: () => post('/api/subject/list'),
  
  getMyTeachCourseClassStudents:form =>post('/api/teacher/course/stu/page',form),

  removeStudentFromClass:(username,classId)=>post('/api/teacher/remove/stu/'+username+'/'+classId),
  addStudentToClass:(username,classId)=>post('/api/teacher/add/stu/'+username+'/'+classId),


  addMyTeachCourseClass:form =>post('/api/teacher/course/class/edit',form),
  getClassInfo: id => post('/api/teacher/course/class/' + id),
  addStudentWithClass: (form,id) => post('/api/teacher/add/stu/'+id,form),




  getClassList: () => post('/api/class/list'),
  getMyCourseClassList: () => post('/api/teacher/course/class/list'),




  questionEdit: form => post('/api/question/edit',form),
  questionPage: form => post('/api/question/page',form),
  getQuestionById: id => post('/api/question/select/'+id),
  delQuestionById: id => post('/api/question/delete/' + id),
  



  paperEdit: form => post('/api/exam/paper/edit',form),
  paperPage: form => post('/api/exam/paper/page',form),
  getPaperById: id => post('/api/exam/paper/select/'+id),
  delPaperById: id => post('/api/exam/paper/delete/' + id),
  
  selectStudentPaperAnswers: id => post('/api/admin/examPaperAnswer/answer/'+id),

  releaseExamPage: form => post('/api/exam/release/page',form),
  releaseExamEdit: form => post('/api/exam/release/edit',form),
  getReleaseExamById: id => post('/api/exam/release/select/' + id),
  



  selectStudentPageAnswers: form => post('/api/admin/examPaperAnswer/page', form),
  


  selectReleaseExamPaper: form => post('/api/exam/release/paper/page', form),
  

  correctPaper: form => post('/api/admin/examPaperAnswer/answer/correct',form),



  autoCreatePaper: form => post('/api/exam/paper/autoCreatePaper',form),

}