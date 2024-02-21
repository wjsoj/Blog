---
title: 'PySynth合成器使用'
pubDate: '2020-8-19'
tag: 'python'
description: '如何使用python演奏音乐'
---

# 1. 概述

接触python不久，发现python作为完全面向对象的编程语言，拥有无与伦比的简洁性、易用性与可扩展性，使用pip管理扩展包能够为python带来更好的扩展性体验。刚好当时对电子音乐比较感兴趣，萌生了利用python编写程序输出midi音符的想法，在网络上搜寻相关资源的过程中，意外接触到一个名为PySynth的合成器库，其内置的音色可以模拟出钢琴、吉他、架子鼓等多种乐器。其内置的选项支持控制音符输出时间、击键力度等选项。有了这些选项基本上可以完整演奏出一首歌曲。

该项目发布在github上，但目前处于停止维护状态，仅有作者自己的博客（[地址如下](https://mdoege.github.io/PySynth/)）以及另外一个被fork过的项目还在持续提供维护。有关停止维护的信息如下图所示：

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200819234507.png)

目前在搜索引擎百度上所能找到的有关PySynth的教程及相关文章极少，因此接下来的内容都是本人根据自己的经验与官方介绍自己摸索出来的使用说明，不代表这一合成库的正确使用方式。

### 运行环境：

1. Windows 10 64bit Professional
2. python 3
3. 编辑器：VS code

### 选取素材：

1. 周杰伦 《告白气球》 钢琴谱（网上随便找的）
2. 《Big Apple》 原始视频

# 2. 主要流程

## 2.1 安装PySynth

首先需要在确保python正确配置并安装的前提下安装PySynth，由于前面提到的原因，目前已无法通过pip正确安装这一合成库，因此需要前往原始github项目地址手动下载。https://github.com/mdoege/PySynth

在项目下方Readme.md所提供的安装方法仅适用于Linux系统，对于windows系统建议谨慎使用git进行clone操作，github在国内的连接速度并不是很稳定，建议使用Download Zip选项搭配IDM进行下载。

![官方安装教程](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200819235026.png)

下载好后会得到一个zip文件，将其中的"PySynth-master"文件夹解压到任意位置，在该文件夹下运行命令行，执行命令：

` python setup.py install `

即可完成PySynth的安装。

## 2.2 基本内容

在PySynth的官方介绍文档里，提供了简单的几个示例以及参数用法介绍，如下图所示：

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/Snipaste_2020-08-19.png)

但官方示例采用的方式并非所有python版本都适用，因此在我自己的代码中做了一定的修改。

首先，我们用一个list来存储所有要用到的音符，音符的表述形式如下：

**音名+时长**

其中，“音名”是指像"c4"（小字一组的1）或"b5"（小字二组的7）这样的音名，时长为一个实数n，n表示该音符的时值占一拍的(1/n)即n是几就对应几分音符。

在PySynth中，不指定参数的情况下使用钢琴音色，休止符（占位）以字符'r'表示。

在将整首歌曲的全部音符录入songx这一list中之后，使用命令;

`pysynth.make_wav(songx, *bpm*=90, *repeat*=0, *fn*="告白气球.wav")`

以bpm=90，文件名（file name）="告白气球.wav"在本地目录下生成一个wav文件，文件中包含所有音符。

光有音符不能播放等于没用，使用python内置库winsound播放已经生成好的wav文件，代码如下：

`winsound.PlaySound("告白气球.wav",winsound.SND_FILENAME)`

就这样，第一阶段准备工作已经完成。

## 2.2 其他优化

光有音乐显得过于单调，因此我们使用opencv库解析视频，作为字符画输出到命令提示符窗口上，不要忘了在使用之前：

`pip install opencv-python`

关于如何生成字符画视频我照搬了网上的代码，并使用了特别易于转化为字符画视频的《Bad Apple》作为视频素材。这一视频本身色彩就较为单调，容易根据灰度转化为对比度明显的不同字符进行输出，且视频自身尺寸基本符合命令提示符窗口的大小，更具观赏性。

此外，为了在播放音频的同时输出字符画视频，利用多线程创建一个线程用来播放音频，主程序执行字符画的合成与输出。

在输出字符画及开始播放前我做了一个3s倒计时。

整个程序的执行流程大概如下：生成音频——生成字符画——利用多线程同时播放音频与字符画视频

## 2.3 完整代码

``` python
import pysynth

import time
import winsound
import threading
from cv2 import cv2
import matplotlib.pyplot as plt
import os
# 中央C：c4 or c
x = 'r' # 休止符
n1 = 'b3';n2 = 'c#4';n3 = 'd#4';n4 = 'e4';n5 = 'f#4';n6 = 'g#4';n7 = 'a#4' # B大调自然音阶
n1s = 'b4';n2s = 'c#5';n3s = 'd#5';n4s = 'e5';n5s = 'f#5';n6s = 'g#5';n7s = 'a#5'
n1b = 'b2';n2b = 'c#3';n3b = 'd#3';n4b = 'e3';n5b = 'f#3';n6b = 'g#3';n7b = 'a#3'
songx=[
    [x,4],[x,8],[n5,8],[n1s,8],[n7,8],[n5,8],[n1,8/3],
    [n5,8],[n2,4],[n3,4],[n3,8/3],
    [x,8],[n5,8],[n1s,8],[n7,8],[n5,8],[n1,8/3],
    [n5,8],[n2,4],[n3,8],[n4,8],[n3,8/3],
    [x,8],[n5,8],[n2s,8],[n1s,8],[n7,8],[n1s,8/3],
    [n2s,8],[n3s,4],[n1s,4],[n6,8/3],[n7,8],[n1s,4],[n5,4],[n1,8],
    [n5,8],[n4,8],[n3,8],[n2,4],[n1,8/3],[n1,8/3],[n7b,8/3],[x,4],
    
    [x,16],[n1s,16],[n1s,16],[n7,16],[n1s,8],[x,16],[n7,16],[n1s,16],[n7,16],[n1s,8],[x,8],[n2s,16],[n3s,16],
    [x,16],[n7,16],[n7,16],[n6,16],[n7,8],[x,16],[n6,16],[n7,16],[n6,16],[n7,8],[x,8],[n1s,8],
    [x,4],[n6,8],[n1s,8],[n3s,8],[n2s,8],[n1s,8],[n3s,8/5], ####
    [x,8],[n3s,4],[n2s,16],[n1s,16],
    [x,16],[n1s,16],[n1s,16],[n7,16],[n1s,8],[x,16],[n7,16],[n1s,16],[n7,16],[n1s,8],[x,8],[n2s,16],[n3s,16],
    [x,16],[n7,16],[n7,16],[n6,16],[n7,8],[x,16],[n6,16],[n7,16],[n6,16],[n7,8],[x,8],[n1s,8],
    [x,4],[n6,8],[n1s,8],[n3s,8],[n2s,8],[n1s,8],[n1s,8/7], ####
    
    [n6,8],[n7,8],[n1s,8],[n1s,8],[n1s,8],[n1s,8],[n6,4],[n6,8],[n7,8],
    [n1s,8],[n1s,8],[n1s,8],[n2s,8],[n2s,4],[n5,8],[n6,8],
    [n7,8],[n7,8],[n7,8],[n7,8],[n5,4],[n5,8],[n6,8],
    [n7,8],[n7,8],[n7,8],[n1s,8],[n1s,16/3],[n1s,16],[n1s,8],[n2s,8],
    [n3s,8],[n3s,8],[n3s,8],[n6,8],[n1s,4],[n1s,8],[n2s,8],
    [n3s,8],[n3s,8],[n6s,8],[n3s,16],[n2s,16],[n1s,4],[n1s,8],[n2s,8],
    [n3s,8],[n3s,8],[n3s,8],[n3s,4],[n1s,8],[n3s,8],[n2s,8/5], ####
    
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n1s,8/3],[n6,4],[n1s,8],[n5s,4],[n1s,8],[n3s,8],[n3s,8/5],
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n6s,8/3],[n5s,4],[n7,8],[n1s,4],[n2s,4],[n1s,8/7],[n1s,8],[n2s,8],
    
    
    [n3s,4],[n5s,4],[n2s,2],[n1s,4],[n5s,4],[n7,8/3],[n7,8],[n7,8],
    [n6,4],[n7,4],[n1s,8/3],[n2s,8],[n3s,2],[x,8],[n5,8],[n1s,8],[n2s,8],
    [n3s,4],[n5s,4],[n2s,2],[n1s,4],[n5s,4],[n7,8/3],[n7,8],[n7,8],
    [n6,4],[n7,4],[n1s,8/3],[n2s,8],[n1s,1],
    
    
    [x,16],[n1s,16],[n1s,16],[n7,16],[n1s,8],[x,16],[n7,16],[n1s,16],[n7,16],[n1s,8],[x,8],[n2s,16],[n3s,16],
    [x,16],[n7,16],[n7,16],[n6,16],[n7,8],[x,16],[n6,16],[n7,16],[n6,16],[n7,8],[x,8],[n1s,8],
    [x,4],[n6,8],[n1s,8],[n3s,8],[n2s,8],[n1s,8],[n3s,8/5], ####
    [x,8],[n3s,4],[n2s,16],[n1s,16],
    [x,16],[n1s,16],[n1s,16],[n7,16],[n1s,8],[x,16],[n7,16],[n1s,16],[n7,16],[n1s,8],[n5s,8],[n6s,16],[n5s,16],
    [x,16],[n7,16],[n7,16],[n6,16],[n7,8],[x,16],[n6,16],[n7,16],[n6,16],[n7,8],[n3s,8],[n4s,16],[n3s,16],
    [x,4],[n6,8],[n1s,8],[n3s,8],[n2s,8],[n1s,8],[n1s,8/7], ####
    
    [n6,8],[n7,8],[n1s,8],[n1s,8],[n1s,8],[n1s,8],[n6,4],[n6,8],[n7,8],
    [n1s,8],[n1s,8],[n1s,8],[n2s,8],[n2s,4],[n5,8],[n6,8],
    [n7,8],[n7,8],[n7,8],[n7,8],[n5,4],[n5,8],[n6,8],
    [n7,8],[n7,8],[n7,8],[n1s,8],[n1s,16/3],[n1s,16],[n1s,8],[n2s,8],
    [n3s,8],[n3s,8],[n3s,8],[n6,8],[n1s,4],[n1s,8],[n2s,8],
    [n3s,8],[n3s,8],[n6s,8],[n3s,16],[n2s,16],[n1s,4],[n1s,8],[n2s,8],
    [n3s,8],[n3s,8],[n3s,8],[n6,4],[n1s,8],[n3s,8],[n2s,8/3],[n3s,4], ####
    
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n1s,8/3],[n6,4],[n1s,8],[n5s,4],[n1s,8],[n3s,8],[n3s,8/5],
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n6s,8/3],[n5s,4],[n7,8],[n1s,4],[n2s,4],[n1s,8/5],
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n1s,8/3],[n6,4],[n1s,8],[n5s,4],[n1s,8],[n3s,8],[n3s,8/5],
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n6s,8/3],[n5s,4],[n7,8],[n1s,4],[n2s,4],[n1s,8/5],
    
    [x,8],[n5,8],[n4s,8],[n3s,8/3],[n4s,8],[n3s,4],[n2s,8/3],
    [n1s,4],[n2s,8],[n3s,4],[n6s,8/11],
    [n5s,2],[n7,4],[n1s,2],[n2s,2],[n1s,4/7],[x,2]
]

pysynth.make_wav(songx, bpm=90, repeat=0, fn="告白气球.wav")


def playsound():
    winsound.PlaySound("告白气球.wav",winsound.SND_FILENAME)



show_heigth = 30              
show_width = 80

ascii_char = list(r"$@B%8&WM#*oahkbdpqwmZOr0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ")
#生成一个ascii字符列表
char_len = len(ascii_char)

vc = cv2.VideoCapture("video.mp4")          #加载一个视频

if vc.isOpened():                       #判断是否正常打开
    rval , frame = vc.read()
else:
    rval = False
    
frame_count = 0
outputList = []                         #初始化输出列表
while rval:   #循环读取视频帧  
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  #使用opencv转化成灰度图
    gray = cv2.resize(gray,(show_width,show_heigth))#resize灰度图
    text = ""
    for pixel_line in gray:
        for pixel in pixel_line:                    #字符串拼接
            text += ascii_char[int(pixel / 256 * char_len )]
        text += "\n"                                
    outputList.append(text)
    frame_count = frame_count + 1                           
    if frame_count % 100 == 0:
        print("已处理" + str(frame_count) + "帧")
    rval, frame = vc.read()  
print("处理完毕")

for i in range(3,0,-1):
    time.sleep(1)
    print(i)

th = threading.Thread(target=playsound)
# th.setDaemon(True) 是否分离线程
th.start()

for frame in outputList:            
    os.system("cls")                    #清屏
    print(frame)
    print()
    print()
```



# 3.最终效果
<iframe width=800 height=600 src="//player.bilibili.com/player.html?aid=285093904&bvid=BV1tc411h75J&cid=170980824&page=1" frameborder="no" allowfullscreen="true"> </iframe>

----

# 4. 改进建议

1. 视频与音频时长不匹配（色彩单调、分辨率合适的视频太难找了）
2. 只有一种音色并且一次只能输出一个指定频率的声音（这个没有办法改进，PySynth库未提供同时播放多个音符的方法）
3. 并未加入对每一个音符的细节控制，因而显得过于单调
4. 程序执行速度实在太慢了...