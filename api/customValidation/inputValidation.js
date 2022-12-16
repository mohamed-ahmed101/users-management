module.exports = {
  userName: {
    type: "string",
    required: true,
    minLength: 5,
  },
  password: {
    type: "string",
    required: true,
    custom: (password) => {
      const regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      if (!regx.test(password))
        throw 'not vaild password, should be more than 6 characters contains numbers and letters';
      return true;
    }
  },
  email: {
    type: "string",
    required: true,
    isEmail: true,
  },
  age: {
    type: "number",
    required: true,
    min: 18,
    max: 50
  }
}