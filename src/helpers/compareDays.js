const compareDays = (fecha1, fecha2) => {
  if (fecha1.getTime() > fecha2.getTime()) {
    return 1;
  }
  if (fecha1.getTime() > fecha2.getTime()) {
    return -1;
  }
};

export default compareDays;
