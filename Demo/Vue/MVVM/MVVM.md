# MVVM

MVVM(Model-View-ViewModel)最早由微软提出来，它借鉴了桌面应用程序的MVC思想，在前端页面中，把Model用纯JavaScript对象表示，View负责显示，两者做到了最大限度的分离。把Model和View关联起来的就是ViewModel。ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。
ViewModel如何编写？需要用JavaScript编写一个通用的ViewModel，这样，就可以复用整个MVVM模型了。
(来自[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1108898947791072)）

