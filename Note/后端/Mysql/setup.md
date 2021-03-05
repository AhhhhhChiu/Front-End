# mysql在mac上的安装初始化

## 下载

有魔法上网的老哥可以戳这里

[https://dev.mysql.com/downloads/mysql/]('https://dev.mysql.com/downloads/mysql/')

没有的话用这个镜像也ok

[http://mirrors.sohu.com/mysql/]('http://mirrors.sohu.com/mysql/')

下载dmg格式的直接安装

## 安装

无情next，在`Configuration`那个标签记得选`Use Legacy Password Encryption`填入root用户对应的密码，这个待会开mysql的时候会用到。

## 配置

打开终端，编辑根目录.bash_profile
```cmd
cd ~
vim ./.bash_profile
```

加入这两行然后:wq退出
```bash
export PATH=$PATH:/usr/local/mysql/bin
export PATH=$PATH:/usr/local/mysql/support-files
```

刷新环境变量
```cmd
  source ~/.bash_profile
```

试一下能不能正常跑mysql
```cmd
sudo mysql -uroot -p
<输入本机用户的密码>
<输入安装时设置的初始化密码>
```

有一个`mysql>`说明启动成功，不行的话试一下以下操作
```cmd
vim ~/.zshrc
source ~/.bash_profile
```

O Justin Bieber K