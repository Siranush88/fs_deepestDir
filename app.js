import fs from 'fs';
import path from 'path';

function getLongestPath(dir) {

  const arrPaths = [];
  let fullPath;
  let deepestDirectoriesItem;
  let longestCollectionItem;

  const separator = path.sep;

  function getPaths(dir) {
    if(fs.lstatSync(dir).isDirectory()) {
      console.log(dir, 'here');
      fs.readdirSync(dir).map(file => {
        fullPath = path.join(dir, file);
        getPaths(fullPath);
  
      });
      
    } 
    arrPaths.push(fullPath);
  }

  getPaths(dir);

  let longest = 0;
  let longestCollection = [];

  arrPaths.forEach((item) => {
    const len = item.split(separator).length;
    if (longest < len) {
      longest = len;
      longestCollection = [item];
    } else if (longest === len) {
      longestCollection.push(item);
    }
  });

    longestCollection = [...new Set(longestCollection)];
  longestCollectionItem = longestCollection[0];

  deepestDirectoriesItem = longestCollectionItem.split(separator);
  const lastItem = deepestDirectoriesItem[deepestDirectoriesItem.length - 1];

  if(fs.lstatSync(lastItem).isFile()){
    deepestDirectoriesItem.splice(-1);
  }

  deepestDirectoriesItem = deepestDirectoriesItem.join(separator);

  

  const newFile = path.join(deepestDirectoriesItem, 'file.txt');
  fs.writeFile(newFile, 'hello world', function (err, file) {
    console.log(`'file.txt' is created successfully in >> ${deepestDirectoriesItem}`);
  });

}

getLongestPath('task');