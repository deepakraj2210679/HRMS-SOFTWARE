import db from '../index.js';

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
        NAME,
        DESIGNATION,
        DATE_OF_JOINING,
        EMPLOYEE_ACTIVE_STATUS,
        DOCUMENTS_STATUS,
        ASSET_STATUS,
        MAIL_ID,
        PHONE,
        ADDRESS,
        CTC,
        DEPARTMENT,
        DOB,
        FATHER_NAME,
        MOTHER_NAME,
        FATHER_PHONE_NUMBER,
        MOTHER_PHONE_NUMBER,
        EMERGENCY_CONTACT_NUMBER,
        BLOOD_GROUP,
        MARRIED_STATUS,
        GENDER
    } = req.body;

    if (!EMPLOYEE_ID) {
        return res.status(400).json({ message: "EMPLOYEE_ID is required for update." });
    }
    
    const query = `
        UPDATE onboarding_list
        SET 
            NAME = ?, DESIGNATION = ?, DATE_OF_JOINING = ?, EMPLOYEE_ACTIVE_STATUS = ?, 
            DOCUMENTS_STATUS = ?, ASSET_STATUS = ?, MAIL_ID = ?, PHONE = ?, ADDRESS = ?, 
            CTC = ?, DEPARTMENT = ?, DOB = ?, FATHER_NAME = ?, MOTHER_NAME = ?, 
            FATHER_PHONE_NUMBER = ?, MOTHER_PHONE_NUMBER = ?, EMERGENCY_CONTACT_NUMBER = ?, 
            BLOOD_GROUP = ?, MARRIED_STATUS = ?, GENDER = ?
        WHERE EMPLOYEE_ID = ?
    `;

    const values = [
        NAME, DESIGNATION, DATE_OF_JOINING, EMPLOYEE_ACTIVE_STATUS,
        DOCUMENTS_STATUS, ASSET_STATUS, MAIL_ID, PHONE, ADDRESS,
        CTC, DEPARTMENT, DOB, FATHER_NAME, MOTHER_NAME,
        FATHER_PHONE_NUMBER, MOTHER_PHONE_NUMBER, EMERGENCY_CONTACT_NUMBER,
        BLOOD_GROUP, MARRIED_STATUS, GENDER, EMPLOYEE_ID
    ];

    db.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Failed to update the onboarding record", error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No record found with the given EMPLOYEE_ID" });
        }

        res.json({ message: "Onboarding record updated successfully" });
    });
};


const getuserById = (req, res) => {
    try {
        console.log(req.params);
        const user_id = req.params.id;

        db.query('SELECT * FROM onboarding_list WHERE EMPLOYEE_ID = ?', [user_id], (err, rows) => {
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
        PERFORMANCE_KEY,
        EMPLOYEE_ID,
        NAME,
        DESIGNATION,
        DATE_OF_JOINING,
        EMPLOYEE_ACTIVE_STATUS,
        DOCUMENTS_STATUS,
        ASSET_STATUS,
        MAIL_ID,
        PHONE,
        ADDRESS,
        CTC,
        DEPARTMENT,
        DOB,
        FATHER_NAME,
        MOTHER_NAME,
        FATHER_PHONE_NUMBER,
        MOTHER_PHONE_NUMBER,
        EMERGENCY_CONTACT_NUMBER,
        BLOOD_GROUP,
        MARRIED_STATUS,
        GENDER
    } = req.body;

    const query = `
        INSERT INTO employeedata1 (
            PERFORMANCE_KEY,EMPLOYEE_ID, NAME, DESIGNATION, DATE_OF_JOINING, EMPLOYEE_ACTIVE_STATUS,
            DOCUMENTS_STATUS, ASSET_STATUS, MAIL_ID, PHONE, ADDRESS, CTC, DEPARTMENT,
            DOB, FATHER_NAME, MOTHER_NAME, FATHER_PHONE_NUMBER, MOTHER_PHONE_NUMBER,
            EMERGENCY_CONTACT_NUMBER, BLOOD_GROUP, MARRIED_STATUS, GENDER
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        PERFORMANCE_KEY,
        EMPLOYEE_ID,
        NAME,
        DESIGNATION,
        DATE_OF_JOINING,
        EMPLOYEE_ACTIVE_STATUS,
        DOCUMENTS_STATUS,
        ASSET_STATUS,
        MAIL_ID,
        PHONE,
        ADDRESS,
        CTC,
        DEPARTMENT,
        DOB,
        FATHER_NAME,
        MOTHER_NAME,
        FATHER_PHONE_NUMBER,
        MOTHER_PHONE_NUMBER,
        EMERGENCY_CONTACT_NUMBER,
        BLOOD_GROUP,
        MARRIED_STATUS,
        GENDER
    ];

    db.query(query, values, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Failed to insert the employee", error: error.message });
        }
        res.status(201).json({ message: "Employee added successfully", insertedId: result.insertId });
    });
};

export { updateList,getInterviewList,getuserById,AddEmployee };
