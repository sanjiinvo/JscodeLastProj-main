function getRandomNumbersMassive(min, max, count) {
    const numbers = [];
  
    for (let i = 0; i < count; i++) {
      const number = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(number);
    }
  
    return numbers;
  }
  
  export default getRandomNumbersMassive