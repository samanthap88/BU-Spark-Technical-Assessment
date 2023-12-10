/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */
export interface IUniversityClass {
  classId: string;
  description: string;
  meetingLocation: string;
  meetingTime: string;
  semester: string;
  status: string;
  title: string;
  
}

export interface IAssignments {
  assignment: Assignment[] 
  
}

export interface Assignment {
  assignmentId: string; 
  classId: string ; 
  date: string ; 
  weight: number; 
}


export interface IGrades {
  classId: string ; 
  grades: Grade[]; 
  name: string ; 
  studentId: string ; 
}

export interface Grade {
  [assignmentID: string]: number
}

