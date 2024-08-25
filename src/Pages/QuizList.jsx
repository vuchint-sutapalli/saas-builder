import React, { useEffect, useState } from "react";
import dbService from "../appWrite/databaseConfig";
import DataTable from "../components/DataTable";
// import DataTable from "./DataTable";

const ITEMS_PER_PAGE = 10;

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await dbService.getQuizzes(); // Ensure getQuizzes function exists in dbService
      if (response && response.documents) {
        setQuizzes(response.documents);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const columns = [
    { Header: "Quiz ID", accessor: "id" },
    { Header: "Quiz Title", accessor: "title" },
    { Header: "Total Questions", accessor: "qncount" },
    { Header: "Created By", accessor: "createdBy" },
    { Header: "Created At", accessor: "createdAt" },
  ];

  const formattedData = quizzes.map((quiz) => ({
    id: quiz.$id,
    title: quiz.quizTitle,
    createdBy: quiz.createdBy,
    qncount: quiz.questions?.length,
    createdAt: new Date(quiz.$createdAt).toLocaleString(),
  }));

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Quiz List
      </h2>
      <DataTable
        columns={columns}
        data={formattedData}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default QuizList;
