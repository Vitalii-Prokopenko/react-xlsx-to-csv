import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import CsvDownloadButton from 'react-json-to-csv';
import { nanoid } from 'nanoid';
import DownloadBudgets from './downloadBudgets/DownloadBudgets';
import refs from '../js/refs';
import css from './app.module.css';
import extractListOfMonthHeaders from 'js/extractListOfMonthHeaders';
import extractListOfDepartments from 'js/extractListOfDepartments';
import createDepartmentMonthBudget from 'js/createDepartmentMonthBudget';

const App = () => {
  const [file, setFile] = useState(null);
  const [exportedData, setExportedData] = useState([]);
  const [isGenerated, setIsGenerated] = useState(false);

  useEffect(() => {
    setIsGenerated(true);
  }, [exportedData]);

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);

        const departmentHeaders = extractListOfDepartments(jsonData);

        const headers = jsonData[0];
        const monthHeaders = extractListOfMonthHeaders(headers);

        console.log(monthHeaders);
        console.log(departmentHeaders);

        let budgets = [];

        departmentHeaders.forEach(department => {
          let departmentBudgets = [];
          monthHeaders.forEach((month, index) => {
            const monthLetters = month.split('');
            let monthHeaderNumber = '';
            for (let i = 0; i <= monthLetters.length - 1; i += 1) {
              const letterParsedInt = Number.parseInt(monthLetters[i]);
              const isNumber = !Number.isNaN(letterParsedInt);

              if (isNumber) {
                monthHeaderNumber += monthLetters[i];
              }
            }

            // console.log(monthHeaderNumber)
            const monthNumber = index +1;

            const departmentMonthBudget = createDepartmentMonthBudget(
              jsonData,              
              monthHeaderNumber,
              department
            );

            // departmentBudgets.push(departmentMonthBudget);

            const budgetObj = {
              budgetId: nanoid(),
              department: department,
              month: monthNumber,
              budget: departmentMonthBudget,
            };

            budgets.push(budgetObj);
          });

          // budgets.push(departmentBudgets);
        });

        // console.log(budgets);
        setExportedData(budgets);
        // console.log(exportedData);
      };

      reader.readAsBinaryString(file);
    }
  };

  const showBudgets = () => {
    console.log(exportedData);
  };

  return (
    <>
      <div className={css['title']}>React app template</div>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={e => setFile(e.target.files[0])}
      />
      <button onClick={handleConvert}>Convert</button>
      <button onClick={showBudgets}>Show</button>
      {/* <pre>{exportedData}</pre> */}
      {isGenerated && <DownloadBudgets budgets={exportedData} />}

      {/* <CsvDownloadButton
        data={exportedData}
        filename={'SRZA-03'}
        headers={refs.headers}
      /> */}
    </>
  );
};

export default App;
