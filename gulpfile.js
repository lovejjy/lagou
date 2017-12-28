var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');

gulp.task('server', function () {
    gulp.src('./')
        .pipe(server({
            host: 'localhost',
            port: 8080,
            open:true,
            fallback: 'index.html',
            middleware: function (req, res, next) {
                if (req.url === "/data") {
                    res.writeHead(200,{
                        "content-type":"text/json;charset=utf8",
                        "Access-Control-Allow-Origin": "*"
                    })
                    res.end(fs.readFileSync(path.join(__dirname,"data/data.json")));
                }else{
                    next();
                }
            }
        }))
})

gulp.task('default',['server']);