---
title: 'Cmder配置'
pubDate: '2020-2-2'
tag: 'software'
description: '为了在windows上使用部分Linux命令并达成更好的终端使用体验，可以安装Cmder并进行配置'
---

## 1. 下载及安装

### [官网链接](https://cmder.net/)

### 1.1 下载选择

![版本](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202203800.png)

**Cmder**官网提供两种版本的下载链接，其中`Mini`版是轻量级的，而`Full`版本占用空间较大，但包括了内置的**git for windows**还有对其他一些本来在Linux平台上的命令的支持，因此建议下载完整版。

> 建议下载`.7z`版本，Cmder官网网速较慢，所以减少下载的文件大小是很有必要的。就是压缩率太高，解压缩的时候可能会比较慢。

### 1.2 安装

#### 1.2.1 解压缩

将压缩包内文件全部解压到你想要Cmder安装的位置。

如果C盘空间充足的话建议解压在C盘顶层目录，这样后期设置一些快捷命令时比较方便。如果空间不够的话可以装在D盘等非系统盘，并不影响正常使用。

#### 1.2.2 添加至Path

![环境变量](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202204828.png)

按照图中的方式配置即可，对应填写自己Cmder安装目录下的`./bin`目录。

#### 1.2.3 运行前配置

打开cmd，输入以下命令（将cmder添加到右键菜单）：

``` bash
Cmder.exe /REGISTER ALL
```

## 2. 配置

### 2.1 中文语言

`Win + Alt + P`或者点击最右下角的图标按图中所示打开设置界面：

![设置](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202211914.png)

然后在*通用*``General`中更改语言为“**简体中文**”：

![更改语言](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202162902.png)

### 2.2 使用Cmder 彻底替换cmd

如图所示：

![默认终端](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/image-20200202212257173.png)

### 2.3 更改命令提示符为`$`

打开`./cmder/vendor/clink.lua`作如下更改：

![更改提示符](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202212649.png)

### 2.4 外观配置

根据个人喜好替换以下两个选项：

![外观](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202212815.png)

### 2.5 按键冲突解决

替换为空值即可。

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202213006.png)

### 2.6 使用技巧

#### 2.6.1 快捷键（Copy别人的）：

``` bash
Tab      		自动路径补全
Ctrl+T   		建立新页签
Ctrl+W    		关闭页签
Ctrl+Tab  		切换页签
Alt+F4    		关闭所有页签
Alt+Shift+1 	开启cmd.exe
Alt+Shift+2 	开启powershell.exe
Alt+Shift+3 	开启powershell.exe (系统管理员权限)
Ctrl+1      	快速切换到第1个页签
Ctrl+n      	快速切换到第n个页签( n值无上限)
Alt + enter 	切换到全屏状态
Ctr+r       	历史命令搜索
Win+Alt+P  		开启工具选项视窗
```

#### 2.6.2 快速复制：鼠标框选后自动复制

#### 2.6.3 自定义命令（alias）

图中为默认的配置文件：

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200202213623.png)

如果硬要编辑自己的：

打开文件`cmder\config\user-aliases.cmd`

定义的时候可以匹配`命令 = 命令`或者`命令 = 路径/程序名`来快速切换目录或打开文件