import { IUniversityClass, IGrades, IAssignments, Grade} from "../types/api_types";
import React, { useEffect, useState } from "react";


export async function calculateStudentFinalGrade(
 studentID: string,
 classAssignments: IAssignments,
 klass: IUniversityClass,
 grades: Grade
): Promise<number> {
 if (!klass) {
   console.error("class details are not available");
   return 0;
 }
 //let grades = await fetchAllGrades(klass.classId, studentID);
  let sum = 0;


 console.log("this is assignments", classAssignments.assignment)
 const assignmentIdToFind = 'A3'


 for (let i = 0; i < classAssignments.assignment.length; i++) {
   //sum = sum + grades[1].score * classAssignments.assignment[0].weight;
   let weight = 1 ;
   const assignmentID = classAssignments.assignment[i].assignmentId
   for (let j = 0 ; j< classAssignments.assignment.length; j++) {
     if (classAssignments.assignment[j].assignmentId == assignmentID) {
       weight = classAssignments.assignment[j].weight
       weight = weight / 100
     }
   }
   const scores = Object.values(grades)
   const score: number = parseInt(scores[i].toString(),10)
   sum = sum + score * weight
 }


 return sum;
}


export async function CalcAllFinalGrade(classID: string, studentID: string[], details: IUniversityClass, assignment: IAssignments, grades: Grade[]): Promise<{ [studentID: string]: number }> {
 const finalGrades: { [studentID: string]: number } = {};
 const classDetails: IUniversityClass = details
 const assignments: IAssignments = assignment
 for (let i = 0 ; i< studentID.length; i++) {
   const studentFinalGrade = await calculateStudentFinalGrade(studentID[i], assignments, classDetails, grades[i]);
   finalGrades[studentID[i]] = studentFinalGrade
 }
 return finalGrades;
}


// Corrected hook name to start with "use"
export function useFetchClassDetails(classId: string): IUniversityClass | null {
 const [classDetails, setClassDetails] = useState<IUniversityClass | null>(null);


 useEffect(() => {
   const fetchData = async () => {
     const BUID = "U04647117";
     const apiKey = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";
     const apiUrl = `https://spark-se-assessment-api.azurewebsites.net/api/class/GetById/${classId}`;


     try {
       const classDetailsRes = await fetch(`${apiUrl}?BUID=${BUID}`, {
         headers: {
           "x-functions-key": apiKey,
         },
       });


       if (!classDetailsRes.ok) {
         throw new Error(`Failed to fetch class details: ${classDetailsRes.status}`);
       }


       const classDetailsData: IUniversityClass = await classDetailsRes.json();
       setClassDetails(classDetailsData);
     } catch (error) {
       console.error("Error fetching class details:", error);
     }
   };


   fetchData();
 }, [classId]);


 return classDetails;
}


async function fetchAllGrades(classId: string, studentId: string): Promise<any[]> {
 const BUID = "U04647117";
 const apiKey = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";
 const apiUrl = `https://spark-se-assessment-api.azurewebsites.net/api/student/listGrades/${studentId}/${classId}`;


 const gradesRes = await fetch(`${apiUrl}?BUID=${BUID}`, {
   headers: {
     "x-functions-key": apiKey,
   },
 });


 const gradesTemp: IGrades = await gradesRes.json();
 return gradesTemp.grades;
}


async function fetchAllAssignments(classId: string): Promise<IAssignments> {
 const BUID = "U04647117";
 const apiKey = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";
 const apiUrl = `https://spark-se-assessment-api.azurewebsites.net/api/class/listAssignments/${classId}`;


 const gradesRes = await fetch(`${apiUrl}?BUID=${BUID}`, {
   headers: {
     "x-functions-key": apiKey,
   },
 });


 const gradesTemp: IAssignments = await gradesRes.json();
 return gradesTemp;
}






