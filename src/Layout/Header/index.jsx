import LogoutBtn from "./LogoutBtn";
import { Link, useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { useRecoilValue } from "recoil";
import { authState } from "../../Atoms";

const Header = () => {
  const navigate = useNavigate();

  const authStatus = useRecoilValue(authState)?.status;

  const navItems = [
    {
      name: "Home",
      navTo: "/",
      active: true,
    },

    {
      name: "Create Question",
      navTo: "/create-question",
      active: authStatus,
    },
    {
      name: "All Questions",
      navTo: "/all-questions",
      active: authStatus,
    },
    {
      name: "create New Quiz",
      navTo: "/create-quiz",
      active: authStatus,
    },
    {
      name: "All Quizzes",
      navTo: "/all-quizzes",
      active: authStatus,
    },
    {
      name: "Login",
      navTo: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      navTo: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-500 text-white shadow-md">
        <nav className="hidden md:flex md:w-full md:items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Camera color="red" size={48} />
              <span className="text-2xl font-semibold tracking-wide">
                ReactApp
              </span>
            </Link>
          </div>
          <ul className="flex ml-auto w-full justify-around">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.navTo}
                    className="text-lg hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
          </ul>
          {authStatus ? (
            <div>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 transition duration-200"
                onClick={() => navigate("/logout")}
              >
                Logout
              </Button>
            </div>
          ) : null}
        </nav>

        {/* Right: Logout Button */}

        {/* Mobile Menu */}
        <div className="md:hidden">
          {/* Add a mobile menu icon here if needed */}
        </div>
      </header>
    </>
  );
};

export default Header;
