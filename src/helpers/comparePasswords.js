import bcrypt from "bcrypt";
const comparePasswords = async (reqPassword, userPassword) => {
  const checkPassword = await bcrypt.compare(reqPassword, userPassword);
  return checkPassword;
};
export default comparePasswords;
