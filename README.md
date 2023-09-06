# 主页编辑说明
  
## 一、运行项目
1. 安装依赖
  
```
npm install
```
2. 启动项目
```
npm run serve
```

## 二、添加和修改页面内容

除网页 Header 和 People 页面外，其他页面无需在html代码中做修改。

在项目中的src/data文件夹中，找到相应的js文件，按照注释指引，修改和添加内容即可。

### Header修改和添加
1. 在项目中的src/data文件夹中，找到相应的header.js文件，按照注释指引，修改和添加内容。
2. 若新增header，则需同样在src/router/index.js文件中，添加一个相应的路由（因为新增一个header代表新增一个页面），router/index.js文件中格式如下：
```
{
path:  "/news",
name:  "news",
component:  News,
},
```
### People修改和添加
#### 修改或添加老师或学生
在项目中的src/data文件夹中，people.js文件，按照注释指引，修改和添加内容即可。
#### 增加类目或者修改折叠面板标题名称
需要在相应html代码中做相应的修改，具体位置在src/views/People.vue，代码中有相应的注释指引。

## 三、部署项目

修改完成后，首先在本地进行编译：
```
npm run build
```

编译完成后正常提交代码即可。

