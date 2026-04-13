Project Name: Student_Transformation_Project

Objective:
Create a transformation map in IBM Transformation Extender (WTX) that converts Student data from a flat file (TXT/CSV format) into structured XML format.

Input File Details:

- File Path:
  C:\Users\j13956\OneDrive - BNP Paribas\Attachments\SHIFT Message\student.txt
- Type: Delimited (CSV-like TXT)
- Delimiter: Comma (,)

Sample Input Data:
1,Ragul,19,20260413,ece,clgs1
2,Arun,28,20260413,cse,clgs2

Field Definition (Input):

1. StudentID (Integer)
2. Name (String)
3. Age (Integer)
4. Date (YYYYMMDD)
5. Department (String)
6. College (String)

Output Format (XML):

- Root Element: Students

Structure:
<Students>
<Student>
<StudentID></StudentID>
<Name></Name>
<Age></Age>
<Date></Date>
<Department></Department>
<College></College>
</Student>
</Students>

Transformation Logic:

1. Map all input fields to corresponding XML elements.
2. Convert Date from YYYYMMDD → YYYY-MM-DD format.
3. Trim spaces from Name, Department, and College.
4. Validate:
   - StudentID must not be empty.
   - Age must be > 0.

Components to Create:

1. Type Trees:
   
   - student_input.mtt (Delimited structure)
   - student_output.mtt (XML structure)

2. Map:
   
   - student_map.mms
   - Source: student_input.mtt
   - Target: student_output.mtt

3. Functional Maps:
   
   - format_date (convert YYYYMMDD to YYYY-MM-DD)

4. Card Settings:
   
   - Input Card:
     File → student.txt
     Path → C:\Users\j13956\OneDrive - BNP Paribas\Attachments\SHIFT Message\student.txt
   
   - Output Card:
     File → student_output.xml
   
   - Trace Settings:
     Enable Trace = Yes
     Trace Level = Full
     Trace File Path:
     C:\Users\j13956\OneDrive - BNP Paribas\Attachments\SHIFT Message\student_trace.log
     
     Trace Options:
     
     - Include Input Data = Yes
     - Include Output Data = Yes
     - Include Functional Map Calls = Yes
     - Include Errors & Warnings = Yes

5. Execution Steps:
   
   - Build map
   - Run transformation with trace enabled
   - Check trace log file for debugging
   - Verify XML output

Error Handling:

- Reject records with missing StudentID
- Log invalid Age values in trace
- Default missing fields to empty

Expected Output Example:
<Students>
<Student>
<StudentID>1</StudentID>
<Name>Ragul</Name>
<Age>19</Age>
<Date>2026-04-13</Date>
<Department>ece</Department>
<College>clgs1</College>
</Student>
</Students>
