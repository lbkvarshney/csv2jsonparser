var fs = require('fs');
var path = require('path');
var f = fs.readFileSync('./InputFile.csv', { encoding: 'utf-8' },
    function (err) { console.log(err); });
f = f.split(/\r\n|\r|\n/);
f.pop();
headers = f.shift().split(",");
var json = [];
f.forEach(function (d) {
    tmp = {}
    row = d.split(",")
    for (var i = 0; i < headers.length; i++) {
        if (headers[i] == "permissions") {
            tmp1 = [];
            if (row[i] != "") {
                f1 = row[i].split(";");
                var j = 0;

                f1.forEach(function (d1) {
                    tmp1[j] = d1;
                    ++j;
                });
            }
            tmp[headers[i]] = tmp1;
        }
        else
            tmp[headers[i]] = row[i];
    }
    json.push(tmp);
});
var compJson = { "resourcePermission": json };

var outPath = path.join(__dirname, './OutputFile.json');
fs.writeFileSync(outPath, JSON.stringify(compJson), 'utf8',
    function (err) { console.log(err); }); 