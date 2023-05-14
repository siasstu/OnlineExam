import { fileUpload, post ,get} from "@/utils/request"

export default {
  login: from => post('/api/user/login?'+ from),
  logout: () => post('/api/user/logout'),
  userInfoEdit: from => post('/api/user/edit',from),
  passwordEdit: from => post('/api/user/edit/password', from),
  userPage: from => post('/api/user/page', from),
  statusUpdade: (id,status) => post('/api/user/updateStatus/'+id+'/status/'+status),
  checkUsername: from => post('/api/user/checkUsername',from),
  removeUserByIds: ids => post('/api/user/delete',ids),
  resetPassword: id => post('/api/user/resetPassword/'+id),
  roleList: () => post('/api/role/list'),
  rolePage: from => post('/api/role/page',from),
  editUserRole: (userId,roleList) => post('/api/role/grantRole/'+userId,roleList),
  roleEdit: from => post('/api/role/edit',from),
  removeRoleByIds: ids => post('/api/role/delete',ids),
  munuList: () => post('/api/menu/treeList'),
  roleMenuList: id => post('/api/role/menus/list/'+id),
  editRoleMenu: (id, list) => post('/api/role/updateMenus/' + id, list),
  removeMenu: id=>post('/api/menu/delete/'+id),
  editMenu: form=>post('/api/menu/edit',form),
  getRoleById: id=>post('/api/role/select/'+id),
  getMenuBuId: id=>post('/api/menu/select/'+id),
  getUserByid: id=>post('/api/user/select/'+id),
  avatorEdit: file => fileUpload('/api/user/updateAvatar', file),
  imageEdit: file => fileUpload('/api/user/imageUpload', file),

}
