const request = require('request');
const fs = require('fs'); //allows us to work with local fs
let args = process.argv.slice(2); //removes first 2 elements in array from command line

let domainName = args[0]; //first index of args
let dlPath = args[1]; //second index of args

request(domainName, (error, response, body) => {
  if (error) { //if general error
    console.log('There was an error downloading from the domainName: ', error);
  }
  fs.access(dlPath, (err) => { //checks accessibility to file path. if error ...
    if (err) {
      console.log('Unable to save file to download path.', err);
    }
    fs.exists(`${dlPath}`, (fileExists) => { //checks if file exists
      
      if (fileExists) { //if file does exist
        fs.writeFile(`${dlPath}`, body, function(err) { //if exists, write data (body) to file (dlPath)
          if (err) {
            console.log('There was an error saving the file: ', err); //if error ...
          }
          fs.stat(dlPath, (err, stat) => { //returns file stats (in this case .size)
            console.log(`File overwritten and saved ${stat.size} bytes to ${dlPath}`);
          });
        });

      } else { //if file does not exist
        fs.writeFile(`${dlPath}`, body, function(err) {
          if (err) {
            console.log('There was an error saving the file: ', err); 
          }
          fs.stat(dlPath, (err, stat) => {
            console.log(`File downloaded and saved ${stat.size} bytes to ${dlPath}`);
          });
        });
      }
    });
  });
});