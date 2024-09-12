export const getDateAndTime = () => {
    const instance = new Date().toLocaleDateString('en-GB');
    const timeinstance = new Date().toLocaleTimeString('en-GB');
    //converting the instance into yyyy-mm-dd format
    const formattedDate = instance.split('/');
    const day = formattedDate[0];
    const month = formattedDate[1];
    const year = formattedDate[2];
    // //converting time into 24-hr format
    const formattedTime = timeinstance.split(":");
    const hour = formattedTime[0];
    const min = formattedTime[1];
    return { year, month, day, hour, min }
}