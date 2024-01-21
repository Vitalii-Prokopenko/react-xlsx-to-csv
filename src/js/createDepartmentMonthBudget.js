import createWriteOffCode from './createWriteOffCode';

const createDepartmentMonthBudget = (data, monthHeader, department) => {
  const departmentMonthBudget = [];

  console.log(monthHeader);
  console.log(department);

  data.filter(row => {
    const itemNameKey = 'Бюджет Дирекції "МЕРЕЖІ" на 2024 рік';

    const priceColumnNumber = '__EMPTY_5';

    const quantityColumnNumber = `__EMPTY_${monthHeader}`;
    const paymentColumnNumber = `__EMPTY_${Number(monthHeader) + 1}`;
    const writeOffColumnNumber = `__EMPTY_${Number(monthHeader) + 2}`;

    let writeOffString = '';
    let paymentString = '';
    let quantityString = '';
    let itemPriceString = '';

    if (row[writeOffColumnNumber]) {
      writeOffString = row[writeOffColumnNumber].toString().replace('.', ',');
    }

    if (row[paymentColumnNumber]) {
      paymentString = row[paymentColumnNumber].toString().replace('.', ',');
    }

    if (row[quantityColumnNumber]) {
      quantityString = row[quantityColumnNumber].toString().replace('.', ',');
    }

    if (row[priceColumnNumber]) {
      itemPriceString = row[priceColumnNumber].toString().replace('.', ',');
    }

    // console.log(`write-off ${writeOffString}`);
    // console.log(`payment ${paymentString}`);
    // console.log(`quantity ${quantityString}`);
    // console.log(`price ${itemPriceString}`);

    const writeOffCode = createWriteOffCode(row.__EMPTY_45);

    if (row.__EMPTY === department && row.__EMPTY_1) {
      const item = {
        pfm: row.__EMPTY_1,
        itemName: row[itemNameKey],
        providerName: 'не визначено',
        zzbstdk: '',
        bstdk: '',
        paymentTYPE: row.__EMPTY_3,
        wrbtr: '',
        writeOff: row[writeOffColumnNumber] ? writeOffString : 0,
        payment1: '',
        payment2: '',
        payment3: '',
        payment4: '',
        payment5: paymentString,
        itemQuantity: row[quantityColumnNumber] ? quantityString : 0,
        itemMeasure: row.__EMPTY_4,
        itemPrice: itemPriceString,
        paymentWeight: 100,
        writeOffCode: writeOffCode,
        itemGroup: row.__EMPTY_2,
      };

      departmentMonthBudget.push(item);
    }
    return departmentMonthBudget;
  });

  return departmentMonthBudget;
};

export default createDepartmentMonthBudget;
