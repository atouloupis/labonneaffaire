const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');
 
function getCastorus (name,startUrl)
{
(async () => {
 
    const config = {
        baseSiteUrl: `https://www.castorus.com/`,
        startUrl: startUrl,
        filePath: './castorus/',
        concurrency: 10,//Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
        maxRetries: 3,//The scraper will try to repeat a failed request few times(excluding 404). Default is 5.       
        logPath: './logs/'//Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data. 
    }
 
    const biens = [];//Holds all article objects.
 
    const getPageObject = (pageObject) => {//This will create an object for each page, with "title", "story" and "image" properties(The names we chose for our scraping operations below)
        biens.push(pageObject)
    }
 
    const scraper = new Scraper(config);//Create a new Scraper instance, and pass config to it.
 
    //Now we create the "operations" we need:
 
    const root = new Root({name:'root',getPageObject});//The root object fetches the startUrl, and starts the process.  
    //Any valid cheerio-advanced-selectors selector can be passed. For further reference: https://cheerio.js.org/
	const title = new CollectContent('td.title',{name:'title'});//read link
    const pricemeter = new CollectContent('td.hide_mobile.price',{name:'price_meter'});//read price squaremeter
	const surf = new CollectContent('td.surf',{name:'surface'});//read surface
	const since = new CollectContent('td.since ',{name:'depuis'});//read since when online
	const link = new OpenLinks('td.title a',{name:'link'});//read link

	
    // const price = new CollectContent('div.affprixbigs', { name: 'price' });//Downloads images. *It's important to choose a name, for the
    //getPageObject hook to produce the expected results.*  
 
    // const title = new CollectContent('h1 h1ficheannonce', { name: 'title' });//"Collects" the text from each H1 element.
 
    //const story = new CollectContent('section.meteredContent', { name: 'story' });//"Collects" the the article body.
 
    // root.addOperation(bien);//Then we create a scraping "tree":
	root.addOperation(title);
	root.addOperation(pricemeter);
	root.addOperation(surf);
	root.addOperation(since);
	root.addOperation(link);
	// link.addOperation(price);
       // bien.addOperation(price);
       // bien.addOperation(title);
      // bien.addOperation(story);

    await scraper.scrape(root);
  // console.log(root); 

    fs.writeFile('./extracts/'+name+'.json', JSON.stringify(biens), () => { })//Will produce a formatted JSON containing all article pages and their selected data.  
 
}

module.exports.getCastorus = getCastorus;
