// 解析url中的参数，返回一个对象
function parseUrl(url) {
  let query = {};
  let [path, search] = url.split('?');

  // 把路径的格式处理成跟app.json中一样的格式
  if(path[0] === '/'){
    // 绝对路径
    path = path.substring(1);
  }else{
    // 相对路径
    const pages = getCurrentPages()
    const currentPage = pages[pages.length-1];
    path = currentPage.__route__.replace(/(.+\/)[^\/]+/, `$1${path}`)
  }

  if (!search) return query;
  for (const item of search.split('&')) {
    const map = item.split('=');
    query[map[0]] = decodeURIComponent(map[1]);
  }

  return { path, query };
}
export default parseUrl;