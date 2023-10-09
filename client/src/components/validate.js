let validate = function (formData) {
  let errors = {};
  const regexLetras = /^[a-zA-Z]+$/;

  if (!regexLetras.test(formData.name)) {
    errors.name = "your name is unvailable";
  }
  if (formData.name.length >= 10) {
    errors.name = "the name should not be more than 10 characters";
  }

  return errors;
};

export default validate;
