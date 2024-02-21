---
title: 'FFmpeg 常用命令'
pubDate: '2022-9-25'
tag: 'software'
description: '记录使用ffmpeg完成一些常见操作所需要的命令参数，可以在必要时替代剪辑软件'
---

## 1. FFmpeg

[官方网站](http://ffmpeg.org/)

以下内容引自官网：

> FFmpeg is the leading multimedia framework, able to **decode**, **encode**, **transcode**, **mux**, **demux**, **stream**, **filter** and **play** pretty much anything that humans and machines have created. It supports the most obscure ancient formats up to the cutting edge. No matter if they were designed by some standards committee, the community or a corporation. It is also highly portable: FFmpeg compiles, runs, and passes our testing infrastructure [FATE](http://fate.ffmpeg.org/) across Linux, Mac OS X, Microsoft Windows, the BSDs, Solaris, etc. under a wide variety of build environments, machine architectures, and configurations.

FFmpeg是目前几乎所有主流播放器的核心，覆盖音视频编解码、剪辑拼接、录屏推流等多种功能。

## 2. 常用命令

1. ### 查看FFmpeg支持的编码器

```bash
ffmpeg configure -encoders
```

### 2. 查看FFmpeg支持的解码器

```bash
ffmpeg configure -decoders
```

### 3. 播放视频

```bash
ffplay input.mp4
# 播放完自动退出
ffplay -autoexit input.mp4
```

### 4. 设置视频的屏幕高宽比

```bash
ffmpeg -i input.mp4 -aspect 16:9 output.mp4
```

通常使用的宽高比是：

> 16:9
> 4:3
> 16:10
> 5:4
> 2:21:1
> 2:35:1
> 2:39:1

### 5. 编码格式转换

MPEG4编码转成H264编码

```bash
ffmpeg -i input.mp4 -strict -2 -vcodec h264 output.mp4
```

H264编码转成MPEG4编码

```bash
ffmpeg -i input.mp4 -strict -2 -vcodec mpeg4 output.mp4
```

## 3. 视频压缩

```bash
ffmpeg -i in.mp4 -vcodec h264 -vf scale=640:-2 -threads 4
ffmpeg -i in.mp4 -c copy -vcodec h264_nvenc
```

参数解释:

```bash
-vf scale=640:-2  
改变视频分辨率，缩放到640px宽，高度的-2是考虑到libx264要求高度是偶数，负数值为软件自动计算

-threads 4
4核运算

-s 1280x720 
设置输出文件的分辨率，w*h。

-b:v 
输出文件的码率，一般500k左右即可，人眼看不到明显的闪烁，这个是与视频大小最直接相关的。

-preset
指定输出的视频质量，会影响文件的生成速度和文件大小
ultrafast, superfast, veryfast, faster, fast, medium(Default), slow, slower, veryslow。

-an
去除音频流。

-vn
去除视频流。

-sn
删除字幕

-c:a
指定音频编码器。

-c:v
指定视频编码器，libx264，libx265，H.262，H.264，H.265。
libx264：最流行的开源 H.264 编码器。
NVENC：基于 NVIDIA GPU 的 H.264 编码器。
libx265：开源的 HEVC 编码器。
libvpx：谷歌的 VP8 和 VP9 编码器。
libaom：AV1 编码器。

-vcodec copy
表示不重新编码，在格式未改变的情况采用。

-crf
参数来控制转码，取值范围为 0~51，其中0为无损模式，18~28是一个合理的范围，数值越大，画质越差。
```

## 4. 过滤器

### 1. 视频

```bash
-vf
scale=-2:720
transpose=0\1\2\3
0: 主对角线
1: 顺时针90度
2: 逆时针90度
3: 反对角线
crop=w:h:x:y
裁剪某一区域，x,y为左上角坐标

组合时用逗号分隔
```

### 2. 音频

```bash
-af
volume=1.5
loudnorm=I=-5:LRA=1
可统一音量大小
```

## 5. 视频剪辑

### 1. 剪切

```bash
ffmpeg -i in.mp4 -ss H:M:S -t H:M:S(也可直接用秒数)
or
ffmpeg -i in.mp4 -ss H:M:S -to H:M:S
```

### 2. 合并视频

首先，创建一个`list.txt`文件：

> file '1.mp4'
>
> file '2.mp4'
>
> file '3.mp4'

然后执行命令：

```bash
ffmpeg -f concat -i list.txt -c copy out.mp4
```



### 3. 4个视频2x2方式排列

```
ffmpeg -i 0.mp4 -i 1.mp4 -i 2.mp4 -i 3.mp4 -filter_complex "[0:v]pad=iw*2:ih*2[a];[a][1:v]overlay=w[b];[b][2:v]overlay=0:h[c];[c][3:v]overlay=w:h" out.mp4
```

## 6. 其他操作

### 1. .m3u8视频获取

```bash
ffmpeg -i 链接名-vcodec copy -acodec copy -absf aac_adtstoasc 输出文件名.mp4
```

### 2. 音视频、图片格式批量转换

```bash
for %a in ("*.mkv") do ffmpeg -i "%a" "%~na.mp4"
```

### 3. gif动图制作

```bash
ffmpeg -i in.mp4 -ss H:M:S -t sec -filter_complex [0:v]fps=15,scale=-1:256,split[a][b];
[a]palettegen[p];[b][p]paletteuse out.gif

中间一大块都是为了解决色彩问题
```

