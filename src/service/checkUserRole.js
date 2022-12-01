import dateFormat from 'dateformat';
import { getLocal } from './localStorage';

export const isFreeUser = () => {

    let user = getLocal('user');

  var userExpireDate = dateFormat(user?.expireDate, 'yyyy-mm-dd')
  var today = dateFormat(new Date(), 'yyyy-mm-dd')
    if(user.role) {
      return false
    }
    else if (userExpireDate > today) {
      return false
    }
    else {
      return true
    }
 }
