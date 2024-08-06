const useValidate = () => {
  const passwordRegexp = /^(?=.*[0-9])(?=.*[A-Z]).*$/;

  function validationFunction(valueForValidate: string, rules: string) {
    let validationResult = '';

    if (rules === 'password') {
      if (valueForValidate.length === 0) validationResult = 'Fill out this field';
      else if (valueForValidate.length < 6) validationResult = 'Should contain 6 or more symbols';
      else if (valueForValidate.length > 20) validationResult = 'Should contain less than 20 symbols';
      else if (!passwordRegexp.test(valueForValidate))
        validationResult = 'Should contain at least 1 number and 1 capital letter';
    }

    return validationResult;
  }

  return validationFunction;
};

export default useValidate;
