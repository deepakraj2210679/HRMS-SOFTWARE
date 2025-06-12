
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"

const Onboarding = () => {
  const [user, setuser] = useState([])
  const [openPopup1,setOpenPopup1]=useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  
  const getDetials = async () => {
    const res = await axios.get("http://localhost:3000/v1/getUsers")
    setuser(res.data)
  }

  useEffect(() => {
    getDetials()
  }, []) // Make sure to include the dependency array to avoid infinite re-renders






//Employee id validation
    let [ID,setID]=useState("");
    let [errormessage,seterrormessage]=useState('');
    let [flag,setflag]=useState("");
    
    const EmployeeId_Validation=(Eid)=>{

        if(Eid.length==0)
        {
            seterrormessage("");
        }
        else if((Eid=="123"))
        {
            seterrormessage("✅ Valid ID Number");
            setflag(true);
        }

        else
        {
            seterrormessage("❌ Invalid  ID Number");
            setflag(false);
        }
    }




const Popup1 = ({user}) => {

  const tempalete={
    performanceKey: user.PERFORMANCE_KEY || "",
    employeeId: user.EMPLOYEE_ID || "",
    name: user.NAME || "",
    designation: user.DESIGNATION || "",
    doj: user.DOJ.split("T")[0] || "",
    doi: user.DOI.split("T")[0] || "",
    mail: user.MAIL_ID || "",
    phone: user.PHONE_NUMBER || "",
    address: user.ADDRESS || "",
    ctc: user.CTC || "",
    department: user.DEPARTMENT || "",
    dob: user.DOB?.split("T")[0] || "",
    gender: user.GENDER || "",
  };

  const [formData,setFormData]=useState(tempalete)
  const handleChange=(a)=>{
          const {name,value}=a.target;
          setFormData({...formData,[name]:value})
      }

  const submitHandaler=()=>{
    console.log(formData);
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[700px] p-9 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Onboarding Details</h2>
          <button onClick={()=>setOpenPopup1(false)}  className="text-blue-700 hover:bg-green-50">❎</button>
        </div>
        
        {/* section-1: Employee ID*/}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">1. Employee ID</h3>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Employee ID"
            className="w-full border rounded-sm px-3 py-2 mb-4"
        />

        <div className={`${flag ? "text-[#44ed23]" : "text-red-500"} text-[14px]`}>{errormessage}</div>
            
        </div>
        {/* Section 2: User Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">2. User Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <input name="performanceKey" value={formData.performanceKey} onChange={handleChange} className="border p-2 rounded" placeholder="Performance Key" />
            <input name="doi" value={formData.doi} onChange={handleChange} className="border p-2 rounded" placeholder="Employee ID" />
            <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" placeholder="Name" />
            <input name="designation" value={formData.designation} onChange={handleChange} className="border p-2 rounded" placeholder="Designation" />
            <input name="doj" value={formData.doj} onChange={handleChange} className="border p-2 rounded" type="date" placeholder="Date of Joining" />
            <input name="mail" value={formData.mail} onChange={handleChange} className="border p-2 rounded" placeholder="Mail ID" />
            <input name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" placeholder="Phone" />
            <input name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded" placeholder="Address" />
            <input name="ctc" value={formData.ctc} onChange={handleChange} className="border p-2 rounded" placeholder="CTC" />
            <input name="department" value={formData.department} onChange={handleChange} className="border p-2 rounded" placeholder="Department" />
            <input name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded" type="date" placeholder="Date of Birth" />
            <input name="gender" value={formData.gender} onChange={handleChange} className="border p-2 rounded" placeholder="Gender" />
          </div>
        </div>

        {/* Section 3: Parent Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">3. Parent Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <input className="border p-2 rounded" placeholder="Parent Name(s)" />
            <input className="border p-2 rounded" placeholder="Emergency Contact No (Father/Mother)" />
            <input className="border p-2 rounded" placeholder="Married Status" />
            <input className="border p-2 rounded" placeholder="Blood Group" />
          </div>
        </div>

        {/* Section 4: Document Update */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">4. Document Update</h3>
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
            onClick={()=>setOpenPopup1(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={()=>{setOpenPopup1(false),submitHandaler()}}>
            Onboard
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
           <Link to={'/employees'}>
                <button class='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10'><scan class='text-'>☞</scan> Employee List</button>
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
                <th className="px-6 py-4 text-left font-semibold rounded-tl-lg">Name</th>
                <th className="px-6 py-4 text-left font-semibold">DOI</th>
                <th className="px-6 py-4 text-left font-semibold">DOJ</th>
                <th className="px-6 py-4 text-left font-semibold">Designation</th>
                <th className="px-6 py-4 text-left font-semibold">Department</th>
                <th className="px-6 py-4 text-left font-semibold">Phone no</th>
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
                    <td className="px-6 py-4 rounded-l-xl font-medium">{x.NAME || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{x.DOI.split("T")[0] || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{x.DOJ.split("T")[0] || '-'}</td>
                    <td className="px-6 py-4">{x.DESIGNATION || '-'}</td>
                    <td className="px-6 py-4">{x.DEPARTMENT || '-'}</td>
                    <td className="px-6 py-4">{x.PHONE_NUMBER || '-'}</td>
                    
                    <td className="px-6 py-4 rounded-r-xl">
                      <button onClick={()=>{setOpenPopup1(true),setSelectedUser(x)}} className="text-blue-600 hover:text-blue-800 font-medium">View</button>
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
            
             {openPopup1 && <Popup1 user={selectedUser} />}

          </table>
        </div>
      </div>
    </div>
    

  )
}


export { Onboarding }
