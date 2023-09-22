const findTextError = (message:string):boolean => {
    const indexOfSubstring = message.indexOf("User rejected the request");
    if (indexOfSubstring !== -1) {
        return true;
    }
    else {
        return false;
    }
}

export default findTextError;