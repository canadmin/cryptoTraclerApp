const regexPriceAndAmount = /^\d+(\.\d*[0-9])?$/g
import {ids} from './coinGeckoIds'
import "intl";
import "intl/locale-data/jsonp/en";


export const round = (value) => {
  if (value > 1) {
    return Number(Math.round(value + "e" + 2) + "e-" + 2);
  }else{
    return Number(Math.round(value + "e" + 8) + "e-" + 8);
  }
};
export const negativeRound = (num) => {
  return num < 0 ? Math.floor(Math.abs(num) * 100) * -1 / 100 : num.toFixed(2)
}
export const floorCalc =  (num) =>
{
  let units = ["M","B","T","Q"]
  let unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
  let r = unit%3
  let x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
  return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
}



export const validatePriceAndAmount = (priceAndAmount) => {
  let flag = regexPriceAndAmount.test(priceAndAmount)
  return flag;
}


export const priceFormat = (price) => {
 if(price < 1){
   return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 ,
     style: 'currency',
     currency: 'USD'}).format(price);
 } else {
   return (price).toLocaleString('en-US', {
     style: 'currency',
     currency: 'USD',
   });
 }

}

export const getCoinGeckoId = (symbol) => {
  const ids2 = ids.find((element) => element.symbol === symbol);
  return ids2.id;
}


export const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
