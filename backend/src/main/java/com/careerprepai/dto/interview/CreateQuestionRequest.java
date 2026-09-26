package com.careerprepai.dto.interview;

public class CreateQuestionRequest {

    private Integer questionNumber;

    private String questionText;

    public CreateQuestionRequest() {
    }

    public Integer getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(Integer questionNumber) {
        this.questionNumber = questionNumber;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
}