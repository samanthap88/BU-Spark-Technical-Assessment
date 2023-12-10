import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CalcAllFinalGrade } from "../utils/calculate_grade";
import { IUniversityClass, IAssignments, IGrades , Grade} from "../types/api_types";


export function dummyData() {
 return [];
}


function DummyData(currClassId: string) {
 const [rows, setRows] = useState<any[]>([]);




 useEffect(() => {
   const fetchData = async () => {
     const BUID = "U04647117";
     const apiKey = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";
     const apiUrl = `https://spark-se-assessment-api.azurewebsites.net/api/class/listStudents/${currClassId}`;


     try {
       // Fetch class list
       const classListRes = await fetch(`${apiUrl}?BUID=${BUID}`, {
         headers: {
           "x-functions-key": apiKey,
         },
       });


       const classListTemp = await classListRes.json();


       let studentNames: string[] = [];
       let studentGrades: Grade [] = []
       let nameListTemp: IGrades = {
         classId: "",
         grades: [],
         name: "" ,
         studentId: "",
       }


       for (let i = 0; i < classListTemp.length; i++) {
         let studentId = classListTemp[i];
         const nameAPIURL = `https://spark-se-assessment-api.azurewebsites.net/api/student/listGrades/${studentId}/${currClassId}`;
         const nameListRes = await fetch(`${nameAPIURL}?BUID=${BUID}`, {
           headers: {
             "x-functions-key": apiKey,
           },
         });


         nameListTemp = await nameListRes.json();


         studentNames[i] = nameListTemp.name;
         studentGrades[i] = nameListTemp.grades[0]
       }


       const classInfo = `https://spark-se-assessment-api.azurewebsites.net/api/class/GetById/${currClassId}`;
       const classInfoRes = await fetch(`${classInfo}?BUID=${BUID}`, {
         headers: {
           "x-functions-key": apiKey,
         },
       });
       const classInfoTemp:IUniversityClass = await classInfoRes.json();
       let classTitle = classInfoTemp.title;
       let classSemester = classInfoTemp.semester;


       const assignmentInfo = `https://spark-se-assessment-api.azurewebsites.net/api/class/listAssignments/${currClassId}`;
       const assignmentInfoRes = await fetch(`${assignmentInfo}?BUID=${BUID}`, {
         headers: {
           "x-functions-key": apiKey,
         },
       });
      
       let assignmentInfoTemp:IAssignments = {
         assignment: []
       }
       assignmentInfoTemp.assignment = await assignmentInfoRes.json() ;


       console.log("this is nameListTemp.grades[0]"  , studentGrades)
      
       const AllGrades = await CalcAllFinalGrade(currClassId, studentNames, classInfoTemp, assignmentInfoTemp, studentGrades);


    


       // Map the data and update the state
       const mappedData = classListTemp.map((classItem: any) => ({
         id: classItem,
         name: studentNames[classListTemp.indexOf(classItem)],
         classID: currClassId,
         className: classTitle,
         semester: classSemester,
         finalGrade: AllGrades[studentNames[classListTemp.indexOf(classItem)]],
       }));


       setRows(mappedData);
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };


   fetchData();
 }, [currClassId]);


 return rows;
}


const columns: GridColDef[] = [
 { field: "id", headerName: "Student ID", width: 90 },
 {
   field: "name",
   headerName: "Student Name",
   width: 150,
   editable: true,
 },
 {
   field: "classID",
   headerName: "Class ID",
   width: 150,
   editable: true,
 },
 {
   field: "className",
   headerName: "Class Name",
   width: 110,
   editable: true,
 },
 {
   field: "semester",
   headerName: "Semester",
   width: 110,
   editable: true,
 },
 {
   field: "finalGrade",
   headerName: "Final Grade",
   width: 110,
   editable: true,
 },
];


export const GradeTable = ({ currClassId }: { currClassId: string }) => {
 return (
   <Box sx={{ height: 600, width: "100%" }}>
     <DataGrid rows={DummyData(currClassId)} columns={columns} />
   </Box>
 );
};



