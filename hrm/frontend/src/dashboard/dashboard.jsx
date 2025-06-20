import { Link } from 'react-router-dom'

const Dashboard=()=>{
    return (
    <>
      <div className='h-screen bg-gray-200'>
        <div class='h-screen bg-blue-600 bg-gradient-to-b from-blue-600 to-blue-900 w-60'>
          <div class='flex flex-col pt-40'>
            <Link to={'/'}>
             <button class='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold text-gradient-to-b from-blue-600 to-blue-900 pl-10'><span class='text-'>☞</span> Dashboard</button>
            </Link>

             <button class='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pr-9'><scan class='text-'>☞</scan> Interview List</button>
            <Link to={'/onboarding'}>
                <button class='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10'><scan class='text-'>☞</scan> Onbording List</button>
            </Link>
             <Link to={'/employees'}>
                <button class='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10'><scan class='text-'>☞</scan> Employee List</button>
            </Link>
          
            <Link to={'/documents'}>
                <button class='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10'><scan class='text-'>☞</scan>Documents</button>
            </Link>
            <Link to={'/asset'}>
            <button className='font-[serif] text-lg text-amber-200 hover:text-[19px] hover:font-semibold pt-3 pl-10 transition-all duration-200'>
              ☞ Assets
            </button>
          </Link>
          </div>
        </div>
        
      </div>
    </>
  )
}

export {Dashboard}