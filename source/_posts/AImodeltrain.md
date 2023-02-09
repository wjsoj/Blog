---
title: obs——预置算法训练流程
date: 2021-7-14 12:44:03
auther: WJS
top: false
mathjax: true
cover: false
toc: true
summary:
comments: false
tags:
  - AI
categories:
  - AI
---

1.数据管理——数据集——创建数据集——选择分类

2.点击数据集——开始标注——手动标注（利用矩形工具）——下一张（N）——返回概览——发布——数据切分（训练集与验证集）（标为0.8或0.9）

3.训练管理——训练作业——创建训练作业——算法预置——订阅算法（AI Gallery）——数据来源——调参（注意batchsize）

> 常用算法：
>
> 物体检测YOLOv5
>
> 图像分类ResNeSt

4.模型管理——模型——导入模型——从训练中选择

5.部署上线——在线服务

6.已有服务可选择启动（注意自动关闭，否则会导致额外扣费）

7.预测——上传

文件从obs拷贝到noteboook开发环境

```python
# use python conda
import moxing as mox
# file copy
mox.file.copy('obs://.../saved_model.pb','./saved_model.pb')
# dir copy
mox.filr.copy_parallel('./dir','ons://.../...')
```

```python
# ipynb默认输出最后一行表达式运算结果
# python浮点数
import decimal
decimal.Decimal(0.01)
# 可显示浮点数的实际存储值

# 关键字
import keyword
print(keyword.kwlist)

# 逻辑词短路
# and中第一项为假则不再判断后一项
# or中第一项为真不再判断后一项
3 or 5 = 3
5 or 3 = 5

2 and 3 = 3
# 逻辑判断，非位运算
# 逻辑运算优先级： not and or

range(0,10) = range(10)
# range是一种类型，不是list

# 这不是一个死循环
for i in range(10):
    print(i)
    i = 0

```

