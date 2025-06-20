import { Link } from 'react-router-dom'
import { useState,useEffect,useRef} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'


const Documents=()=>{

    const [user, setuser] = useState([])
    const fileInputRefs = useRef({}); // to track file inputs per row
    const [selectedFiles, setSelectedFiles] = useState({});

    const Navigate=useNavigate();
  


    const getDetials = async () => {
    const res = await axios.get("http://localhost:3000/v1/document")
    setuser(res.data)

    }
    

    const handleFileChange = (e, key,ID, col) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFiles((prev) => ({ ...prev, [key]: file }));
          alert(`Selected "${file.name}" for ${key}`);

          const updatedData = { EMPLOYEE_ID: ID, field: col };
          axios.post("http://localhost:3000/v1/UpdateDocStatus", updatedData).then((res) => {
            console.log(res);
            getDetials();
          });
        }

    };

    const handleUploadClick = (key) => {
      if (fileInputRefs.current[key]) {
        fileInputRefs.current[key].click();
      }
    };


   

    useEffect(() => {
    getDetials(); 
    }, []);

   return(
     <div className="flex h-screen">
      {/* Original Blue Sidebar */}
      <div className="bg-blue-600 bg-gradient-to-b from-blue-600 to-blue-900 w-60">
        <div className="flex flex-col pt-40">
          <Link to="/">
            <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pl-10 transition-all duration-200">
              ☞ Dashboard
            </button>
          </Link>
          <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pr-9 transition-all duration-200">
            ☞ Interview List
          </button>
          <Link to="/onboarding">
            <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10 transition-all duration-200">
              ☞ Onboarding List
            </button>
          </Link>
          <Link to="/employees">
            <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10">
              ☞ Employee List
            </button>
          </Link>
          <Link to={'/documents'}>
            <button className='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10'>
              <span className='text-'>☞</span> Documents
            </button>
          </Link>
          <Link to={'/asset'}>
            <button className='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10 transition-all duration-200'>
              ☞ Assets
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content with Yellow Table */}
      <div className="flex-1 p-5 overflow-hidden bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Documents Details</h1>
        
        {/* Yellow-themed Table */}
        <div className="bg-white rounded-lg  border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl border-gray-200">
              <thead className="bg-yellow-400">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Performance Key
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Employee ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Designation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Departnment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    10th
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    12th
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Degree
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Aadhar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Pan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Relieving letter
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Pay slip
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Parents Aadhar
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-300 ">
              
                 {Array.isArray(user) && user.length > 0 ? (
                user.map((x, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm  text-gray-800 border-r border-gray-200">
                      {x.PERFORMANCE_KEY }
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.EMPLOYEE_ID}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.NAME}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.DESIGNATION}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.DEPARTMENT }
                    </td>
                   <td className="px-4 pl-6 text-xs text-gray-800 border-r border-gray-200">
                  
                      {x.TENTH ? '✅' : '❗️'}
            
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.TWELFTH }
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.DEGREE }
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.AADHAR }
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.PAN}
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.RELIEVING_LETTER}
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.PAY_SLIP_3_MONTHS }
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.PARENTS_AADHAR}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={()=>{Navigate('/updateDoc')}}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center  text-gray-500">
                    <div className="bg-white p-6 rounded-xl shadow-inner border-2 border-dashed border-gray-200">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-medium">No onboarding records found</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
    
      </div>
    </div>
  );
}

export {Documents}