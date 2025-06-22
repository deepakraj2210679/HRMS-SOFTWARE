import db from '../index.js';
import jwt from 'jsonwebtoken';

const getInterviewList=(req,res)=>{
    const query = 'SELECT * FROM interview_list';

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
            MAIL_ID = ?, PHONE = ?, ADDRESS = ?, CTC = ?, DEPARTMENT = ?, DATE_OF_INTERVIEW = ?,
            GENDER = ?, EMPLOYEE_ACTIVE_STATUS = ?, DOCUMENTS_STATUS = ?, ASSET_STATUS = ?,
            BLOOD_GROUP = ?, MARRIED_STATUS = ?, FATHER_NAME = ?, MOTHER_NAME = ?,
            FATHER_PHONE_NUMBER = ?, MOTHER_PHONE_NUMBER = ?, EMERGENCY_CONTACT_NUMBER = ?,
            GUARDIAN = ?, GUARDIAN_PHONE_NUMBER = ?
        WHERE EMPLOYEE_ID = ?
    `;

    const values = [
        PERFORMANCE_KEY, DATE_OF_BIRTH, NAME, DESIGNATION, DATE_OF_JOINING,
        MAIL_ID, PHONE, ADDRESS, CTC, DEPARTMENT, DATE_OF_INTERVIEW,
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
            DATE_OF_JOINING, MAIL_ID, PHONE, ADDRESS, CTC, DEPARTMENT,
            DATE_OF_INTERVIEW, GENDER, EMPLOYEE_ACTIVE_STATUS, DOCUMENTS_STATUS,
            ASSET_STATUS, BLOOD_GROUP, MARRIED_STATUS, FATHER_NAME,
            FATHER_PHONE_NUMBER, MOTHER_NAME, MOTHER_PHONE_NUMBER, EMERGENCY_CONTACT_NUMBER,
            GUARDIAN,GUARDIAN_PHONE_NUMBER
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

    const query = 'DELETE FROM interview_list WHERE ID = ?';
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


export { updateList,getInterviewList,getuserById,AddEmployee,DeleteInterview,GetEmployee,getDocDetial,DocStatusUpdate,GetAssets,UpdateAssets,Login };
