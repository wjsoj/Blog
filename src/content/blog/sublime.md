---
title: 'Sublime编译系统搭建与配置'
pubDate: '2019-12-21'
tag: 'software'
description: '早年使用Sublime作为主力编辑器的配置记录'
---
## 一.配置环境变量
将MinGW下的/bin路径加入系统环境变量Path中。
命令提示符输入"***g++ -v***"检查结果。
## 二.添加编译系统所需文件
### 1.负责判断错误、显示命令提示符标题的"run.bat"
``` bash
@echo off
title Running Your Program
if %1==0 (
	timer %2
	exit
)
exit
```
### 2.负责显示程序运行时间，给出错误反馈的"timer.exe"
(请务必预先使用g++或其他IDE环境编译以下的cpp文件，时间显示部分可以自行配置，分割线等也可根据命令提示符窗口宽度做出调整)

``` cpp
#include <iostream>
#include <cstdlib>
#include <ctime>
#include <cstdio>
#include <conio.h>
#include <Windows.h>
using namespace std;

clock_t st,en;
int ret;

void get_time()
{
	SYSTEMTIME time;
	GetLocalTime(&time);
	printf("%4d/%02d/%02d %02d:%02d:%02d.%03d\n",
		time.wYear,
		time.wMonth,
		time.wDay,
        time.wHour,
        time.wMinute,
        time.wSecond,
        time.wMilliseconds
        /*time.wDayOfWeek*/);
}

void write()
{
	printf("\n------------------------------------------------------------\n");
	printf("Finish Time: ");
	get_time();
	en=clock();
	printf("Process exited after %.4f seconds with return value %d\n",(double)(en-st)/CLOCKS_PER_SEC,ret);
	printf("Press any key to continue...");
	getch();
}

int main(int argc,char const *argv[])
{
	if(argc!=2){cout<<"ERROR!"<<endl;return 0;}
	
	string argv1=argv[1];
	argv1="\""+argv1+"\"";
	cout<<argv1<<endl;
	printf("Build Time: ");
	get_time();
	st=clock();
	printf("------------------------------------------------------------\n\n");
	ret=system(argv1.c_str());
	
	write();
	return 0;
}
```

### 3.将以上的"run.bat"与"timer.exe"放入环境变量的路径当中，确保能够调用运行
## 三.sublime内部编译系统配置
这里将用到.sublime-build文件，请将下面的json内容保存至"**C:\Users\Administrator\AppData\Roaming\Sublime Text 3\Packages\User**"（路径请根据实际情况修改"Administrator"下的内容），在保存界面可以自行更改文件名称，这将成为编译系统的名称，我使用了MyCpp这个名称。

``` json
{
	"cmd": ["g++", "${file}", "-o","${file_path}/${file_base_name}"],
	"file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:?(.*)$",
	"working_dir": "${file_path}",
	"encoding":"cp936",
	"selector": "source.c++",
	"shell_cmd": "g++ \"$file\" -o \"$file_base_name\" && start run.bat %ERRORLEVEL% \"${file_path}/${file_base_name}\"",
}
```

## 四.享受成果与个性化配置
### 1.汉化、破解与常用插件安装
进入Sublime Text 3，按住键盘"***Ctrl+Shift+P***"，输入"***pcip***"(short for "Package Control:Install Package")，如果没有安装过Package Control请按照选项"***Install Package Control***"进行安装。接下来等待一会儿应该会看到这样一个界面：
 ![Package Control界面](http://yanxuan.nosdn.127.net/bddddf777a0ac157009db67cc44b4bf9.png)
这时我们要安装以下几个插件，在上面的搜索框中搜索，回车等待安装即可（如果发现很久也安装不了请自行~~FanQiang~~进行安装），包括：
#### **（1）.ChineseLocalizations**
安装好后在顶部编辑栏"help-language"下进行语言更换
#### **（2）.ConverntToUTF-8**
这是一个支持UTF-8编码格式的转换插件。
#### **(3).GBK Support**
这是一个解决中文乱码的GBK编码格式支持插件。
**其他**
例如各种颜色主题"Theme - XXX"或配色方案"XXX   Color Scheme"等，当然也可以自己安装别的。

### **关于破解**
有关sublime text不同版本的破解方式不尽相同，就算不破解也不会有太大的影响，请尽量支持正版，实在不行请自行百度。

### 2.快捷键设置
总是按"*Ctrl+B*"编译太麻烦？没关系，Sublime Text支持自定义快捷键。
请前往“*首选项-快捷键设置*”找到`{ "keys": ["ctrl+b"], "command": "build" }`这一行，把前面的"ctrl+b"尽情地改成自己习惯的按键。（为避免冲突，建议新建一个.sublime-keymap --User，将改后的代码复制进去单独保存）

### 3.其他常用操作（目前就这么多）
寻找：ctrl+F
替换：ctrl+H
命令窗口：ctrl+shift+P
框选所有相同变量名：Alt+F3
注释：ctrl+/
在多个代码标签中切换：ctrl+tab
分屏：Alt+shift+数字（数字为键盘上面那一行，表示为分多少块屏）
多行折叠：ctrl+J （毁别人代码的神器）
折叠代码：ctrl+shift+[
展开代码：ctrl+shift+]

### 4.好看的主题、配色

##### 1.Dracula

##### 2.ayu-dark、ayu-marige

##### 3.自带的Monokai、Mariana

## 成果展示：
首先更改编译系统（按照自己的名称选择）：
![](http://yanxuan.nosdn.127.net/68de40de0b925c10096ca115a15e9d76.png)
接下来写好代码，使用快捷键编译，结果如下：
![](http://yanxuan.nosdn.127.net/bdc7956e59951a09066d15c68bbddedd.png)