package com.sias.admin.mapper;

import com.sias.commons.mapper.BaseMapper;
import com.sias.commons.model.Courseclass;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author 123
* @description 针对表【courseclass】的数据库操作Mapper
* @createDate 2023-03-30 22:17:40
* @Entity com.sias.commons.model.Courseclass
*/
@Mapper
public interface CourseclassMapper extends BaseMapper<Courseclass> {


  List<Courseclass> page(String username);

}
