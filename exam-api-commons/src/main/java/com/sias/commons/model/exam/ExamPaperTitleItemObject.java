package com.sias.commons.model.exam;

import lombok.Data;

import java.util.List;

@Data
public class ExamPaperTitleItemObject {

    private String name;

    private List<ExamPaperQuestionItemObject> questionItems;

    private Integer score;
}