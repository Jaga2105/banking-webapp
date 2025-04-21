function generateDummyPassword() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    // const specialChars = '!@#$%^&*()_+{}:"<>?[];,./`~';
  
    const allChars = alphabets + numbers ;
  
    let password = '';
  
    password += alphabets[Math.floor(Math.random() * alphabets.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    // password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
    for (let i = 3; i < 6; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
  
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  }
  
  // Export the function
  module.exports = generateDummyPassword;