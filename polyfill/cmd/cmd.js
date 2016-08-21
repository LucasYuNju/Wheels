const filePaths = {
    path: "assets"
}

function require(path)
{
    path = require.resolve(path);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();
    if (xhr.readyState === 4 && xhr.status === 200)
    {
        const code = xhr.responseText;
        const wrappedCode = `
            let definition = null;
            definition = function (require, exports, module){
                ${code}
            };`
        const def = eval(wrappedCode);
        const module = {
            exports: {}
        }
        def(require, module.exports, module);
        return module.exports;
    }
    else
    {
        console.error("xhr error: " + xhr.status);
    }
};

require.resolve = function(path)
{
    if (!path.endsWith(".js"))
    {
        return path + ".js";
    }
    return path;
};
