# Express在Linux上的部署

mac上的Termius可同时支持ssh和sftp一步到位很不错

### 安装node.js

到官网下载`http://nodejs.cn/download/`，通过sftp放到自己喜欢的目录下，我放在`/home/admin/pkg`下

cd到文件目录，解压
```cmd
tar -xvf <pkgname>.tar.xz
```

重命名解压后的文件夹
```cmd
mv <pkgname> nodejs
```

建立软连接
```cmd
ln -s <nodejs path>/bin/node /usr/local/bin/
ln -s <nodejs path>/bin/npm /usr/local/bin/
```

检查一下
```cmd
node -v
v14.15.4
```
