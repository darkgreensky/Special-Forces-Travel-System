## 特种兵旅游系统-Web端

### 🛠 技术栈

🔧    `react` `redux` `react-router` `axios`

### 🚀 项目配置

1. 后端地址配置

`\Special-Forces-Travel-System\src\constants.js`

```js
export const URL = 'http://localhost:8080'; // 后端在本地8080端口运行，根据后端实际情况设置
```

2.  地图服务KEY

`\Special-Forces-Travel-System\public\index.html`

```html
<!-- 高德地图 -->
<script type="text/javascript">
    window._AMapSecurityConfig = {
        securityJsCode:'高德地图秘钥',
        serviceHost:'http://localhost:3000/_AMapService',
        // 例如 ：		serviceHost:'http://1.1.1.1:80/_AMapService',
        // seccode1 : 6f4d5ddbf42653f7fe5172385218a086
    }
</script>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=
                                    高德地图KEY码&plugin=AMap.Driving,AMap.Transfer,AMap.MouseTool"></script>
<!-- 百度地图 -->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=百度地图KEY码"></script>
<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=百度地图KEY码"></script>
```

两种地图服务均需添加

### 📦 项目运行

> 需要有node.js环境 
>
> Node.js下载 [https://nodejs.cn/download/](https://nodejs.cn/download/)

```shell
cd Special-Forces-Travel-System 

npm install 

npm start 
```

### ✈ 项目部署

请确保项目已能够成功运行

```shell
npm run build
```

会出现build文件夹，将`index.html`和`static`复制到后端根目录即可部署在后端服务器。
