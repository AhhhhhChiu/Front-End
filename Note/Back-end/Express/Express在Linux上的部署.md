# Express在Linux上的部署

mac上的Termius可同时支持ssh和sftp一步到位很不错


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

这里如果报错`ln: failed to access ‘–s’: No such file or directory`的话可以用`--symbolic`代替`-s`试试

检查一下
```cmd
node -v
v14.15.4
npm -v
6.14.10
```

安装cnpm、pm2
```cmd
npm i -g --save cnpm
npm i -g --save pm2
```

通过sftp把express项目放到服务器上，到项目目录下
```cmd
cnpm i
pm2 start ./bin/www
```

访问`http://<ip>:3000`，如果有欢迎页就是ok了，不行的话看一下阿里云和linux自带的防火墙
