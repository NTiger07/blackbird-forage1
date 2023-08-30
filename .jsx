<TextField
  error
  id="outlined-error-helper-text"
  label="Error"
  defaultValue="Hello World"
  helperText="Incorrect entry."
/>;
const validatePassword = () => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  setIsValid(passwordRegex.test(password));
};
