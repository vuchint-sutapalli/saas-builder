import React from "react";

const QuestionSelector = ({ question, isSelected, onCheckboxChange }) => {
  const questionId = question.$id;
  const checkboxId = `checkbox-${question.$id}`;
  return (
    <div
      key={questionId}
      className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={isSelected}
        onChange={() => onCheckboxChange(questionId)}
        className="form-checkbox h-5 w-5 text-indigo-600"
      />
      <label htmlFor={checkboxId} className="ml-3 text-gray-700 font-medium">
        {question.title}
      </label>
    </div>
  );
};

export default QuestionSelector;
