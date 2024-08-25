import React, { useEffect, useState } from "react";
import dbService from "../appWrite/databaseConfig";
import DataTable from "../components/DataTable";

const ITEMS_PER_PAGE = 10;

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await dbService.getQuestions();
      if (response && response.documents) {
        setQuestions(response.documents);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const columns = [
    { Header: "Question ID", accessor: "id" },
    { Header: "Question Title", accessor: "title" },
    { Header: "Difficulty", accessor: "difficulty" },
    { Header: "Question Type", accessor: "type" },
    { Header: "Created At", accessor: "createdAt" },
  ];

  const formattedData = questions.map((question) => ({
    id: question.$id,
    title: question.title,
    difficulty: question.difficulty,
    type: question.type,
    createdAt: new Date(question.$createdAt).toLocaleString(),
  }));

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Question List
      </h2>
      <DataTable
        columns={columns}
        data={formattedData}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default QuestionList;
