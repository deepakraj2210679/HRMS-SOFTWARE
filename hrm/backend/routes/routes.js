import express from 'express'
import {updateList,getInterviewList,getuserById,AddEmployee,DeleteInterview,GetEmployee} from '../controller/controller.js'


const route=express.Router()

route.get("/getUsers",getInterviewList);
route.get('/getuser/:id',getuserById)
route.post('/createEmployee',AddEmployee);
route.delete('/deleteInterview/:id',DeleteInterview);
route.get("/getEmployee",GetEmployee);
route.post("/updateEmployee", updateList);

export default route
