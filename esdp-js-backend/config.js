const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        url: "mongodb://localhost/",
        name: "sneakers"
    },
    getDBPath: function() {
        return this.db.url + this.db.name;
    },
    facebook:{
        appId: "632833597236084",
        secretKey: "dff85891159bb69b20a27b4d81a5fc51"
    }
};
