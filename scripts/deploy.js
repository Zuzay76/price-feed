async function main() {
 
    const contractFactory = await ethers.getContractFactory('PriceFeed');
    const contract = await contractFactory.deploy();
 
    console.log('***** Contract deployed to address: ', contract.address);
}
 
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });