# ppaop
轻量级面向切面编程库

# 使用示例
使用ppaop你可以这样写JS
html：
```
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>ppaop support IE 6+</title>
</head>
<body>
<input onclick="test1()" type="button" id="bn" value="click me">
<script src="javascript/ppaop.js"></script>
<script>
    function test1() {
        alert(1);
    }
    window.onload = function () {

        var bn = document.getElementById("bn");

        ppaop(bn, "onclick").after(function () {
            alert(0);
        });

        function test2() {
            alert(1);
        }

        ppaop(test2).before(function () {
            alert(0);
        });
    }

</script>
</body>
</html>


```
