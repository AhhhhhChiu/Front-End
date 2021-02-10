# mysql在linux下的安装

直接使用wget下载

```cmd
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz
```

解压文件

```cmd
tar -zxvf mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz
```

重命名为mysql并移动到/usr/local/下

```cmd
mv ./mysql-8.0.11-linux-glibc2.12-x86_64 /usr/local/mysql
```

在mysql根目录下新建一个用来存数据的data文件夹

```cmd
cd /usr/local/mysql
mkdir ./data
```

创建 mysql 用户组和 mysql 用户

```cmd
groupadd mysql
useradd -g mysql mysql
```

更改mysql目录权限

```cmd
chown -R mysql.mysql /usr/local/mysql/
```

初始化数据库（会生成初始化密码注意保存）
```cmd
/usr/local/mysql/bin/mysqld --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data/ --initialize;
```

如果报错`libaio.so.1`，可以安装一下libaio再试试
```cmd
yum install -y libaio
```

配置mysql
```cmd
vi /etc/my.cnf
```

```bash
[mysqld]
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data
socket=/usr/local/mysql/mysql.sock
character-set-server=utf8
default_authentication_plugin=mysql_native_password
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd

#[mysqld_safe]
#log-error=/var/log/mariadb/mariadb.log
#pid-file=/var/run/mariadb/mariadb.pid

#
# include all files from the config directory
#
!includedir /etc/my.cnf.d
```

添加mysq服务到系统

```cmd
cp -a ./support-files/mysql.server /etc/init.d/mysql
chmod +x /etc/init.d/mysql
chkconfig --add mysql
```

查看是否生效
```cmd
chkconfig --list mysql
```

启动mysql服务
```cmd
service mysql start
```

登录mysql
```cmd
mysql -h 127.0.0.1 -uroot -p<初始化密码>
```

更改密码
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';
FLUSH PRIVILEGES;
```

远程连接
```sql
use mysql
update user set host ='%' where user='root';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '新密码';
FLUSH PRIVILEGES;
```
