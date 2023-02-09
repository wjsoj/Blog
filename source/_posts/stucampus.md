---
title: Python实现出入校自动填报（含魔改健康宝截图）
date: 2022-10-20 13:00:03
auther: WJS
top: false
comments: false
mathjax: false
cover: false
toc: true
summary:
tags:
  - python
categories:
  - python
---

# 1. 基本思路

首先，比较好处理的是出入校填报，直接用Selenium自动化即可，这一点之前已有基础。但这里多了一个要处理的问题就是上传文件。最初选择的是利用Selenium直接向传文件的方法`.send_keys()`但发现只能传一个文件。所以最后结合pyautogui模块完全模拟键盘鼠标操作，先利用剪贴板导入文件路径，通过`ctrl+v`粘贴路径并回车确定。

比较麻烦的是在出入校申报中需要提供健康宝截图和行程卡截图，行程卡比较好搞，因为除掉手机通知栏外不会有任何的时间显示。但健康宝上方有一个当前时间的显示，下方还有当天的查询时间和失效时间。最初想的是利用OpenCV进行文字输出，但后来发现OpenCV没办法处理中文，而且字体选择上十分有限，细节调整上功能也很少，所以最后选择的是python的PIL模块进行处理。

# 2. 基础知识

## 2.1 Selenium 新版本特性

过去可以直接`find_element_by_csssector`但现在的新版本必须先引入`By`模块。

如果要指定chromedriver的路径，必须引入`service`模块并在生成webdriver时加入参数。

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
service = Service(executable_path=r'path of chromedriver')
driver = webdriver.Chrome(service=service)
# 支持的关键字
driver.find_element(By.CLASS_NAME,'content')
driver.find_element(By.LINK_TEXT,'content')
driver.find_element(By.CSS_SELECTOR,'content')
driver.find_element(By.XPATH,'content')
driver.find_element(By.ID,'content')
driver.find_element(By.NAME,'content')
driver.find_element(By.TAG_NAME,'content')
driver.find_element(By.PARTIAL_LINK_TEXT,'content')
```

## 2.2 上传文件操作

```python
import pyperclip
import pyautogui
pyperclip.copy(r'path of picture')
pyautogui.hotkey('ctrl', 'v')
# 为了防止上传失败，按两次回车
pyautogui.press('enter', presses=2)
```

## 2.3 Selenium切换标签页

```python
driver.execute_script('window.open("","_blank");')  # 新开一个标签页面
driver.execute_script('window.open("url")')
driver.switch_to.window(driver.window_handles[-1])  # 切换到最后一个页面
driver.close()  # 关闭当前页面
```

## 2.4 获取当前系统时间

使用python的`datetime`模块

为了方便理解，可以把datetime理解成一种全新的数据类型。他们之间作差可以得到timedelta这一类型，在实际应用中可以直接相加减，系统会自动处理各个单位间的转换、闰年等问题。

`strftime()`方法可以很方便地对时间进行格式化，具体字母代表的含义如下：

`%a` 星期几的简写

`%A` 星期几的全称

`%b` 月分的简写

`%B` 月份的全称

`%C` 年份的后两位数字

`%d` 十进制表示的每月的第几天

`%D` 月/天/年

`%F` 年-月-日

`%H` 24小时制的小时

`%I` 12小时制的小时

`%j` 十进制表示的每年的第几天

`%m` 十进制表示的月份

`%M` 十进制表示的分钟数

`%p` 本地的AM或PM的等价显示

`%r` 12小时的时间

`%R` 显示小时和分钟：hh:mm

`%S` 十进制的秒数

`%T` 显示时分秒：hh:mm:ss

`%u` 每周的第几天，星期一为第一天 （值从0到6，星期一为0）

`%U` 当前年的第几周，把星期日做为第一天（值从0到53）

`%w` 十进制表示的星期几（值从0到6，星期天为0）

`%W` 每年的第几周，把星期一做为第一天（值从0到53）

`%x` 标准的日期串

`%X` 标准的时间串

`%y` 不带世纪的十进制年份（值从0到99）

`%Y` 带世纪部分的十制年份

`%z,%Z` 时区名称，如果不能得到时区名称则返回空字符。

```python
from datetime import datetime
from datetime import timedelta
now = datetime.now()
# 显示 小时:分钟:秒
titletime = datetime.now().strftime('%H:%M:%S')
tomorrow = now+datetime.timedelta(days=1)
```

## 2.5 OpenCV绘制实心矩形

**注：**OpenCV中所有颜色均为（B,G,R）形

```python
import cv2
img = cv2.imread(r'filepath')
# 参数：图片、左上角坐标、右下角坐标、颜色、线宽
# 线宽为负数代表实心矩形
cv2.rectangle(img,(720,1785),(980,1960),(255,255,255),-1)
```

## 2.6 PIL字体绘制

`numpy`库的引入是为了解决opencv和PIL对图像的不同存储方式之间的转化

```python
from PIL import ImageFont, ImageDraw, Image
import numpy as np
fontpath = r"font\ARIALN.TTF"
font = ImageFont.truetype(fontpath,51)
# OpenCV to PIL
img_pil = Image.fromarray(img)
draw = ImageDraw.Draw(img_pil)
draw.text((x,y), 'text' , font = font, fill = (B,G,R))
# PIL to OpenCV
img = np.array(img_pil)
```

## 2.7 OpenCV基础操作

OpenCV默认会按真实的像素值显示图片，这会导致图片过大，超出屏幕范围，所以要自定义一个窗口，并对参数进行修改。

```python
img = cv2.imread(r'path of picture')
# 0参数表示窗口大小适应屏幕，允许鼠标拖拽调整
cv2.namedWindow("image",0)
# 这里的窗口名称要与前面name的相同
cv2.imshow('image',img)
# 等待键盘输入后再退出
cv2.waitKey()
# 保存图片
cv2.imwrite(r'new file path',img)
```

## 2.8 鼠标点击获取坐标（源自网络）

```python
import cv2
img=cv2.imread(r'path')

def on_EVENT_LBUTTONDOWN(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        xy = "%d,%d" % (x, y)
        print(x,y)
        cv2.circle(img, (x, y), 2, (0, 0, 255))
        cv2.putText(img, xy, (x, y), cv2.FONT_HERSHEY_PLAIN,1.0, (0,0,255))
        cv2.imshow("image", img)
        
cv2.namedWindow("image",0)
cv2.setMouseCallback("image", on_EVENT_LBUTTONDOWN)
while(1):
    cv2.imshow("image", img)
    key = cv2.waitKey(5) & 0xFF
    if key == ord('q'):
        break
cv2.destroyAllWindows()
```



# 3. 最终成品

## 3.1 魔改图片时间

```python
import cv2
from PIL import ImageFont, ImageDraw, Image
import numpy as np
from datetime import datetime

today = datetime.now().strftime('%m-%d')
titledate = datetime.now().strftime('%Y年%m月%d日')
titletime = datetime.now().strftime('%H:%M:%S')

img = cv2.imread(r'path')
# cv2.putText(img,'10-20 08:00',(730,1843),cv2.FONT_HERSHEY_COMPLEX,1.2,(0,0,0), 2)
# cv2.putText(img,'10-20 24:00',(730,1933),cv2.FONT_HERSHEY_SIMPLEX,1.2,(0,0,255), 2)

cv2.rectangle(img,(720,1785),(980,1960),(255,255,255),-1)
cv2.rectangle(img,(390,240),(750,380),(255,255,255),-1)

fontpath = r"font\ARIALN.TTF"
font = ImageFont.truetype(fontpath,51)
font2 = ImageFont.truetype("font\Dengb.ttf",44)
img_pil = Image.fromarray(img)
draw = ImageDraw.Draw(img_pil)
draw.text((733,1802),  today+" 08:00", font = font, fill = (50, 50, 50))
draw.text((733,1895),  today+" 24:00", font = font, fill = (60, 65, 225))
draw.text((391,258),  titledate, font = font2, fill = (140, 140, 140))
draw.text((470,320),  titletime, font = font2, fill = (140, 140, 140))
img = np.array(img_pil)

cv2.namedWindow("image",0)
cv2.imshow('image',img)
cv2.waitKey()
cv2.imwrite(r'path',img)
```

## 3.2 自动填报

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import pyperclip
import pyautogui
import time

stu_id = ''
passwd = ''

path_driver = r'C:\Mybin\chromedriver.exe'
path_health_kit = r''
path_voyage_card = r''

service = Service(executable_path=path_driver)
driver = webdriver.Chrome(service=service)
driver.get("https://portal.pku.edu.cn/portal2017/#/index")
time.sleep(1)
driver.find_element(By.LINK_TEXT,'请登录').click()
time.sleep(1.5)
driver.find_element(By.CSS_SELECTOR,'#user_name').send_keys(stu_id)
driver.find_element(By.CSS_SELECTOR,'#password').send_keys(passwd)
driver.find_element(By.CSS_SELECTOR,'#logon_button').click()
time.sleep(2)
driver.find_element(By.CSS_SELECTOR,'table > tbody > tr:nth-child(11) > td > a').click()
time.sleep(0.2)
driver.find_element(By.ID,'stuCampusExEnReq').click()
time.sleep(1)
driver.switch_to.window(driver.window_handles[-1])
time.sleep(2)
driver.find_element(By.LINK_TEXT,'园区往返申请').click()

time.sleep(5.5)
driver.find_element(By.CSS_SELECTOR,'body > div.app-wrapper > section > div > div > div.el-col.el-col-24.el-col-xs-22.el-col-sm-22.el-col-md-20.el-col-lg-16 > main > div.el-dialog__wrapper > div > div.el-dialog__body > div:nth-child(2) > button').click()

time.sleep(1)
driver.find_element(By.CSS_SELECTOR,'div.el-upload.el-upload--text > div > button:nth-child(1)').click()
time.sleep(1)
pyperclip.copy(path_health_kit)
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)
pyautogui.press('enter', presses=2)

time.sleep(1)
driver.find_element(By.CSS_SELECTOR,'div.el-upload.el-upload--text > div > button:nth-child(2)').click()
time.sleep(1)
pyperclip.copy(path_voyage_card)
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)
pyautogui.press('enter', presses=2)
time.sleep(1)
driver.find_element(By.CSS_SELECTOR,'div.el-col.el-col-24.el-col-xs-22.el-col-sm-22.el-col-md-20.el-col-lg-16 > main > div.el-card.box-card.is-never-shadow > div.el-card__body > form > div:nth-child(5) > div.el-col.el-col-24.el-col-xs-24.el-col-sm-24.el-col-md-24 div:nth-child(1) > button').click()
time.sleep(5)
driver.quit()
```

