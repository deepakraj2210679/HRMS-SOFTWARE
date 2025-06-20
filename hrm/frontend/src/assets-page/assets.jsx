
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import axios from "axios"


const Asset=()=>{

  const [user, setuser] = useState([])
  const [openPopup1,setOpenPopup1]=useState(false)
  const [selectedUser,setSelectedUser]=useState(null)

  

  const getDetials = async () => {
    const res = await axios.get("https://hrms-software.onrender.com/getAssets")
    setuser(res.data)
    console.log(res.data)

    }
    useEffect(() => {
    getDetials(); 
    }, []);


    const Popup1 = ({user}) => {
      const tempalete={
        EMPLOYEE_ID: user.EMPLOYEE_ID || "",
        PERFORMANCE_KEY: user.PERFORMANCE_KEY || "",
        NAME: user.NAME || "",
        DESIGNATION: user.DESIGNATION || "",
        DEPARTMENT: user.DEPARTMENT || "",
        LOCATION: user.LOCATION || "",
        LAPTOP_STATUS :user.LAPTOP_STATUS || "",      
        LAPTOP_BRAND  :user.LAPTOP_BRAND || "",       
        LAPTOP_MODEL  :user.LAPTOP_MODEL || "",      
        LAPTOP_SERIAL_NUMBER :user.LAPTOP_SERIAL_NUMBER || "",
        LAPTOP_CHARGER :user.LAPTOP_CHARGER || "",
        MOUSE :user.MOUSE ||"",       
        MOBILE_STATUS :user.MOBILE_STATUS || "",       
        MOBILE_BRAND :user.MOBILE_BRAND || "",     
        MOBILE_MODEL :user .MOBILE_MODEL || "",     
        MOBILE_IMEI_NUMBER1 :user.MOBILE_IMEI_NUMBER1 || "",
        MOBILE_IMEI_NUMBER2 :user.MOBILE_IMEI_NUMBER2 || "",
        MOBILE_CHARGER :user.  MOBILE_CHARGER || "",   
        CUG_NUMBER :user.CUG_NUMBER || "",     
        HEADSET_STATUS :user.HEADSET || "",  
        HEADSET :user. HEADSET || "" 
  };

const [formData,setFormData]=useState(tempalete)

  
  const deleteUser=()=>{
    axios.delete(`https://hrms-software.onrender.com/deleteInterview/${ID}`);
    getDetials(); 
  }
 
  const handleChange=(a)=>{

          const {name,value}=a.target;
          setFormData({...formData,[name]:value})
      
      }
 
  const submitHandaler=async()=>{
          setFormData({...formData,EMPLOYEE_ACTIVE_STATUS: true});
        await axios.post("https://hrms-software.onrender.com/createEmployee",formData)
        .then((res)=>{
  
            toast.success(res.data.message,{position:'top-right',duration: 5000})
            deleteUser();
            getDetials();
            setOpenPopup1(false);
        })
        .catch((error)=>{
  
            toast.error("some thing went wrong",{position:'top-right',duration: 5000})
        })
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex justify-center items-center ">
      <div className="bg-white rounded-lg shadow-xl w-[700px] p-9 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Assets Details</h2>
          <button onClick={()=>setOpenPopup1(false)}  className="text-blue-700 hover:bg-green-50">❎</button>
          </div>
        <form>
        {/* Section 2: User Details */}
       <div>
        <h3 className="text-lg font-semibold text-yellow-400 mb-3 pt-8">1. Employee Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <label>
            Performance Key
            <input 
              name="PERFORMANCE_KEY" 
              value={formData.PERFORMANCE_KEY} 
              readOnly 
              className="border mt-2 p-2 rounded w-full  bg-gray-100 cursor-not-allowed" 
            />
          </label>
          <label>
            Employee ID
            <input 
              name="EMPLOYEE_ID" 
              value={formData.EMPLOYEE_ID} 
              readOnly 
              className="border mt-2 p-2 rounded w-full bg-gray-100 cursor-not-allowed" 
            />
          </label>
          <label>
            Name
            <input 
              name="NAME" 
              value={formData.NAME} 
              readOnly 
              className="border p-2 mt-2 rounded w-full bg-gray-100 cursor-not-allowed" 
            />
          </label>
          <label>
            Designation
            <input 
              name="DESIGNATION" 
              value={formData.DESIGNATION} 
              readOnly 
              className="border mt-2 p-2 rounded w-full bg-gray-100 cursor-not-allowed" 
            />
          </label>
          <label>
            Department
            <input 
              name="DEPARTMENT" 
              value={formData.DEPARTMENT} 
              readOnly 
              className="border mt-2 p-2 rounded w-full bg-gray-100 cursor-not-allowed" 
            />
          </label>
          <label>
            Location
            <input 
              name="LOCATION" 
              value={formData.LOCATION} 
              readOnly 
              className="border mt-2 p-2 rounded w-full bg-gray-100 cursor-not-allowed" 
            />
          </label>
        </div>
      </div>


      


        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mt-9 mb-5">2. Laptop</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4 font-">
            <label>
              Laptop Brand<span className='text-red-500 '> *</span>
              <input name="LAPTOP_BRAND" value={formData.LAPTOP_BRAND} required onChange={handleChange} className="border p-2 mt-2 rounded w-full" type='text'/>
            </label>
    
            <label>
              Laptop Model<span className='text-red-500 '> *</span>
              <input name="LAPTOP_MODEL" value={formData.LAPTOP_MODEL} required  onChange={handleChange} className="border mt-2 p-2 rounded w-full" type='text' />
            </label>
            <label>
              Laptop Serial Number<span className='text-red-500 '> *</span>
              <input name="CUG_NUMBER" value={formData.LAPTOP_SERIAL_NUMBER} required onChange={handleChange} className="border p-2 mt-2 rounded w-full" />
            </label>
            <label>
              Laptop Charger<span className='text-red-500 '> *</span>
              <select
                  name="LAPTOP_CHARGER"
                  value={formData.LAPTOP_CHARGER}
                  onChange={handleChange}
                  required
                  className="border p-2 mt-2 rounded  w-full"
                >
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
            </label>
            <label>
              Mouse<span className='text-red-500 '> *</span>
             <select
                  name="MOUSE"
                  value={formData.MOUSE}
                  onChange={handleChange}
                  required
                  className="border p-2 mt-2 rounded  w-full"
                >
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
            </label>
            
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mt-9 mb-5">3. Mobile</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4 font-">
            <label>
              Mobile Brand<span className='text-red-500 '> *</span>
              <input name="MOBILE_BRAND" value={formData.MOBILE_BRAND} required onChange={handleChange} className="border p-2 mt-2 rounded w-full" type='text'/>
            </label>
    
            <label>
              Mobile Model<span className='text-red-500 '> *</span>
              <input name="MOBILE_MODEL" value={formData.MOBILE_MODEL} required  onChange={handleChange} className="border mt-2 p-2 rounded w-full" type='text' />
            </label>
            <label>
              Mobile IMEI Number-1<span className='text-red-500 '> *</span>
              <input name="MOBILE_IMEI_NUMBER1" value={formData.MOBILE_IMEI_NUMBER1} required onChange={handleChange} className="border p-2 mt-2 rounded w-full" />
            </label>
            <label>
              Mobile IMEI Number-2
              <input name="MOBILE_IMEI_NUMBER2" value={formData.MOBILE_IMEI_NUMBER2} onChange={handleChange} className="border p-2 mt-2 rounded w-full" />
            </label>

            <label>
              Mobile Charger<span className='text-red-500 '> *</span>
              <select
                  name="MOBILE_CHARGER"
                  value={formData.MOBILE_CHARGER}
                  onChange={handleChange}
                  required
                  className="border p-2 mt-2 rounded  w-full"
                >
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
            </label>
            <label>
              CUG Number<span className='text-red-500 '> *</span>
              <input name="CUG_NUMBER" value={formData.CUG_NUMBER} required onChange={handleChange} className="border p-2 mt-2 rounded w-full" type="number" />
            </label>

          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mt-9 mb-5">3. Headset</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <label>
              HeadSet<span className='text-red-500 '> *</span>
              <select
                  name="HEADSET"
                  value={formData.HEADSET}
                  onChange={handleChange}
                  required
                  className="border p-2 mt-2 rounded  w-full"
                >
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
            </label>
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit" >
        Update
        </button>

           </div>
         </form>
        </div>
        </div>
        )          
    }

    return (
    <>
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
      <div className="flex-1 p-5  bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Assets List</h1>
        
        {/* Yellow-themed Table */}
        <div className="bg-white rounded-lg  border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl border-gray-200">
              <thead className="bg-yellow-400">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Performance Key
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Employee ID
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Designation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Departnment
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Location
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Laptop status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Mobile status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Headset status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-yellow-900 uppercase tracking-wider border-r border-yellow-500">
                    Option
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.LOCATION }
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.LAPTOP_STATUS ? '✅' : '  '}
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.MOBILE_STSTUS ? '✅' : '  '}
                    </td>
                     <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 border-r border-gray-200">
                      {x.HEADSET_STATUS ? '✅' : '  '}
                    </td>
                     
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                      <button
                        onClick={() => {
                          setOpenPopup1(true);
                          setSelectedUser(x);
                         
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
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
       {openPopup1 && <Popup1 user={selectedUser} />}
      </div>
    </div>
    </>
  )
}

export {Asset}


