import { post,downloadUrl,fileUpload } from "@/utils/request"

export default {
  sectionKnowsList: id => post('/api/admin/section/knows/' + id),
  subjectPage: form => post('/api/admin/subject/page' ,form),
  getSubjectByid: id => post('/api/admin/subject/select/' + id),
  subjectEdit: form => post('/api/admin/subject/edit' , form),
  deleteSubjectById:id=>post('/api/admin/subject/delete/'+id),
  removeSubjectByIds:ids=>post('/api/admin/subject/delete',ids),
  removeKnows: id => post('/api/admin/section/knows/delete/'+id ),
  fileUpload: file => fileUpload('/api/admin/model/upload' ,file),
  exportUser: ids => downloadUrl('/api/admin/model/download', ids),
  semesterList: () => post('/api/admin/subject/semester/list' ),
  classPage: from => post('/api/class/page',from ),
  loginLog: from => post('/sys/logs/login/log/page' ,from),
  operationLog: from => post('/sys/logs/operation/log/page', from),
  removeUserLoginLogByIds: ids => post('/sys/logs/login/log/delete', ids),
  removeUserOperationLogByIds: ids => post('/sys/logs/operation/log/delete', ids),




  getClassStudents:form=>post('/api/class/stu/page',form),
  getStudentsByRole: form => post('/api/class/stuPage', form),

  getClassInfo: id => post('/api/class/'+id),
  
  removeStudentFromClass:(username,classId)=>post('/api/class/remove/stu/'+username+'/'+classId),
  addStudentToClass:(username,classId)=>post('/api/class/add/stu/'+username+'/'+classId),

}