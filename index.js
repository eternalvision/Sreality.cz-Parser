const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");

async function getPageHtml(pageNumber) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(
            `https://www.sreality.cz/hledani/prodej/byty/praha?strana=${pageNumber}`,
            {
                waitUntil: "networkidle0",
            }
        );
        const html = await page.content();
        await browser.close();

        return html;
    } catch (error) {
        console.error("Error fetching page:", error);
        return null;
    }
}

async function scrapeData(pageNumber) {
    const html = await getPageHtml(pageNumber);
    if (!html) {
        return;
    }

    const $ = cheerio.load(html);
    const items = [];

    $("div.property.ng-scope").each((index, element) => {
        const addressLease = $(element).find("span.locality.ng-binding").text();
        const description = $(element).find("span.name.ng-binding").text();
        const sum = $(element)
            .find("span.norm-price.ng-binding")
            .text()
            .split("&nbsp;")
            .join(" ");
        const imageUrl = $(element).find("img").attr("src");
        const url = `https://www.sreality.cz/${$(element)
            .find("a.title")
            .attr("href")}`;

        const existingItem = items.find(
            (item) =>
                item.addressLease === addressLease &&
                item.description === description &&
                item.imageUrl === imageUrl &&
                item.url === url &&
                item.sum === sum
        );
        if (!existingItem) {
            items.push({ description, addressLease, sum, imageUrl, url });
        }
    });

    let data = [];

    if (fs.existsSync("data.json")) {
        const existingData = fs.readFileSync("data.json");
        data = JSON.parse(existingData);
    }

    data = data.concat(items);

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log(`Data for page ${pageNumber} saved to data.json`);

    const nextPageNumber = pageNumber + 1;
    if (nextPageNumber <= 50) {
        scrapeData(nextPageNumber);
    } else {
        console.log("Scraping completed");
    }
}

scrapeData(1);
