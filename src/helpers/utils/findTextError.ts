const findTextError = (message:string):boolean => {
    console.log("🚀 ~ file: findTextError.ts:2 ~ findTextError ~ message:", message)
    const indexOfSubstring = message.indexOf("User rejected the request");
    console.log("🚀 ~ file: findTextError.ts:4 ~ findTextError ~ indexOfSubstring:", indexOfSubstring)
    if (indexOfSubstring !== -1) {
        return true;
    }
    else {
        return false;
    }
}

export default findTextError;