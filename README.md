## Documentation

### Overview

This code is designed to automatically scrape data from the real estate website [www.sreality.cz](https://www.sreality.cz/hledani/prodej/byty/praha?strana=1 "www.sreality.cz"). Using this code, you can extract information about apartments offered for sale in Prague and save them to a file named `data.json`.

### Libraries Used

-   `cheerio`: Used for parsing and extracting data from HTML.
-   `puppeteer`: A library for browser automation (e.g., navigating to a page and fetching its content).
-   `fs`: Node.js module for file system operations.

### Functions

#### `getPageHtml(pageNumber)`

This asynchronous function is responsible for fetching the web page's content.

-   **Arguments**:
    -   `pageNumber`: The page number to fetch.
-   **Returns**: The HTML content of the page or `null` in case of an error.

#### `scrapeData(pageNumber)`

This asynchronous function performs the main task of data extraction and saving.

-   **Arguments**:
    -   `pageNumber`: The starting page number for data scraping.
-   **Actions**:
    1. Loads the HTML content of the specified page.
    2. Uses `cheerio` to parse and extract apartment data.
    3. Checks if the `data.json` file exists and, if so, loads the existing data.
    4. Appends the new data to the existing data.
    5. Saves the combined data to `data.json`.
    6. Moves to the next page if the current page isn't the last one.

### Execution

The code automatically starts scraping data from the first page upon execution.

### Result

After the code completes its execution, all the scraped data will be saved in the `data.json` file.
