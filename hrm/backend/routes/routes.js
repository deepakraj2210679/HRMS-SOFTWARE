import express from 'express'
import {updateList,getInterviewList,getuserById,AddEmployee,DeleteInterview,GetEmployee,getDocDetial,DocStatusUpdate,GetAssets} from '../controller/controller.js'


const route=express.Router()

route.get("/getUsers",getInterviewList);
route.get('/getuser/:id',getuserById)
route.post('/createEmployee',AddEmployee);
route.delete('/deleteInterview/:id',DeleteInterview);
route.get("/getEmployee",GetEmployee);
route.post("/updateEmployee", updateList);
route.get("/document",getDocDetial)
route.post("/UpdateDocStatus",DocStatusUpdate)
route.get("/getAssets",GetAssets)

export default route
