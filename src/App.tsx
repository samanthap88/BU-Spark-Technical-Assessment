import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography, selectClasses } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import {} from "./globals";
import { IUniversityClass } from "./types/api_types";
import { GradeTable } from "./components/GradeTable";



function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);

  const [rows, setRows] = useState<any[]>([])
 

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */
  useEffect(() => {
    const fetchData = async () => {
      const BUID = "U04647117";
      const apiKey = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ==";
      const apiUrl = `https://spark-se-assessment-api.azurewebsites.net/api/class/listBySemester/fall2022`;

      // Fetch class list
      const classListRes = await fetch(`${apiUrl}?BUID=${BUID}`, {
        headers: {
          "x-functions-key": apiKey,
        },
      });
      const classListTemp = await classListRes.json()
      setClassList(classListTemp);
      
    };

    fetchData();
  }, []);

  function handleOnChange(value: string) {
    setCurrClassId(value)
    console.log("it has changed") 
    console.log("option value: ", value) 
    console.log("Selected value: " , currClassId) 
    
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <div style={{ width: "100%" }}>
            <select id="select" value={currClassId} onChange={e => handleOnChange(e.target.value)}>
              

            {classList.map((classItem) => (
                <option key={classItem.classId} value = {classItem.classId} >
                   {classItem.title}
                </option> 

              )) 
            }
              /* You'll need to place some code here to generate the list of items in the selection */
              
            </select>
          </div>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <GradeTable currClassId={currClassId}/> 
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
