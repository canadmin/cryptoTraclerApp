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
