import express from 'express'
import {updateList,getInterviewList,getuserById,AddEmployee} from '../controller/controller.js'


const route=express.Router()

route.get("/getUsers",getInterviewList);
route.post("/updateUser",updateList);
route.get('/getuser/:id',getuserById)
route.post('/createEmployee',AddEmployee);

export default route
