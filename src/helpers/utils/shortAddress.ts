const shortAddress = (str: string):string => {
    return `${str.slice(0, 16)}...`;
}

export default shortAddress;