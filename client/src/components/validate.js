let validate = function (formData) {
  let errors = {};
  const regexLetters = /^[a-zA-Z]+$/;
  const regexNum = /\d/;

  if (!regexLetters.test(formData.name)) {
    errors.name = "Your name is unavailable";
  }

  if (formData.name.length >= 10) {
    errors.name = "The name is too long, try again!";
  }

  // Validación para bloquear entrada de números en el campo "name"
  if (regexNum.test(formData.name)) {
    errors.name = "Numbers are not allowed";
  }

  return errors;
};

export default validate;
