const createWriteOffCode = (writeOffType) => {
    let writeOffCode;
    switch (writeOffType) {
      case 'РЕМОНТ':
        writeOffCode = 401;
        break;
      case 'ТО':
        writeOffCode = 402;
        break;
      default:
        writeOffCode = 0;
    }
    return writeOffCode
}

export default createWriteOffCode;
