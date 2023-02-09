---
title: Electron学习笔记（一）
date: 2020-05-03 11:43:03
auther: WJS
top: false
cover: false
toc: true
comments: false
summary:
tags:
  - electron
categories:
  - electron
---

# 1. 安装

## 1.1 初始化

首先进入我们需要安装Electron的目录，以开发模式保存在目录中，而不是全局安装。

```bash
npm init
npm install electron --save-dev
```

此处安装过程npm使用淘宝镜像加速速度还算可以，但在下载Electron安装包的时候速度实在不敢恭维，大概80MB的包装了一个小时...

![奇慢的安装速度](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200503233240.png)

## 1.2 验证安装结果

输入命令：

```bash
npx electron
```

弹出版本号，证明安装成功。

（话说Electron的版本号也滚得太快了...）

## 1.3 运行Electron（虽然还不会用）

终端执行命令：

```powershell
.\node_modules\.bin\electron
```

**如果报错：**

```powershell
.\node_modules\.bin\electron : 无法加载文件 D:\你的路径\node_modules\.bin\electron.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_ 
Execution_Policies。
```

执行命令提升权限：

```powershell
set-ExecutionPolicy -Scope CurrentUser
```

接下来终端会提示：

```powershell
位于命令管道位置 1 的 cmdlet Set-ExecutionPolicy
请为以下参数提供值:
ExecutionPolicy:
```

输入：

```
RemoteSigned
```

即可正常执行。

#### 执行效果如下：（酷炫无比的界面）

![真好看](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200503233551.png)

# 2. 介绍

## 2.1 What is Electron?

#### [官网直达](https://www.electronjs.org/)

Electron，一个Chromium做内核，Node做支撑，可以利用Web前端知识帮助你快速开发一个**跨平台应用程序**的开源框架。

为什么可以跨平台？因为大部分是用HTML、CSS、JS写的，再加上轻量化的浏览器内核，只要能上网的设备都能用。

最大的优点便是随着服务器上的发布文件更新而更新，完全不需要复杂的分发方式。

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200503235421.png)

官网介绍的一些用Electron开发的著名软件：

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200503235555.png)

可见VS-Code插件式的架构模式和快速便捷的更新完全得益于Electron的优良特性。

而国内的**迅雷**新版也采用了Electron开发，在UI的统一性、美观度方面达到了新的高度。

## 2.2 How Electron?

直接引用。

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200504000158.png)

## 2.3 Why Electron?

我们有理由相信，Electron这种完全开源、便捷开发、迅速跨平台、强大的UI设计能力能够大大简便复杂程序的开发过程，不仅方便了调试，也使一些复杂功能的实现成为可能。

曾经受制于硬件资源限制，为了提高程序运行效率，许多程序采用较底层的C/C++编写，然后我们有了Java，适应了更高性能的电脑，使应用变得更加丰富多彩。

我们有理由相信，Electron这种用前端开发方式设计程序的思路，将成为下一个世代的主流开发方式。

从现在起，选择Electron。