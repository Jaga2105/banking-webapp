export const formattedYear = (value: string): string => {
  // Remove all non-digit characters
  console.log(value)
  // const numStr = value.replace(/\D/g, '');
  // console.log(numStr)
  const str=Number(value.substring(0, 2))/12;
  const year = Math.floor(str);
  
  // Convert to number and format with commas
  return value === '' 
    ? '' 
    : year.toString();
};