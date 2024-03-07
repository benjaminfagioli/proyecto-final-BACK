const getDaysDifference = (fechaInicio, fechaFin) => {
  let diff = fechaFin.getTime() - fechaInicio.getTime();
  return diff / (1000 * 60 * 60 * 24);
};

export default getDaysDifference;
