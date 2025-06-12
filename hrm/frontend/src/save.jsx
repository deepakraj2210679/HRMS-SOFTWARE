import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

const Onboarding = () => {
  const [user, setuser] = useState([])
  const [openPopup,setOpenPopup]=useState(false)
  const [openPopup1,setOpenPopup1]=useState(false)
  
  
  const getDetials = async () => {
    const res = await axios.get("http://localhost:3000/v1/getUsers")
    setuser(res.data)
  }

  useEffect(() => {
    getDetials()
  }, []) // Make sure to include the dependency array to avoid infinite re-renders


const StatusIndicator1 = ({ status }) => {
  const isCompleted = status === true;
  const name = isCompleted ? "Completed": "Pending";
  const icon = isCompleted ? "✅" : "⏳";
  const color= isCompleted ? "text-green-600" :"text-yellow-600"

  return (
    <div class={color}>
      <span>{icon} {name}</span>
    </div>
  )
}

const StatusIndicator2 = ({ status }) => {
  const isCompleted = status === true;
  const name = isCompleted ?"Pending" : "Completed";
  const icon = isCompleted ? "⏳": "✅";
  const color= isCompleted ? "text-yellow-600":"text-green-600" 

  return (
    <div class={`flex felx-col-2 gap-1 ${color}`}>
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );
}
const StatusIndicator3 = ({ status }) => {
  const isCompleted = status === true;
  const name = isCompleted ? "Completed": "Pending";
  const icon = isCompleted ? "✅" : "⏳";
  const color= isCompleted ? "text-green-600" :"text-yellow-600"

  return (
    <div class={`flex felx-col-2 gap-1 ${color}`}>
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );
};


};
    //Employee id validation
    let [ID,setID]=useState("");
    let [errormessage,seterrormessage]=useState('');
    let [flag,setflag]=useState("");

    const EmployeeId_Validation=(Eid)=>{
        if((Eid=="123"))
        {
            seterrormessage("Valid ID Number");
            setflag(true);
        }
        else if(Eid.length==0)
        {
            seterrormessage("");
        }
        else
        {
            seterrormessage("Invalid  ID Number");
            setflag(false);
        }
    };


const Popup = () => {
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center">
      <div className="bg-gray-50 pl-8 pr-8 pb-8 pt-5 rounded-lg shadow-lg w-96">
        <button
            onClick={()=>setOpenPopup(false)}
            className="pl-75  text-blue-800"
          >
            ❎
          </button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">Create Employee ID</h2>
        <input
          onChange={(e)=>{setID(e.target.value),EmployeeId_Validation(e.target.value)}}
          type="text"
          placeholder="Enter Employee ID"
          className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4 "
        />

       <div className={`${flag ? "text-[#44ed23]" : "text-red-500"} font-medium`}>{errormessage}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={()=>setOpenPopup(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );


const Popup1 = () => {
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[700px] p-9 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Onboarding Details</h2>
          <button onClick={()=>setOpenPopup1(false)} className="text-blue-700 hover:bg-green-50">❎</button>
        </div>

        {/* Section 1: User Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">1. User Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <input className="border p-2 rounded" placeholder="Performance Key" />
            <input className="border p-2 rounded" placeholder="Employee ID" />
            <input className="border p-2 rounded" placeholder="Name" />
            <input className="border p-2 rounded" placeholder="Designation" />
            <input className="border p-2 rounded" placeholder="Date of Joining" type="date" />
            <input className="border p-2 rounded" placeholder="Mail ID" />
            <input className="border p-2 rounded" placeholder="Phone" />
            <input className="border p-2 rounded" placeholder="Address" />
            <input className="border p-2 rounded" placeholder="CTC" />
            <input className="border p-2 rounded" placeholder="Department" />
            <input className="border p-2 rounded" placeholder="Date of Birth" type="date" />
            <input className="border p-2 rounded" placeholder="Gender" />
          </div>
        </div>

        {/* Section 2: Parent Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">2. Parent Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <input className="border p-2 rounded" placeholder="Parent Name(s)" />
            <input className="border p-2 rounded" placeholder="Emergency Contact No (Father/Mother)" />
            <input className="border p-2 rounded" placeholder="Married Status" />
            <input className="border p-2 rounded" placeholder="Blood Group" />
          </div>
        </div>

        {/* Section 3: Document Update */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">3. Document Update</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <input className="border p-2 rounded" placeholder="Aadhar Number" />
            <input className="border p-2 rounded" placeholder="PAN Number" />
            <input className="border p-2 rounded" placeholder="Bank Account Number" />
            <input className="border p-2 rounded" placeholder="IFSC Code" />
            <input className="border p-2 rounded" placeholder="Passport Number" />
            <input className="border p-2 rounded" placeholder="Driving License Number" />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3 pt-8">
          <button
            className="mr-80 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Activate
          </button>
          <button
            onClick={()=>setOpenPopup1(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>

        </div>
      </div>
    </div>
  );
};



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-blue-600 bg-gradient-to-b from-blue-600 to-blue-900 w-60">
        <div className="flex flex-col pt-40">
          <Link to="/">
            <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pl-10 transition-all duration-200">
              <span>☞</span> Dashboard
            </button>
          </Link>
          <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pr-9 transition-all duration-200">
            <span>☞</span> Interview List
          </button>
          <Link to="/onboarding">
            <button className="font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10 transition-all duration-200">
              <span>☞</span> Onboarding List
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-scroll bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome to Onboarding Table</h1>
        <div className="w-full">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-yellow-400 text-white">
                <th className="px-6 py-4 text-left font-semibold rounded-tl-lg">Performance Key</th>
                <th className="px-6 py-4 text-left font-semibold">Employee ID</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Role</th>
                <th className="px-6 py-4 text-left font-semibold">DOI</th>
                <th className="px-6 py-4 text-left font-semibold">Onboarding Status</th>
                <th className="px-6 py-4 text-left font-semibold">Document Status</th>
                <th className="px-6 py-4 text-left font-semibold">Asset Status</th>
                <th className="px-6 py-4 text-left font-semibold rounded-tr-lg">Option</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(user) && user.length > 0 ? (
                user.map((x, index) => (
                  <tr
                    key={index}
                    className="bg-white shadow-md rounded-xl overflow-hidden my-4 hover:bg-blue-50 transition-all"
                  >
                    <td className="px-6 py-4 rounded-l-xl">{x.PERFORMANCE_KEY || 'Dashboard'}</td>
                    <td className="px-6 py-4">{x.EMPLOYEE_ID ? (x.EMPLOYEE_ID) : (
                      <button onClick={()=>setOpenPopup(true)} class='border border-gray-200 text-gray-800 p-1 px-3 rounded-xl bg-gray-200 hover:bg-yellow-300  hover:text-black'>Create</button>
                    )}</td>
                    <td className="px-6 py-4 font-medium">{x.NAME}</td>
                    <td className="px-6 py-4">{x.DESIGNATION}</td>
                    <td className="px-6 py-4">{x.DATE_OF_JOINING ? x.DATE_OF_JOINING.split("T")[0] : ''}</td>
                    <td className="px-6 py-4">
                          <StatusIndicator1 status={x.ONBOARDING_STATUS} />
                    </td>
                    <td className="px-6 py-4">
                          <StatusIndicator2 status={x.DOCUMENTS_STATUS} />
                    </td>
                    <td className="px-6 py-4">
                          <StatusIndicator3 status={x.ASSET_STATUS} />
                    </td>

                    <td className="px-6 py-4 rounded-r-xl">
                      <button onClick={()=>setOpenPopup1(true)} className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                    </td>
      
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-gray-500 bg-white rounded-xl shadow">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
             {openPopup && <Popup/>}
             {openPopup1 && <Popup1/>}
          </table>
        </div>
      </div>
    </div>
    

  )
}


export { Onboarding }
