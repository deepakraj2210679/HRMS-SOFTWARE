import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/nouuu.png';

const LogoutAction = () => {
 const navigate = useNavigate();

  useEffect(() => {
    // Clear token on mount
    localStorage.removeItem("authToken")
  }, [])
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-poppins">
      <div className="bg-white shadow-lg rounded-xl px-10 py-8 text-center w-[400px]">
        <img src={logo} alt="NoQu Logo" className="mx-auto mb-6 w-30 h-30" />
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Logged Out Successfull...</h1>
    

        <button
          onClick={() => navigate('/')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 mt-6 rounded-full shadow-md transition-all duration-300"
        >
          Click here to Login
        </button>
      </div>
    </div>
  );
};

export { LogoutAction };
