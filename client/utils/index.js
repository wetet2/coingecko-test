export default {

   // 3자리마다 콤마
   comma3Digits: (amount) => {
      let intAmount = amount.toString().replace(/,/g, '').split('.')[0];
      let decimalAmount = amount.toString().split('.')[1]
      if (decimalAmount !== undefined) decimalAmount = '.' + decimalAmount;
      else decimalAmount = '';

      let result = '';
      let startAt = intAmount.length;
      let nagative = intAmount.substring(0, 1) === '-' ? '-' : '';
      while (true) {
         if (startAt <= 3) {
            result = intAmount.substring(0, startAt) + result;
            break;
         };
         result = ',' + intAmount.substring(startAt - 3, startAt) + result;
         startAt -= 3
      }
      return nagative + result + decimalAmount;
   },

   // Array에서 condition에 맞는 항목 삭제
   remove: (array, conditionCallback) => {
      array.reverse().forEach((e, i) => {
         if (conditionCallback(e) === true) {
            array.splice(i, 1);
         }
      });

      return array.reverse();
   }
}