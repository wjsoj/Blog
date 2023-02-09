---
title: 文件批量重命名
date: 2021-07-19 22:44:03
auther: WJS
top: false
mathjax: true
cover: false
toc: true
comments: false
summary:
tags:
  - software
categories:
  - software
---

# 文件批量重命名

## 一. 需求

再做模型训练的时候，为了增加样本数量，我想把全部样本文件复制一份再做调整。但windows在文件重复出现时，会自动加入`“ - 副本”`后缀，看上去观感很不好，且中文字符和空格的出现让这些文件不符合数据集的命名规范，所以我想把它们批量从`“* - 副本.jpg”`转换为`“*-1.jpg”`，于是在上网查阅资料后，得到了下面这种比较成熟的方法。

## 二. 操作步骤

##### 1. 打开cmd

输入以下命令：

```bash
dir/b>rename.xls
```

这会在本目录下生成一个`rename.xls`的文件

##### 2. 表格处理

首先把最后一行的`rename.xls`删了，我们不需要重命名这个表格

使用Excel的替换功能将所有`“ - 副本”`删除掉

接着利用Excel 的 LEFT、MID、RIGHT 函数制作自己需要的新名称

例如：

```python
=RIGHT(A1,4) # 得到扩展名
=LEFT(A1,FIND(".",A1)-1) # 得到文件名
="ren """&C1&" - 副本"&B1&""" "&C1&"-1"&B1 
# 制作命令
# 最后运行的时候遇到了奇怪的问题，必须把编码换成ANSI才能正常执行
```

##### 3. 执行命令

将上一步制作的命令全部复制，制成`.bat`运行。大功告成。