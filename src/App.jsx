import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout/app-layout";
import LandingPage from "./Pages/Landing/index.jsx";
import Login from "./Pages/Login.jsx";
import Protected from "./components/Protected.jsx";
import SignUp from "./Pages/SignUp.jsx";
QuizCreator;
// import AllQuestions from "./Pages/QuizCreator/AllQuestions.jsx";
import AddQuestion from "./Pages/AddQuestion.jsx";
import EditQuestion from "./Pages/EditQuestion.jsx";
import Question from "./Pages/Question.jsx";
import QuizCreator from "./Pages/QuizCreator/index.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        ),
      },
      {
        path: "/all-questions",
        element: (
          <Protected authentication={true}>
            <QuizCreator />
          </Protected>
        ),
      },
      {
        path: "/create-question",
        element: (
          <Protected authentication={true}>
            <AddQuestion />
          </Protected>
        ),
      },
      {
        path: "/edit-question/:slug",
        element: (
          <Protected authentication={true}>
            <EditQuestion />
          </Protected>
        ),
      },
      {
        path: "/question/:slug",
        element: (
          <Protected authentication={true}>
            <Question />
          </Protected>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
