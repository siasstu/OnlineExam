import { post } from "@/utils/request";

export default {
  myExams: () => post('/api/student/exam/paper/page'),
  handleExam: form => post('/api/student/exam/paper/answerSubmit', form),
  

  myScore: form => post('/api/student/score/page',form),
  getErrorQuestion: form => post('/api/student/question/error/page', form),
  


  getTestPage: form => post('/api/student/test/page', form),
  
  getTestPaperById: id => post('/api/student/test/select/'+id),
  
  getTest: form => post('/api/student/test/create',form),
   
}