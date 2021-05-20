import axios from 'axios';
import { showLoading, hideLoading } from '../reducer/loadReducer'
import store from '../store';

let runningCount = 0;

const ajax = (url) => {
   store.dispatch(showLoading());
   runningCount++;
   return new Promise((resolve, reject) => {
      axios.get(url)
         .then(function (response) {
            resolve(response);
         })
         .catch(function (error) {
            console.error(error)
            reject(error);
         })
         .then(function () {
            runningCount--;
            if(runningCount === 0){
               store.dispatch(hideLoading());
            }
         })
   })
}
export default ajax;
