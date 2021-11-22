const $siteList = $('.siteList');
const $lastli = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn/'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com/'
    },
    {
        logo: 'H',
        url: 'https://www.hupu.com/'
    }, 
];
function simplifyUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除/开头的内容，这里用到了正则表达式。
}
function render() {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
    
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link"> ${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
            <use xlink:href="#icon-close"></use>
            </svg>
        </div>
          </div>
  
        </li>`).insertBefore($lastli);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation() //阻止冒泡
            ;
            console.log(hashMap);
            hashMap.splice(index, 1);
            render();
        });
    });
}
render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('请输入您要添加的网址');
    if (url.indexOf('http') != 0) url = 'https://' + url;
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    console.log('页面要关闭了');
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    const { key  } = e;
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key) open(hashMap[i].url);
});

//# sourceMappingURL=index.e6e4fcce.js.map
