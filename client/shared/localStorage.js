export default {
   
   getItem: (key) => {
      const result = localStorage.getItem(key);
      if (result && result !== 'undefined') {
         return JSON.parse(result);
      } else {
         return result;
      }
   },

   setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
   }
}