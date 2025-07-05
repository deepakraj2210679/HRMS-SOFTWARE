import db from '../index.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';

const getInterviewList1=(req,res)=>{
    const query = 'SELECT * FROM interview_list1';

    db.query(query,(error,results) => {
        if (error) {
            return res.json({ error: 'Database query failed' });
        }
        // Replace null or undefined values with empty strings
        const cleanedResults=results.map(row=>{
            const cleanedRow={};
            for (const key in row) {
                cleanedRow[key]=row[key] ?? "";
            }
            return cleanedRow;
        });
        res.json(cleanedResults);
    });
}

const getInterviewList=(req,res)=>{
    const query = 'SELECT * FROM onboard';

    db.query(query,(error,results) => {
        if (error) {
            return res.json({ error: 'Database query failed' });
        }
        // Replace null or undefined values with empty strings
        const cleanedResults=results.map(row=>{
            const cleanedRow={};
            for (const key in row) {
                cleanedRow[key]=row[key] ?? "";
            }
            return cleanedRow;
        });
        res.json(cleanedResults);
    });
}

const updateList = (req, res) => {
    const {
        EMPLOYEE_ID,
        PERFORMANCE_KEY,
        DATE_OF_BIRTH,
        NAME,
        DESIGNATION,
        DATE_OF_JOINING,
        MAIL_ID,
        PHONE,
        ADDRESS,
        CTC,
        DEPARTMENT,
        LOCATION,
        DATE_OF_INTERVIEW,
        GENDER,
        EMPLOYEE_ACTIVE_STATUS,
        DOCUMENTS_STATUS,
        ASSET_STATUS,
        BLOOD_GROUP,
        MARRIED_STATUS,
        FATHER_NAME,
        MOTHER_NAME,
        FATHER_PHONE_NUMBER,
        MOTHER_PHONE_NUMBER,
        EMERGENCY_CONTACT_NUMBER,
        GUARDIAN,
        GUARDIAN_PHONE_NUMBER
    } = req.body;

    if (!EMPLOYEE_ID) {
        return res.json({ message: "EMPLOYEE_ID is required for update." });
    }

    const query = `
        UPDATE employees
        SET 
            PERFORMANCE_KEY = ?, DATE_OF_BIRTH = ?, NAME = ?, DESIGNATION = ?, DATE_OF_JOINING = ?,
            MAIL_ID = ?, PHONE = ?, ADDRESS = ?, CTC = ?, DEPARTMENT = ?,LOCATION=?, DATE_OF_INTERVIEW = ?,
            GENDER = ?, EMPLOYEE_ACTIVE_STATUS = ?, DOCUMENTS_STATUS = ?, ASSET_STATUS = ?,
            BLOOD_GROUP = ?, MARRIED_STATUS = ?, FATHER_NAME = ?, MOTHER_NAME = ?,
            FATHER_PHONE_NUMBER = ?, MOTHER_PHONE_NUMBER = ?, EMERGENCY_CONTACT_NUMBER = ?,
            GUARDIAN = ?, GUARDIAN_PHONE_NUMBER = ?
        WHERE EMPLOYEE_ID = ?
    `;

    const values = [
        PERFORMANCE_KEY, DATE_OF_BIRTH, NAME, DESIGNATION, DATE_OF_JOINING,
        MAIL_ID, PHONE, ADDRESS, CTC, DEPARTMENT,LOCATION, DATE_OF_INTERVIEW,
        GENDER, EMPLOYEE_ACTIVE_STATUS, DOCUMENTS_STATUS, ASSET_STATUS,
        BLOOD_GROUP, MARRIED_STATUS, FATHER_NAME, MOTHER_NAME,
        FATHER_PHONE_NUMBER, MOTHER_PHONE_NUMBER, EMERGENCY_CONTACT_NUMBER,
        GUARDIAN, GUARDIAN_PHONE_NUMBER, EMPLOYEE_ID
    ];

    db.query(query, values, (error, result) => {
        if (error) {
            return res.json({ message: "Failed to update the onboarding record", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.json({ message: "No record found with the given EMPLOYEE_ID" });
        }

        res.json({ message: "Employee record updated successfully" });
    });
};


const getuserById = (req, res) => {
    try {
        const user_id = req.params.id;

        db.query('SELECT * FROM employees WHERE EMPLOYEE_ID = ?', [user_id], (err, rows) => {
            if (err) {
                return res.send({ message: "Error in getting the user by id", error: err.message });
            }

            if (rows.length === 0) {
                return res.json({ message: "User not found in the DB" });
            }

            if(rows.length!=0)
            {
                res.send({message:"found"})
            }
        });
    } catch (error) {
        res.send({ message: "Unexpected server error", error: error.message });
    }
};




const AddEmployee = (req, res) => {
    const {
        EMPLOYEE_ID,
        PERFORMANCE_KEY,
        DATE_OF_BIRTH,
        NAME,
        DESIGNATION,
        DATE_OF_JOINING,
        MAIL_ID,
        PHONE,
        ADDRESS,
        CTC,
        DEPARTMENT,
        LOCATION,
        DATE_OF_INTERVIEW, 
        GENDER,
        EMPLOYEE_ACTIVE_STATUS,
        DOCUMENTS_STATUS,
        ASSET_STATUS,
        BLOOD_GROUP,
        MARRIED_STATUS,
        FATHER_NAME,
        FATHER_PHONE_NUMBER,
        MOTHER_NAME,
        MOTHER_PHONE_NUMBER,
        EMERGENCY_CONTACT_NUMBER,
        GUARDIAN,
        GUARDIAN_PHONE_NUMBER
    } = req.body;

    // Minimal required field check
    if (!EMPLOYEE_ID) {
        return res.status(400).json({ message: "Required fields are missing." });
    }

    // Convert empty or undefined values to NULL
    const normalize = (val) =>{
        return val === undefined || val === '' ? null : val
    }

    const query = `
        INSERT INTO employees (
            EMPLOYEE_ID, PERFORMANCE_KEY, DATE_OF_BIRTH, NAME, DESIGNATION,
            DATE_OF_JOINING, MAIL_ID, PHONE, ADDRESS, CTC, DEPARTMENT,LOCATION,
            DATE_OF_INTERVIEW, GENDER, EMPLOYEE_ACTIVE_STATUS, DOCUMENTS_STATUS,
            ASSET_STATUS, BLOOD_GROUP, MARRIED_STATUS, FATHER_NAME,
            FATHER_PHONE_NUMBER, MOTHER_NAME, MOTHER_PHONE_NUMBER, EMERGENCY_CONTACT_NUMBER,
            GUARDIAN,GUARDIAN_PHONE_NUMBER
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        normalize(EMPLOYEE_ID),
        normalize(PERFORMANCE_KEY),
        normalize(DATE_OF_BIRTH),
        normalize(NAME),
        normalize(DESIGNATION),
        normalize(DATE_OF_JOINING),
        normalize(MAIL_ID),
        normalize(PHONE),
        normalize(ADDRESS),
        normalize(CTC),
        normalize(DEPARTMENT),
        normalize(LOCATION),
        normalize(DATE_OF_INTERVIEW),
        normalize(GENDER),
        normalize(EMPLOYEE_ACTIVE_STATUS),
        normalize(DOCUMENTS_STATUS),
        normalize(ASSET_STATUS),
        normalize(BLOOD_GROUP),
        normalize(MARRIED_STATUS),
        normalize(FATHER_NAME),
        normalize(FATHER_PHONE_NUMBER),
        normalize(MOTHER_NAME),
        normalize(MOTHER_PHONE_NUMBER),
        normalize(EMERGENCY_CONTACT_NUMBER),
        normalize(GUARDIAN),
        normalize(GUARDIAN_PHONE_NUMBER)
    ];

    db.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Failed to insert the employee", error: error.message });
        }
        res.status(201).json({ message: "Employee added successfully", insertedId: result.insertId });
    });
};

const DeleteInterview = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID is required to delete the interview record." });
    }

    const query = 'DELETE FROM onboard WHERE ID = ?';
    db.query(query, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Failed to delete the interview record", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No record found with the given ID" });
        }

        res.json({ message: "Interview record deleted successfully" });
    });
};

const GetEmployee=(req,res)=>{

    const query = 'SELECT * FROM employees';
    db.query(query,(error,results) => {
        if (error) {
            return res.json({ error: 'Database query failed' });
        }
        // Replace null or undefined values with empty strings
        const cleanedResults=results.map(row=>{
            const cleanedRow={};
            for (const key in row) {
                cleanedRow[key]=row[key] ?? "";
            }
            return cleanedRow;
        });
        res.json(cleanedResults);
    });
    
}



const getDocDetial=(req,res)=>{
     const query = 'SELECT * FROM employee_doc';

    db.query(query,(error,results) => {
        if (error) {
            return res.json({ error: 'Database query failed' ,error:error.message});
        }
        // Replace null or undefined values with empty strings
        const cleanedResults=results.map(row=>{
            const cleanedRow={};
            for (const key in row) {
                cleanedRow[key]=row[key] ?? "";
            }
            return cleanedRow;
        });
        res.json(cleanedResults);
    });
           
}

const DocStatusUpdate = (req, res) => {
    const { EMPLOYEE_ID, field } = req.body;

    const allowedFields = [
        "TENTH", "TWELFTH", "DEGREE", "AADHAR", "PAN",
        "RELIEVING_LETTER", "PAY_SLIP_3_MONTHS", "PARENTS_AADHAR", "DRIVE_LINK"
    ];

    if (!EMPLOYEE_ID || !field) {
        return res.json({ message: "EMPLOYEE_ID and field are required." });
    }

    if (!allowedFields.includes(field)) {
        return res.json({ message: "Invalid document field name." });
    }

    const query = `UPDATE employee_doc SET ${field} = 1 WHERE EMPLOYEE_ID = ?`;

    db.query(query, [EMPLOYEE_ID], (error, result) => {
        if (error) {
            return res.json({ message: "Failed to update document status", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.json({ message: "No record found with the given EMPLOYEE_ID" });
        }

        return res.json({ message: `Document '${field}' marked as submitted for employee '${EMPLOYEE_ID}'` });
    });
};

const GetAssets = (req, res) => {
    const query = 'SELECT * FROM assets';

    db.query(query, (error, results) => {
        if (error) {
            return res.json({ error: 'Database query failed', details: error.message });
        }

        // Clean null/undefined fields
        const cleanedResults = results.map(row => {
            const cleanedRow = {};
            for (const key in row) {
                cleanedRow[key] = row[key] ?? "";
            }
            return cleanedRow;
        });

        res.json(cleanedResults);
    });
};

const UpdateAssets = (req, res) => {
   
  const {
    EMPLOYEE_ID,
    PERFORMANCE_KEY,
    NAME,
    DESIGNATION,
    DEPARTMENT,
    LOCATION,
    LAPTOP_STATUS,      
    LAPTOP_BRAND ,       
    LAPTOP_MODEL,      
    LAPTOP_SERIAL_NUMBER,
    LAPTOP_CHARGER,
    MOUSE ,       
    MOBILE_STATUS,       
    MOBILE_BRAND ,     
    MOBILE_MODEL ,     
    MOBILE_IMEI_NUMBER1,
    MOBILE_IMEI_NUMBER2,
    MOBILE_CHARGER ,   
    CUG_NUMBER ,     
    HEADSET_STATUS,  
    HEADSET 
  } = req.body;

  if (!EMPLOYEE_ID) {
    return res.json({ message: "EMPLOYEE_ID is required for update." });
  }

  const query = `
    UPDATE assets
    SET 
      PERFORMANCE_KEY = ?, NAME = ?, DESIGNATION = ?, DEPARTMENT = ?, LOCATION = ?,
      LAPTOP_STATUS = ?, LAPTOP_BRAND = ?, LAPTOP_MODEL = ?, LAPTOP_SERIAL_NUMBER = ?,
      LAPTOP_CHARGER = ?, MOUSE = ?, MOBILE_STATUS = ?, MOBILE_BRAND = ?, MOBILE_MODEL = ?,
      MOBILE_IMEI_NUMBER1 = ?, MOBILE_IMEI_NUMBER2 = ?, MOBILE_CHARGER = ?, CUG_NUMBER = ?, 
      HEADSET_STATUS = ?, HEADSET = ?
    WHERE EMPLOYEE_ID = ?
  `;

  const values = [
    PERFORMANCE_KEY, NAME, DESIGNATION, DEPARTMENT, LOCATION,
    LAPTOP_STATUS, LAPTOP_BRAND, LAPTOP_MODEL, LAPTOP_SERIAL_NUMBER,
    LAPTOP_CHARGER, MOUSE, MOBILE_STATUS, MOBILE_BRAND, MOBILE_MODEL,
    MOBILE_IMEI_NUMBER1, MOBILE_IMEI_NUMBER2, MOBILE_CHARGER,
    CUG_NUMBER, HEADSET_STATUS, HEADSET,
    EMPLOYEE_ID 
  ];

  db.query(query, values, (error, result) => {
    if (error) {
      return res.json({ message: "Failed to update the Assets Details", error: error.message });
    }

    if (result.affectedRows === 0) {
      return res.json({ message: "No record found with the given EMPLOYEE_ID" });
    }

    res.json({ message: "Assets record updated successfully" });
  });
};


const Login = (req, res) => {
    const { email, password } = req.body;
   

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required." });
    }

    const query = 'SELECT * FROM login WHERE EMAIL = ?';

    db.query(query, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database query failed", error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found!" });
        }

        const user = results[0];
       
        // Plain-text password comparison
        if (user.PASSWORD != password) {
            return res.status(401).json({ message: "Incorrect password!" });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.EMAIL }, "demo", { expiresIn: "2d" });

        res.status(200).json({
            message: "Login successful",
            token,
            email: user.EMAIL,
        });
    });
};

const sendEmail=async(req,res)=>{
     const { OTP, recipitent_email } = req.body;

    if (!OTP || !recipitent_email) {
        return res.status(400).json({ message: "OTP and recipient email are required." });
    }

    // Create a transporter using your email service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Noquhrms2025@gmail.com', // replace with your email
            pass: 'cjrlqamxfjphcvgm'     // use an App Password if using Gmail
        }
    });

    // Email options
    const mailOptions = {
    from: 'Noquhrms2025@gmail.com',
    to: recipitent_email,
    subject: 'Your OTP Code',
    html: `
        <p>Hello,</p>
        <p>You requested to verify your email. Please use the OTP below to complete the verification:</p>
        <h3>Your OTP is: <span style="color: #ffbb00;">${OTP}</span></h3>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <br/>
        <p>Regards,<br/>Hrms NOQU</p>
    `
};


    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }


}

const CheckEmail=(req,res)=>{

     const {recipitent_email} = req.body;
    if (!recipitent_email) {
        return res.status(400).json({ message: "Email are required." });
    }

    const query = 'SELECT * FROM login WHERE EMAIL = ?';

    db.query(query, [recipitent_email], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Database query failed", error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json({
            message: "Email Exist",
        });
    });
}

const ResetPassword=(req,res)=>{
     const {email,newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required." });
    }

    const query = 'UPDATE login SET PASSWORD = ? WHERE EMAIL = ?';

    db.query(query, [newPassword, email], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Failed to update password", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No user found with the given email." });
        }

        res.status(200).json({ message: "Password updated successfully" });
    });

}



cloudinary.config({
  cloud_name: 'dgdnub8dv',
  api_key: '963529246183818',
  api_secret: '1hetzCVXBdGpiDSBhmqemhFnaew'
});


const Cloudinary = (req, res) => {
  const { folder, public_id } = req.body;

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: folder,
      public_id: public_id
    },
    cloudinary.config().api_secret
  );

  res.json({
    cloudName: cloudinary.config().cloud_name,
    apiKey: cloudinary.config().api_key,
    timestamp: timestamp,
    signature: signature
  });
};


const UpdateAssetsStatus = (req, res) => {
    const { EMPLOYEE_ID } = req.body;

    if (!EMPLOYEE_ID) {
        return res.status(400).json({ message: "EMPLOYEE_ID is required." });
    }

    const query = 'UPDATE employees SET ASSET_STATUS = 1 WHERE EMPLOYEE_ID = ?';

    db.query(query, [EMPLOYEE_ID], (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Failed to update asset status", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No employee found with the given EMPLOYEE_ID." });
        }

        res.status(200).json({ message: "Asset status updated successfully." });
    });
};


const EmployeeDoc = (req, res) => {
  const {
    PERFORMANCE_KEY,
    EMPLOYEE_ID,
    NAME,
    DESIGNATION,
    DEPARTMENT
  } = req.body;

  if (!PERFORMANCE_KEY) {
    return res.status(400).json({ error: "PERFORMANCE_KEY is required" });
  }

  const sql = `
    INSERT INTO employee_doc 
    (PERFORMANCE_KEY, EMPLOYEE_ID, NAME, DESIGNATION, DEPARTMENT) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [PERFORMANCE_KEY, EMPLOYEE_ID, NAME, DESIGNATION, DEPARTMENT];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({ message: "Employee document added successfully", data: result });
  });
};

const EmployeeAsset=(req,res)=>{
     const {
    PERFORMANCE_KEY,
    EMPLOYEE_ID,
    NAME,
    DESIGNATION,
    DEPARTMENT,
    LOCATION
  } = req.body;

  if (!PERFORMANCE_KEY) {
    return res.status(400).json({ error: "PERFORMANCE_KEY is required" });
  }

  const sql = `
    INSERT INTO assets 
    (PERFORMANCE_KEY, EMPLOYEE_ID, NAME, DESIGNATION, DEPARTMENT,LOCATION) 
    VALUES (?, ?, ?, ?, ?,?)
  `;

  const values = [PERFORMANCE_KEY, EMPLOYEE_ID, NAME, DESIGNATION, DEPARTMENT,LOCATION];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({ message: "Employee Assets added successfully", data: result });
  });
}


const EmployeeDocUpdate = (req, res) => {
  const {
    EMPLOYEE_ID,
    NAME,
    DESIGNATION,
    DEPARTMENT
  } = req.body;

  if (!EMPLOYEE_ID) {
    return res.status(400).json({ error: "EMPLOYEE_ID is required for update" });
  }

  const sql = `
    UPDATE employee_doc
    SET NAME = ?, DESIGNATION = ?, DEPARTMENT = ?
    WHERE EMPLOYEE_ID = ?
  `;

  const values = [NAME, DESIGNATION, DEPARTMENT, EMPLOYEE_ID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee document updated successfully" });
  });
};


const EmployeeAssetUpdate = (req, res) => {
  const {
    EMPLOYEE_ID,
    NAME,
    DESIGNATION,
    DEPARTMENT,
    LOCATION
  } = req.body;

  if (!EMPLOYEE_ID) {
    return res.status(400).json({ error: "EMPLOYEE_ID is required for update" });
  }

  const sql = `
    UPDATE assets 
    SET  NAME = ?, DESIGNATION = ?, DEPARTMENT = ?, LOCATION = ?
    WHERE EMPLOYEE_ID = ?
  `;

  const values = [NAME, DESIGNATION, DEPARTMENT, LOCATION, EMPLOYEE_ID];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee asset updated successfully" });
  });
};



const Addonboard = (req, res) => {
  const {
    NAME,
    GENDER,
    DATE_OF_BIRTH,
    MAIL_ID,
    PHONE_NUMBER,
    ADDRESS,
    DOI,
    CTC,
    DESIGNATION,
    DOJ
  } = req.body;

  const query = `
    INSERT INTO onboard 
    (NAME, GENDER, DATE_OF_BIRTH, MAIL_ID, PHONE_NUMBER, ADDRESS, DOI,CTC,DESIGNATION,DOJ) 
    VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)
  `;

  const values = [
    NAME, GENDER, DATE_OF_BIRTH, MAIL_ID, PHONE_NUMBER, ADDRESS, DOI,CTC,DESIGNATION,DOJ
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    res.status(200).json({ message: "Candidate added successfully", insertedId: result.insertId });
  });
};




const UpdateInterview_list = (req, res) => {
  const { ID, STATUS, CONDUCTED_BY, CTC, ROLE, DOJ } = req.body;

  if (!ID || !STATUS) {
    return res.status(400).json({ message: "ID and STATUS are required." });
  }

  // Fix the parameter order - STATUS comes first, then other fields, then ID last
  const query = "UPDATE interview_list1 SET STATUS = ?, CONDUCTED_BY = ?, CTC = ?, ROLE = ?, DOJ = ? WHERE ID = ?";

  db.query(query, [STATUS, CONDUCTED_BY, CTC, ROLE, DOJ, ID], (err, result) => {
    if (err) {
      console.error("Error updating interview status:", err);
      return res.status(500).json({ message: "Database update failed." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Interview record not found." });
    }

    return res.status(200).json({ message: `Status updated to ${STATUS}` });
  });
};


const UpdateRejectReason = async (req, res) => {
  const { ID, STATUS, REJECTION_REASON,CONDUCTED_BY } = req.body;

  if (!ID || !STATUS) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = `
      UPDATE interview_list1
      SET STATUS = ?, REJECTION_REASON = ? ,CONDUCTED_BY=?
      WHERE ID = ?
    `;
    await db.execute(query, [STATUS, REJECTION_REASON,CONDUCTED_BY, ID]);
    res.json({ message: "Rejection reason saved" });
  } catch (err) {
    console.error("Error in rejection update:", err); // ✅ Add logging
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};







export { getInterviewList1,updateList,getInterviewList,getuserById,AddEmployee,DeleteInterview,GetEmployee,getDocDetial,DocStatusUpdate,GetAssets,UpdateAssets,Login,sendEmail,CheckEmail,ResetPassword,Cloudinary,UpdateAssetsStatus,EmployeeDoc,EmployeeAsset,EmployeeDocUpdate,EmployeeAssetUpdate,Addonboard,UpdateInterview_list,UpdateRejectReason };
