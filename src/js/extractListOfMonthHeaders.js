const extractListOfMonthHeaders = data => {

  //Перетворює об'єкт з заголовками  у масив масивів
  const dataArr = Object.entries(data);

  // Створює масив заголовків стовпчиків з місяцами 
  let listOfMonthHeaders = [];

  for (let i = 1; i <= 12; i += 1) {
    const month = dataArr.find(arr => arr[1] === i);
    listOfMonthHeaders.push(month[0]);
  }

  return listOfMonthHeaders;
};

export default extractListOfMonthHeaders;
