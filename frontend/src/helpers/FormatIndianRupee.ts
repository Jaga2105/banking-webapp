export const formatIndianRupees = (value: string): string => {
  // Remove all non-digit characters
  const numStr = value.replace(/\D/g, '');
  
  // Convert to number and format with commas
  return numStr === '' 
    ? '' 
    : new Intl.NumberFormat('en-IN').format(Number(numStr));
};