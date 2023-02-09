---
title: Hello World
date: 2019-12-21 11:41:03
auther: WJS
top: true
cover: false
toc: true
comments: true
summary:  
  本博客无所不谈，仅供一些必要知识的备份之用，以防遗忘。如有侵权请与作者联系.
tags : 
  - blog
categories : 
  - blog
---

## 前言
本博客无所不谈，仅供一些必要知识的备份之用，以防遗忘。
如有侵权请与作者联系。

## 博客建设
本博客全部采用hexo-matery主题，并在此基础上做个人修改。

### 特别说明：

git在提交的时候默认会检查换行符，保证windows下CRLF和Unix下LF换行符的统一，但这样的检查会产生警告，可以通过如下命令解决：

```bash
git config --global core.autocrlf false
```

但这样做可能导致后续上传的文件换行符不统一，特此说明。

在两种换行方式间进行转换可以使用`dos2unix`和`unix2dos`命令，使用方法如下：

```bash
dos2unix filename
unix2dos filename
```

## 博客目标
这个博客并不是为了让更多人看到，只是为了记录自己在学习道路上的点点滴滴。

终极目标：为开源未来的建立做出自己的贡献。

### ”知识本无价，开源即未来“

---------

## 以下为hexo原生教程“Hello World!”

Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)
