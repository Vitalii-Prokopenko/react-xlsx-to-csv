import React from 'react';
import PropTypes from 'prop-types';
import CsvDownloadButton from 'react-json-to-csv';
import refs from '../../js/refs';

const DownloadBudgets = budgets => {
  console.log(budgets);
  const data = budgets.budgets;
  return (
    <ul>
      {data.map(budget => {
        return (
          <li key={budget.budgetId}>
            <p>{budget.department}</p>
            <p>{budget.month}</p>
            <CsvDownloadButton
            key={budget.budgetId}
              data={budget.budget}
              // filename={'SRZA-03'}
              headers={refs.headers}
            />
          </li>
        );
      })}
    </ul>
  );
};

DownloadBudgets.propTypes = {
  budgets: PropTypes.arrayOf(
    PropTypes.shape({
      budgetId: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      month: PropTypes.number.isRequired,
      budget: PropTypes.array.isRequired,
    })
  ),
};

export default DownloadBudgets;
