const puppeteer = require('puppeteer');

const urls = [
    "https://www.alternate.be/html/product/1757447",
    "https://www.alternate.be/Samsung/980-PRO-1-TB-SSD/html/product/1670614",
    "https://www.alternate.be/Corsair/4000D-AIRFLOW-Tempered-Glass-Tower-behuizing/html/product/1654929",
    "https://www.alternate.be/ASUS/ROG-Strix-GeForce-RTX-4080-16GB-OC-Edition-grafische-kaart/html/product/1876431"
]
const refreshInterval = 5000;

setInterval(function () {
    console.log("Refresh");
    start();
}, refreshInterval);


async function start() {
    urls.forEach(url => {
        console.clear();
        getProductInfo(url);
    })
}


async function getProductInfo(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const jsonLD = await page.$eval('script[type="application/ld+json"]', element => {
        return JSON.parse(element.textContent);
    });

    const product = jsonLD[0];



    console.log(product.name);
    console.log("brand: " + product.brand.name);
    console.log("€" + product.offers.price);
    if (product.offers.availability === "InStock") {
        console.log("\x1b[32m%s\x1b[0m",product.offers.availability);
    } else {
        console.error("\x1b[31m%s\x1b[0m", product.offers.availability)
    }

    console.log("------------------------------------------------------");
    await browser.close()
}