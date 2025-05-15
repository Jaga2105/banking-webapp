export const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    const formattedDate = `${monthName} ${day}, ${year}`;
    return formattedDate;
}