const fs = require('fs');
const path = require('path');

const sourceDir = "../source-directory"; // Assuming this is a relative path
const destinationDir = "../destination-directory"; 

// Resolve the source and destination paths to absolute paths
const resolvedSourceDir = path.resolve(__dirname, sourceDir);
const resolvedDestinationDir = path.resolve(__dirname, destinationDir);

function copyFile(sourcePath, destinationPath) {
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);
  readStream.pipe(writeStream);
}

function copyDirectories(source, destination) {
  if (fs.existsSync(source)) { 
    const sourceStats = fs.statSync(source);

    if (sourceStats.isDirectory()) {
      fs.mkdirSync(destination, { recursive: true });

      const files = fs.readdirSync(source);
      files.forEach(file => {
        const sourcePath = path.join(source, file);
        const destinationPath = path.join(destination, file);
        copyDirectories(sourcePath, destinationPath);
      });
    } else if (sourceStats.isFile()) {
      copyFile(source, destination);
    }
  }
}


function performCopy() {
  try {
    console.log('Starting copy.....');
    copyDirectories(resolvedSourceDir, resolvedDestinationDir);
    console.log('Copy completed');
  } catch (error) {
    console.log('Error during copy', error);
  }
}

performCopy();






