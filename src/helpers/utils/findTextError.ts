const findTextError = (message: string): boolean => {
  // console.log("🚀 ~ file: findTextError.ts:2 ~ findTextError ~ message:", message)
  const indexOfSubstring = message.indexOf("User rejected the request");
  if (indexOfSubstring !== -1) {
    return true;
  } else {
    return false;
  }
};

export default findTextError;
