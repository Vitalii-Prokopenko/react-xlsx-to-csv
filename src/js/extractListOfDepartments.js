const extractListOfDepartments = data => {
  //Перетворює об'єкт з заголовками  у масив масивів
  const headersArr = Object.entries(data[0]);

  // Знаходить масив з заголовком стовпчика з назвами служб
  const departmentHeaderArr = headersArr.find(arr => arr[1] === 'СЛУЖБА');

  // Знаходить заголовок стовпчика з назвами служб
  const departmentHeader = departmentHeaderArr[0];

  // Створює масив з назвами служб з оснвоного масива об'єктів
  let departments = [];
  data.forEach(el => {
    const department = el[departmentHeader];
    if (department) {
      departments.push(department);
    }
  });

  // Створює масив з унікальними значеннями з масиву departments
  const uniqueDepartmentNames = departments.filter(
    (department, index, array) => array.indexOf(department) === index
  );

  // Створює масив з назвами служб
  const listOfDepartments = uniqueDepartmentNames.slice(
    1,
    uniqueDepartmentNames.length
  );

  return listOfDepartments;
};

export default extractListOfDepartments;
