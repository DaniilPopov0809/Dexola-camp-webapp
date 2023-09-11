const convertStru = (wei: bigint) => {
    const balanceInWei = BigInt(wei);
const balanceInTokens = balanceInWei / BigInt("1000000000000000000");
return balanceInTokens.toString(); 

}

export default convertStru;