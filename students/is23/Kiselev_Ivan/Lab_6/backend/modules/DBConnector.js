const fs = require('fs');
const path = require('path');

class DBConnector {
  constructor(filename) {
    this.filename = filename;
  }

  readFile() {
    const fullPath = path.join(process.cwd(), 'db', this.filename);
    const data = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(data);
  }

  writeFile(data) {
    const fullPath = path.join(process.cwd(), 'db', this.filename);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
  }
}

module.exports = { DBConnector };