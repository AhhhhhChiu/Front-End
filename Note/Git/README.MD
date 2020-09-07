# GitDemo
学习git的操作

## 基础配置

配置
```cmd
git config --global user.name "example"
git config --global user.email "example@exp.com"
```

查看配置
```cmd
git config --list
```

新仓库
```cmd
git init
```

或者从现有仓库克隆
```cmd
git clone git://github.com/xxx/xxx.git
```

指定文件纳入版本控制

```cmd
git add *.c
git add README
git commit -m "message"
```

## 基础操作
初始化和克隆
```cmd
git init 
git clone [url]
```

git add 可将该文件添加到缓存
```cmd
git add README.md
git add . // 添加全部
```

git status 用于查看项目的当前状态
```cmd
git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
```

git diff 查看执行 git status 的结果的详细信息
- 尚未缓存的改动：git diff
- 查看已缓存的改动： git diff --cached
- 查看已缓存的与未缓存的所有改动：git diff HEAD
- 显示摘要而非整个 diff：git diff --stat

```cmd
git diff --cached
diff --git a/README.md b/README.md
index a9c3226..ea195d2 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,32 @@
 # GitDemo
 学习git的操作
+
+## 基础配置
+
+### 1. 用户名和邮箱
+
+配置
+```git
+git config --global user.name "example"
+git config --global user.email "example"
+```
+
+查看配置
+```git
+git config --list
+```
+
+### 2. 创建版本库
+
+#### 2.1 初始化
+
+```git
+git init
+```
+当前目录下会新增一个.git的目录
+
+#### 2.2 把文件添加到版本库
+
+```git
+
+```
```

git commit 记录缓存区的快照
```cmd
git commit -m "message"
```

git reset HEAD 用于取消缓存已缓存(已经add)的内
```cmd
git add .
git status -s
A  .txt
git reset HEAD -- .txt
git status -s
?? .txt
git commit // 没有记录.txt文件的添加
On branch master
Your branch is up to date with 'origin/master'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .txt

nothing added to commit but untracked files present (use "git add" to track)
```

git rm 将文件从缓存区中移除(同时删除本地)

git rm --cached 只删除缓存(等同于git mv)
```cmd
git add .
git status -s
A  .txt
git rm --cached .txt
rm '.txt'
git status -s
?? .txt
git rm .txt
fatal: pathspec '.txt' did not match any files
```

## 分支管理

创建分支
```cmd
git branch [branch name]
```

切换分支
```cmd
git checkout [branch name]
```

创建并切换分支
```cmd
git checkout -b [branch name]
```

列出所有分支信息
```cmd
git branch
* dev
  master
```

删除分支
```
git branch -d [branch name]
```

分支合并（不知道为什么没有出现冲突的情况）
```
git merge [other branch name]
```

## 查看提交历史

git log 列出历史提交记录（:q退出）
```cmd
git log
commit 18def304caf0f75f142c72877ee1673d2bc9a65d (HEAD -> master, origin/master, origin/HEAD)
Date:   Sun Jun 28 16:30:29 2020 +0800

    update note for git

commit 92e2acdc56b3ade861cb4e828ec5be3a6283cca1
Merge: e95cb02 6672431
Author: AhhhhhChiu <ahchiu9808@gmail.com>
Date:   Sun Jun 28 16:27:31 2020 +0800

    Merge branch 'newBranch'
```

git log --oneline 查看简洁版本记录
```cmd
git log --oneline
18def30 (HEAD -> master, origin/master, origin/HEAD) update note for git
92e2acd Merge branch 'newBranch'
6672431 (newBranch) update index.js in newBranch
e95cb02 update index.js
2315816 update index.js
8645086 add index.js
e1dd24a (origin/dev) [update]note for git
6a5dfc0 add a new branch
8203f53 [update]not for git
010be68 [update]note for git
b1941bc Initial commit
```

git log --graph 拓扑图（可以搭配--oneline）
```cmd
*   92e2acd Merge branch 'newBranch'
|\
| * 6672431 (newBranch) update index.js in newBranch
* | e95cb02 update index.js
|/
* 2315816 update index.js
```

还有其他一些git log的参数
- --reverse 逆向显示
- --author 查看特定作者
```cmd
  git log --author=AhhhhhChiu --oneline
  b1941bc Initial commit
```
- --since 和 --before可以指定日期（不知道为什么出错）
```cmd
git log --oneline --before={2020-6-27} --after={2020-6-28}
```

## 标签

[给特定commit]创建带注解的标签（-a 会弹出编辑器让你写一句注解 同时记录作者）
```cmd
git tag -a v0.1 [hash]
```

查看标签
```cmd
git log --decorate
```

查看所有标签
```cmd
git tag
```

指定标签信息命令：
```cmd
git tag -a <tagname> -m "w3cschool.cn标签"
```

PGP签名标签命令：
```cmd
git tag -s <tagname> -m "w3cschool.cn标签"
```

