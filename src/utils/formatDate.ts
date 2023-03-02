export const formatDate = (date: Date) =>
{
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${month}/${day}/${year}`;
};