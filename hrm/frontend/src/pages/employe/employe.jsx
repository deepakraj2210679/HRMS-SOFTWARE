
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"


const Employees = () => {
  const [user, setuser] = useState([])
  const [openPopup1,setOpenPopup1]=useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  
  const getDetials = async () => {
    const res = await axios.get("https://hrms-software.onrender.com/getEmployee")
    setuser(res.data)
  }

  useEffect(() => {
    getDetials()
  }, []) // Make sure to include the dependency array to avoid infinite re-renders


const StatusIndicator1 = ({ status }) => {
  const isCompleted = status == true;
  const name = isCompleted ? "Active": "Inactive";
  const icon = isCompleted ? "🟢" : "🔴";
  const color= isCompleted ? "text-green-600" :"text-red-600"

  return (
    <div class={`flex felx-col-2 gap-1 ${color}`}>
      <span>{icon} {name}</span>
    </div>
  )
}





const Popup1 = ({user}) => {

  
  const tempalete={
    EMPLOYEE_ID: user.EMPLOYEE_ID || "",
    PERFORMANCE_KEY: user.PERFORMANCE_KEY || "",
    DATE_OF_BIRTH: user.DATE_OF_BIRTH?.split("T")[0] || "",
    NAME: user.NAME || "",
    DESIGNATION: user.DESIGNATION || "",
    DATE_OF_JOINING: user.DATE_OF_JOINING ?.split("T")[0] || "",
    MAIL_ID: user.MAIL_ID || "",
    PHONE: user.PHONE|| "",
    ADDRESS: user.ADDRESS || "",
    CTC: user.CTC || "",
    DEPARTMENT: user.DEPARTMENT || "",
    DATE_OF_INTERVIEW: user.DATE_OF_INTERVIEW ?.split("T")[0] || "",
    GENDER: user.GENDER || "",
    EMPLOYEE_ACTIVE_STATUS: user.EMPLOYEE_ACTIVE_STATUS || "",
    DOCUMENTS_STATUS: user.DOCUMENTS_STATUS || "",
    ASSET_STATUS: user.ASSET_STATUS || "",
    BLOOD_GROUP: user.BLOOD_GROUP || "",
    MARRIED_STATUS: user.MARRIED_STATUS || "",
    FATHER_NAME: user.FATHER_NAME || "",
    FATHER_PHONE_NUMBER: user.FATHER_PHONE_NUMBER || "",
    MOTHER_NAME: user.MOTHER_NAME || "",
    MOTHER_PHONE_NUMBER: user.MOTHER_PHONE_NUMBER || "",
    EMERGENCY_CONTACT_NUMBER: user.EMERGENCY_CONTACT_NUMBER || "",
    GUARDIAN:user.GUARDIAN||"",
    GUARDIAN_PHONE_NUMBER:user.GUARDIAN_PHONE_NUMBER ||""
  };

const [formData,setFormData]=useState(tempalete)


 
  const handleChange=(a)=>{

          const {name,value}=a.target;
          setFormData({...formData,[name]:value})
      
      }
 
  const submitHandaler=async()=>{
        await axios.post("https://hrms-software.onrender.com/updateEmployee",formData)
        .then((res)=>{
  
            toast.success(res.data.message,{position:'top-right',duration: 5000})
            getDetials();
            setOpenPopup1(false);
        })
        .catch((error)=>{
  
            toast.error("some thing went wrong",{position:'top-right',duration: 5000})
        })
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[700px] p-9 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Onboarding Details</h2>
          <button onClick={()=>setOpenPopup1(false)}  className="text-blue-700 hover:bg-green-50">❎</button>
        </div>
        
        <form onSubmit={(e) => {
        e.preventDefault(); // Prevent full-page reload
        submitHandaler();  // Your original function
        
      }}>
        {/* section-1: Employee ID*/}
         <h3 className="text-lg font-semibold text-yellow-400 mb-3 pt-4">1.Employee ID</h3>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Employee ID<span className="text-red-500"> *</span>
          
          <div className="flex gap-2 items-center">
            <input
              value={formData.EMPLOYEE_ID}
              className="flex-1 border rounded-sm px-3 py-2 mt-4 cursor-not-allowed bg-gray-100 "
            />
          </div>
          </label>
        </div>
      
        {/* Section 2: User Details */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 pt-8">2.Other Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <label>
              Performance Key<span className='text-red-500 '> *</span>
              <input value={formData.PERFORMANCE_KEY} onChange={handleChange} required className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
            <label>
              Date of Interview<span className='text-red-500 '> *</span>
              <input name="DATE_OF_INTERVIEW" value={formData.DATE_OF_INTERVIEW} onChange={handleChange} required className="border mt-2 p-2 rounded w-full font-medium" type="date" />
            </label>
            <label>
              Name<span className='text-red-500 '> *</span>
              <input name="NAME" value={formData.NAME} onChange={handleChange} required className="border p-2 mt-2 rounded font-medium w-full" />
            </label>
            <label>
              Designation<span className='text-red-500 '> *</span>
              <input name="DESIGNATION" value={formData.DESIGNATION} required onChange={handleChange} className="border font-medium mt-2 p-2 rounded w-full" />
            </label>
            <label>
              Date of Joining<span className='text-red-500 '> *</span>
              <input name="DATE_OF_JOINING" value={formData.DATE_OF_JOINING} required onChange={handleChange} className="border font-medium mt-2 p-2 rounded w-full" type="date" />
            </label>
            <label>
              Mail ID<span className='text-red-500 '> *</span>
              <input name="MAIL_ID" value={formData.MAIL_ID} onChange={handleChange} type='email' required  className="border font-medium p-2 mt-2 rounded w-full" />
            </label>
            <label>
              Phone Number<span className='text-red-500 '> *</span>
              <input name="PHONE" value={formData.PHONE} onChange={handleChange} required className="border p-2 mt-2 font-medium rounded w-full" />
            </label>
            <label>
              Address
              <input name="ADDRESS" value={formData.ADDRESS} onChange={handleChange} className="border p-2 mt-2 font-medium rounded w-full" />
            </label>
            <label>
              CTC
              <input name="CTC" value={formData.CTC} onChange={handleChange} type="number" className="border mt-2 p-2 font-medium rounded w-full" />
            </label>
            <label>
              Department<span className='text-red-500 '> *</span>
              <input name="DEPARTMENT" value={formData.DEPARTMENT} required onChange={handleChange} className="border mt-2 font-medium p-2 rounded w-full" />
            </label>
            <label>
              Date of Birth<span className='text-red-500 '> *</span>
              <input name="DATE_OF_BIRTH" value={formData.DATE_OF_BIRTH} required onChange={handleChange} className="border mt-2 p-2 font-medium rounded w-full" type="date" />
            </label>
            <label>Gender<span className='text-red-500 '> *</span>
            <select
                  name="GENDER"
                  value={formData.GENDER}
                  onChange={handleChange}
                  required
                  className="border p-2 mt-2 rounded font-medium w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            <label>
              Married Status
              <input name="MARRIED_STATUS" value={formData.MARRIED_STATUS} onChange={handleChange} className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
            <label>
              Blood Group
              <input name="BLOOD_GROUP" value={formData.BLOOD_GROUP} onChange={handleChange} className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
            <label>
              Emergency Contact Number<span className='text-red-500 '> *</span>
              <input name="EMERGENCY_CONTACT_NUMBER" value={formData.EMERGENCY_CONTACT_NUMBER} required onChange={handleChange} className="border mt-2 p-2 font-medium rounded w-full" />
            </label>
          </div>
        </div>

        {/* Section 3: Parent Details */}
        <div>
          <h3 className="text-lg font-medium text-yellow-400 mt-9 mb-5 ">3. Parent Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4 font-medium">
            <label>
              Father's Name
              <input name="FATHER_NAME" value={formData.FATHER_NAME} onChange={handleChange} className="border p-2 mt-2 rounded w-full font-medium" />
            </label>
    
            <label>
              Father's Phone Number
              <input name="FATHER_PHONE_NUMBER" value={formData.FATHER_PHONE_NUMBER} onChange={handleChange} className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
            <label>
              Mother's Name
              <input name="MOTHER_NAME" value={formData.MOTHER_NAME} onChange={handleChange} className="border p-2 mt-2 rounded w-full font-medium" />
            </label>
            <label>
              Mother's Phone Number
              <input name="MOTHER_PHONE_NUMBER" value={formData.MOTHER_PHONE_NUMBER} onChange={handleChange} className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
            <label>
              guardian
              <input name="GUARDIAN" value={formData.GUARDIAN} onChange={handleChange} className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
            <label>
              guardian Phone Number
              <input name="GUARDIAN_PHONE_NUMBER" value={formData.GUARDIAN_PHONE_NUMBER} onChange={handleChange} className="border mt-2 p-2 rounded w-full font-medium" />
            </label>
          </div>
        </div>


  
        <div className="flex mt-6 gap-3 pt-8 items-center">
            <button
              onClick={()=>{
                const updatedStatus = !formData.EMPLOYEE_ACTIVE_STATUS;
                 setFormData({...formData,EMPLOYEE_ACTIVE_STATUS: updatedStatus});
              }}
              
              type="button"
              className={`px-4 py-2 text-white rounded ${formData.EMPLOYEE_ACTIVE_STATUS ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {formData.EMPLOYEE_ACTIVE_STATUS ? 'InActivate' : 'Activate'}
            </button>

            <button
              onClick={() => setOpenPopup1(false)}
              type="button"
              className="px-4 py-2 ml-auto bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              type="submit"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


  // ... (previous state and functions remain the same until the return statement)


  return (
    <div className="flex h-screen">
      {/* Original Blue Sidebar */}
     
      {/* Main Content with Yellow Table */}
      <div className="flex-1 p-7 pl-10 overflow-hidden bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Employee Details</h1>
        
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
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    DOJ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Document Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Asset Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y  divide-gray-300 ">
                {Array.isArray(user) && user.length>0 ? (
                user.map((employee, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-sm text-gray-800 border-r border-gray-200">
                      {employee.PERFORMANCE_KEY}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {employee.EMPLOYEE_ID}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-sm text-gray-900 border-r border-gray-200">
                      {employee.NAME}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {employee.DESIGNATION}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {employee.DATE_OF_JOINING?.split("T")[0]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        employee.DOCUMENTS_STATUS ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {employee.DOCUMENTS_STATUS ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        employee.ASSET_STATUS ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {employee.ASSET_STATUS ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      <span className={`px-2 py-1 text-xs rounded-full ${employee.EMPLOYEE_ACTIVE_STATUS ? 'bg-green-100 text-green-800 ' : 'bg-red-100 text-red-800'}`}>
                        {employee.EMPLOYEE_ACTIVE_STATUS ? '🟢Active' : '🔴Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                      <button
                        onClick={() => {setOpenPopup1(true); setSelectedUser(employee);}}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ):
              (
                 <tr>
                  <td colSpan="20" className="text-center  text-gray-500">
                    <div className="bg-white p-6 rounded-xl shadow-inner border-2 border-dashed border-gray-200">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-medium">No Employee records found</span>
                      </div>
                    </div>
                  </td>
                </tr>
              )
              
              }
              </tbody>
            </table>
          </div>
        </div>
        
        {openPopup1 && <Popup1 user={selectedUser} />}
      </div>
    </div>
  );
}

export { Employees }
