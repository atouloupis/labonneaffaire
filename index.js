//curl

const curl = new (require( 'curl-request' ))();
const htmlToJson = require( 'html-to-json' );

curl.setHeaders([
'https://www.seloger.com/list.htm?projects=2&types=1,2&natures=1&places=[{cp:75}|{ci:950210}]&price=NaN/100000&surface=12/NaN&enterprise=0&qsVersion=1.0',
'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:76.0) Gecko/20100101 Firefox/76.0',
'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Accept-Language: en-US,en;q=0.5',
'Referer: https://www.seloger.com/',
'Connection: keep-alive',
'Cookie: __uzma=9a97ccc7-c1a7-a94b-d024-76262a117cba; __uzmb=1591218497; __uzmc=909372266899; __uzmd=1591218540; atuserid=%7B%22name%22%3A%22atuserid%22%2C%22val%22%3A%22572f8e56-b1c5-42f8-a25e-d0ee85c65ef2%22%2C%22options%22%3A%7B%22end%22%3A%222021-07-05T21%3A08%3A20.537Z%22%2C%22path%22%3A%22%2F%22%7D%7D; visitId=1591218500655-1627184445; theshield_cmp_consent={%22consentString%22:%22eyJhdWRpZW5jZSI6WyIqIl0sInNvY2lhbCI6WyIqIl0sImFuYWx5dGljcyI6WyIqIl0sImlhYiI6W3siaWQiOjEsInZlbmRvcnMiOlsiKiJdfSx7ImlkIjoyLCJ2ZW5kb3JzIjpbIioiXX0seyJpZCI6MywidmVuZG9ycyI6WyIqIl19LHsiaWQiOjQsInZlbmRvcnMiOlsiKiJdfSx7ImlkIjo1LCJ2ZW5kb3JzIjpbIioiXX1dLCJhZHMiOlsiKiJdfQ%253D%253D%22}; theshield_consent={%22consentString%22:%22BO0cKzqO0cKzqCyABBFRAk-AAAAXyABgACAvgA%22}; bannerCookie=1; _gcl_au=1.1.1688909506.1591218537; AMCV_366134FA53DB27860A490D44%40AdobeOrg=1099438348%7CMCIDTS%7C18417%7CMCMID%7C40161225907068768643469658714376345174%7CMCAID%7CNONE%7CMCOPTOUT-1591225744s%7CNONE%7CMCAAMLH-1591823345%7C6%7CMCAAMB-1591823345%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCSYNCSOP%7C411-18424%7CvVersion%7C2.1.0; ry_ry-s3oa268o_realytics=eyJpZCI6InJ5XzBFOEFDNjJCLUE3REMtNEFEQi04RUJDLTRENDU0MDY5ODVDMiIsImNpZCI6bnVsbCwiZXhwIjoxNjIyNzU0NTM5ODc4LCJjcyI6bnVsbH0%3D; ry_ry-s3oa268o_so_realytics=eyJpZCI6InJ5XzBFOEFDNjJCLUE3REMtNEFEQi04RUJDLTRENDU0MDY5ODVDMiIsImNpZCI6bnVsbCwib3JpZ2luIjpmYWxzZSwicmVmIjpudWxsLCJjb250IjpudWxsLCJucyI6dHJ1ZX0%3D; s_ecid=MCMID%7C40161225907068768643469658714376345174; _ga=GA1.2.1495529368.1591218544; _gid=GA1.2.1906934740.1591218544; _gat_UA-482515-1=1; chk=2d82ae5d-143e-47de-b61c-a51de69a286a; AMCVS_366134FA53DB27860A490D44%40AdobeOrg=1; s_visit=1; s_getNewRepeat=1591218546059-New; s_dl=1; stack_ch=%5B%5B%27Reprise%2520Visite%27%2C%271591218546124%27%5D%5D; s_cc=true; _gat_UA-155862534-1=1; _hjid=e23f427c-a1a6-4ca9-acf9-8769d3cd0971; _hjAbsoluteSessionInProgress=1; cto_bundle=kwNhCl90ZTVFTnRhMG00WXZPM04zN1hnNE5PeUlqbjZlNzYzMFpESE80U3VaRVFqTnJEZmUlMkJBNTl1TjM4UTU2d3l2NlNOcVB5bHJkQ01GU0UlMkJtViUyQm1SbHVjMHFnaVFzZjhJUThCUUt1JTJGcnVWZWklMkZpSFd6TDhrclJZeiUyRjg0cGc1ZVdwYlllcURRNWxzS1NSTVBTdzRmdjY0b2clM0QlM0Q',
'Upgrade-Insecure-Requests: 1',
'Cache-Control: max-age=0',
'TE: Trailers'
])
.get('https://www.seloger.com/list.htm?tri=initial&enterprise=0&idtypebien=2,1&idtt=2,5&naturebien=1,2,4&ci=780227')
.then(({statusCode, body, headers}) => {
    

htmlToJson.parse(body, function () {
  return this.map('.mVWFG', function ($item) {
    return $item.text();
  });
}).done(function (items) {
  // Items should be: ['1','2']
  console.log(items);
}, function (err) {
  // Handle error
});

    // console.log(statusCode, body, headers)
})
.catch((e) => {
    console.log(e);
});

