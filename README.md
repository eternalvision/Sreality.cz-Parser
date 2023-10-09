
## Dokumentace

### Přehled

Tento kód je určen k automatickému sběru dat z realitního webu [www.sreality.cz](https://www.sreality.cz/hledani/prodej/byty/praha?strana=1 "www.sreality.cz"). Pomocí tohoto kódu lze vytáhnout informace o bytech nabízených k prodeji v Praze a uložit je do souboru `data.json`.

### Použité knihovny

- `cheerio`: Používá se k analýze a extrakci dat z HTML.
- `puppeteer`: Knihovna pro automatizaci akcí v prohlížeči (např. navigace na stránku a získání jejího obsahu).
- `fs`: Modul Node.js pro práci se souborovým systémem.

### Funkce

#### `getPageHtml(pageNumber)`

Tato asynchronní funkce je odpovědná za načtení obsahu webové stránky.

- **Argumenty**:
  - `pageNumber`: Číslo stránky k načtení.
- **Vrací**: HTML obsah stránky nebo `null` v případě chyby.

#### `scrapeData(pageNumber)`

Tato asynchronní funkce provádí hlavní úkol extrakce dat a jejich ukládání.

- **Argumenty**:
  - `pageNumber`: Číslo stránky, ze kterého začíná sběr dat.
- **Akce**:
  1. Načte HTML obsah stránky.
  2. Používá `cheerio` k analýze a extrakci dat o bytech.
  3. Kontroluje, zda soubor `data.json` existuje a pokud ano, načte stávající data.
  4. Přidá nová data k existujícím.
  5. Uloží kombinovaná data do `data.json`.
  6. Pokračuje na další stránku, pokud aktuální stránka není poslední.

### Spuštění

Kód automaticky začne sbírat data z první stránky při jeho spuštění.

### Výsledek

Po dokončení práce kódu budou všechna shromážděná data uložena v souboru `data.json`.
