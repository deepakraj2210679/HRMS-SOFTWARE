import express from 'express'
import {updateList,getInterviewList,getuserById,AddEmployee,DeleteInterview,GetEmployee,getDocDetial,DocStatusUpdate,GetAssets, UpdateAssets, Login, sendEmail, CheckEmail, ResetPassword, Cloudinary, UpdateAssetsStatus, EmployeeDoc, EmployeeAsset, EmployeeDocUpdate, EmployeeAssetUpdate, getInterviewList1, UpdateInterview_list, UpdateRejectReason, Addonboard} from '../controller/controller.js'


const route=express.Router()

route.get("/getform",getInterviewList1);
route.post("/UpdateInterview",UpdateInterview_list)
route.post("/UpdateInterviewReject",UpdateRejectReason)
route.post("/addinter",Addonboard);
route.get("/getUsers",getInterviewList);
route.get('/getuser/:id',getuserById)
route.post('/createEmployee',AddEmployee);
route.delete('/deleteInterview/:id',DeleteInterview);
route.get("/getEmployee",GetEmployee);
route.post("/updateEmployee", updateList);
route.get("/document",getDocDetial)
route.post("/UpdateDocStatus",DocStatusUpdate)
route.get("/getAssets",GetAssets)
route.post("/updateAsset",UpdateAssets)
route.post("/login",Login)
route.post("/sendOTP",sendEmail)
route.post("/CheckMail",CheckEmail)
route.post("/ResetPass",ResetPassword)
route.post("/cloudinary-signature", Cloudinary);
route.post("/udassets",UpdateAssetsStatus);
route.post("/empdoc",EmployeeDoc);
route.post("/empass",EmployeeAsset);
route.post("/UpdateEmpDoc",EmployeeDocUpdate);
route.post("/empassupdate",EmployeeAssetUpdate)


export default route
