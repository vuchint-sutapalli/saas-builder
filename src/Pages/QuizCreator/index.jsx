// import React, { useEffect, useState } from "react";
// import dbService from "../../appWrite/databaseConfig";
// import authService from "../../appWrite/auth";
// import QuestionSelector from "./QuestionSelector";

// const QuizCreator = () => {
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [quizTitle, setQuizTitle] = useState("");

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     const response = await dbService.getQuestions();
//     if (response && response.documents) {
//       setQuestions(response.documents);
//     }
//     console.log(response);
//   };

//   const handleCheckboxChange = (questionId) => {
//     setSelectedQuestions((prevSelected) =>
//       prevSelected.includes(questionId)
//         ? prevSelected.filter((id) => id !== questionId)
//         : [...prevSelected, questionId]
//     );
//   };

//   const handleQuizCreation = async () => {
//     if (!quizTitle || selectedQuestions.length === 0) {
//       alert("Please provide a quiz title and select at least one question.");
//       return;
//     }

//     try {
//       const currentUser = await authService.getCurrentUserData();
//       console.log(currentUser);

//       const response = await dbService.createQuiz({
//         quizTitle,
//         questions: selectedQuestions,
//         createdBy: currentUser.id,
//       });

//       if (response) {
//         alert("Quiz created successfully!");
//         // Optionally reset form
//         setQuizTitle("");
//         setSelectedQuestions([]);
//       } else {
//         alert("Failed to create quiz.");
//       }
//     } catch (error) {
//       console.error("Error creating quiz:", error);
//       alert("Error creating quiz.");
//     }
//   };

//   return (
//     <>
//       <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           Create a New Quiz
//         </h2>
//         <input
//           type="text"
//           value={quizTitle}
//           onChange={(e) => setQuizTitle(e.target.value)}
//           placeholder="Quiz Title"
//           className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
//         />

//         <div className="grid grid-cols-1 gap-4 mb-6">
//           {questions.map((question) => (
//             <QuestionSelector
//               key={question.$id}
//               question={question}
//               isSelected={selectedQuestions.includes(question.$id)}
//               onCheckboxChange={handleCheckboxChange}
//             />
//             // <div
//             //   key={question.$id}
//             //   className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
//             // >
//             //   <input
//             //     type="checkbox"
//             //     checked={selectedQuestions.includes(question.$id)}
//             //     onChange={() => handleCheckboxChange(question.$id)}
//             //     className="form-checkbox h-5 w-5 text-indigo-600"
//             //   />
//             //   <label className="ml-3 text-gray-700 font-medium">
//             //     {question.title}
//             //   </label>
//             // </div>
//           ))}
//         </div>

//         <button
//           onClick={handleQuizCreation}
//           className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Create Quiz
//         </button>
//       </div>
//     </>
//   );
// };

// export default QuizCreator;

// import React, { useEffect, useState } from "react";
// import dbService from "../../appWrite/databaseConfig";
// import authService from "../../appWrite/auth";
// import QuestionSelector from "./QuestionSelector";
// import { useForm, Controller } from "react-hook-form";

// const QuizCreator = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();
//   const [questions, setQuestions] = useState([]);
//   const [selectedQuestions, setSelectedQuestions] = useState([]);

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   const fetchQuestions = async () => {
//     const response = await dbService.getQuestions();
//     if (response && response.documents) {
//       setQuestions(response.documents);
//     }
//   };

//   const handleCheckboxChange = (questionId) => {
//     setSelectedQuestions((prevSelected) =>
//       prevSelected.includes(questionId)
//         ? prevSelected.filter((id) => id !== questionId)
//         : [...prevSelected, questionId]
//     );
//   };

//   const onSubmit = async (data) => {
//     const { quizTitle } = data;

//     if (!quizTitle || selectedQuestions.length === 0) {
//       // Set error manually if validation fails
//       return;
//     }

//     try {
//       const currentUser = await authService.getCurrentUserData();
//       const response = await dbService.createQuiz({
//         quizTitle,
//         questions: selectedQuestions,
//         createdBy: currentUser.id,
//       });

//       if (response) {
//         // Clear form and selections on success
//         setSelectedQuestions([]);
//       } else {
//         // Handle failure
//       }
//     } catch (error) {
//       console.error("Error creating quiz:", error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//         Create a New Quiz
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-6">
//           <Controller
//             name="quizTitle"
//             control={control}
//             rules={{ required: "Quiz title is required" }}
//             render={({ field }) => (
//               <input
//                 type="text"
//                 {...field}
//                 placeholder="Quiz Title"
//                 className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
//                   errors.quizTitle ? "border-red-500" : ""
//                 }`}
//               />
//             )}
//           />
//           {errors.quizTitle && (
//             <p className="text-red-600 text-sm mt-1">
//               {errors.quizTitle.message}
//             </p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 gap-4 mb-6">
//           {questions.map((question) => (
//             <QuestionSelector
//               key={question.$id}
//               question={question}
//               isSelected={selectedQuestions.includes(question.$id)}
//               onCheckboxChange={handleCheckboxChange}
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           disabled={errors.quizTitle}
//           className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
//             errors.quizTitle
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-indigo-600 text-white hover:bg-indigo-700"
//           }`}
//         >
//           Create Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QuizCreator;

import React, { useEffect, useState } from "react";
import dbService from "../../appWrite/databaseConfig";
import authService from "../../appWrite/auth";
import QuestionSelector from "./QuestionSelector";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

const QuizCreator = () => {
  const { toast } = useToast(); // Get toast function

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await dbService.getQuestions();
    if (response && response.documents) {
      setQuestions(response.documents);
    }
  };

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions((prevSelected) =>
      prevSelected.includes(questionId)
        ? prevSelected.filter((id) => id !== questionId)
        : [...prevSelected, questionId]
    );
  };

  const onSubmit = async (data) => {
    const { quizTitle } = data;

    if (selectedQuestions.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one question.",
        variant: "error",
      });
      return;
    }

    if (!quizTitle) {
      return;
    }

    try {
      const currentUser = await authService.getCurrentUserData();
      const response = await dbService.createQuiz({
        quizTitle,
        questions: selectedQuestions,
        createdBy: currentUser.id,
      });

      if (response) {
        toast({
          title: "Success",
          description: "Quiz created successfully!",
          variant: "success",
        });
        setSelectedQuestions([]);
      } else {
        toast({
          title: "Error",
          description: "Failed to create quiz.",
          variant: "error",
        });
        // Handle failure
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast({
        title: "Error",
        description: "Error creating quiz.",
        variant: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create a New Quiz
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Quiz Title"
            {...register("quizTitle", { required: "Quiz title is required" })}
            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
              errors.quizTitle ? "border-red-500" : ""
            }`}
          />
          {errors.quizTitle && (
            <p className="text-red-600 text-sm mt-1">
              {errors.quizTitle.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {questions.map((question) => (
            <QuestionSelector
              key={question.$id}
              question={question}
              isSelected={selectedQuestions.includes(question.$id)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>

        {/* <button
          type="submit"
          disabled={errors.quizTitle}
          className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            errors.quizTitle
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Create Quiz
        </button> */}
        <button
          type="submit"
          disabled={errors.quizTitle || selectedQuestions.length === 0}
          className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            errors.quizTitle || selectedQuestions.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizCreator;
