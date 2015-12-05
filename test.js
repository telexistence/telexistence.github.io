<!DOCTYPE html>
<html lang="ja">
<head>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-store">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="-1">
    <meta name="expires" content="0">
    <meta name="viewport" content="width=500, initial-scale=1">
    <meta charset="UTF-8">
    <title>for oculus</title>
    <style>
        body {
            overflow-x: hidden;
            overflow-y: hidden;
        }
        .left { float:left; }
        .clear { clear: both; }
        video { display: block; }
        body {  margin: 0em;  }
    </style>

    <script src="./dist/debug.js"></script>

    <script type="text/javascript">
        localStorage.clear();
        function getQueryString() {
            if (1 < document.location.search.length) {
                // 最初の1文字 (?記号) を除いた文字列を取得する
                var query = document.location.search.substring(1);

                // クエリの区切り記号 (&) で文字列を配列に分割する
                var parameters = query.split('&');

                var result = new Object();
                for (var i = 0; i < parameters.length; i++) {
                    // パラメータ名とパラメータ値に分割する
                    var element = parameters[i].split('=');

                    var paramName = decodeURIComponent(element[0]);
                    var paramValue = decodeURIComponent(element[1]);

                    // パラメータ名をキーとして連想配列に追加する
                    result[paramName] = decodeURIComponent(paramValue);
                }
                return result;
            }
            return null;
        }

        window.onload = function(){
            var query = getQueryString();
            if(!query || !query['id']) var controller = new Controller.Controller("oculus", false);
            else var controller = new Controller.Controller(query['id'], false);
        };
    </script>
</head>
<body>
<video id="leftVideo" name="leftVideo" autoplay width="640" height="480" class="left"></video>
<video id="rightVideo" name="rightVideo" autoplay width="640" heigh="480"></video>
<div class="clear"></div>
<div id="comment" name="comment"></div>
<iframe style="height:0px;width:0px;visibility:hidden" src="about:blank">
    this frame prevents back forward cache
</iframe>
</body>
</html>
