---
title: 'B站BV号与av号互转'
pubDate: '2020-3-27'
tag: 'python'
description: 'B站由数字av号升级到复杂的BV号时的转换方法'
---

# 1.源起

**先放出知乎大佬文章辟邪**：[原文链接](https://www.zhihu.com/question/381784377/answer/1099438784)

![嚣张的代码](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200327225944.png)

![让人不明觉厉的分析](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200327230531.png)

然而，一个重要的问题在于，这位大佬只放出了代码，造福了千千万万的网友，却没有解释清楚神奇的base58，神奇的转位顺序以及神奇的magic number到底是从哪来的**（好吧可能是我太菜了看不懂）**

当我在CSDN以及B站搜索了大量链接后，还是没有看到有一篇文章能够解释清楚这个算法到底是怎么反向破译出来的，于是这位神秘的知乎大佬就成了一个谜。目前全网的采用算法形式解决BV号转av号问题的基本都采用了这位大佬的代码。

虽然我能力有限，无法看懂（就算看懂也无法完成测试，因为需要大量“巧合”的BV号、av号对应数据作为切入点枚举magic number），但好在我略知一点python。

于是，我非常愉快的将大佬的代码翻译了一遍，加入了一些自己的理解，以及添加了一个利用api的方法。

# 2.理解

## 2.1 B站开发者是怎么想的？

首先，为了~~维护宇宙和平~~（咳咳），其实是为了“维护广大UP主的权益”，（当然主要是版权方面，原始的av号顺序递增，大大地方便了我们利用api爬取视频数据）B站正式将原本的av号转换成了号称“完全随机”的**BV号**。

总之BV号存在的目的就是让你找不着规律，于是B站开发者们对原本的av号做了如下操作：

1. 将av号异或（位运算的一种）一个大整数，再加上一个大整数，于是就得到了一个大大大大大整数。
2. 这么大的整数用10进制存储显得位数太多，于是开发者们让这个大整数先转换成58进制（base58）
3. 显然58进制下每一位的数字有58种可能[0,57]，按照正常人的思路我们会用0-9继续代表0-9，小写字母a-z代表新进制下的10-35，剩下的再用大写字母表示。但这样不就太好猜了？于是B站建立了一套全新的映射关系，将0-57与字母数字之间一一对应起来，这个映射关系从外观上看是没有任何规律的。
4. 再按照正常人的思路这时把这个58进制由字母数字混合而成的字符串作为BV号就好了，但开发者们显然不满足于此，认为还是不够迷惑人。于是他们把数位关系又作了一番调整（比如原本的第一位变成第五位，第六位变成第二位等等），这样就产生了我们最终看到的BV号。

新产生的BV号强制区分大小写，难以记忆且又长又乱，刚刚出现就饱受诟病，纷纷追寻逝去的av号，然后我们这位**@mcfx**大佬只用了不到一天时间就让B站开发者们的努力化为了泡影~~~

## 2.2 代码的部分解释（详见注释）

``` python
import requests

map = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
# f_map 反向映射"dict"：从字符->阿拉伯数字
# 这里必须使用映射（字典），故使用大括号
f_map = {}
for i in range(58):
    f_map[map[i]] = i

# 数位乱序
rand = [9,8,1,6,2,4,0,7,3,5]

# 不知道怎么试出来的magic number
xor = 177451812
add = 100618342136696320

def av_to_bv(n):
    n = (n^xor)+add
    a = list('          ')
    for i in range(10):
        # 下面的divmod 返回 n整除58的值 和 n mod 58的值
        n,ss = divmod(n,58) #相当于十进制转base58
        
        # 这里计算出来的第i位（从右往左）是实际BV号的第rand[i]位（从左往右）
        a[rand[i]] = map[ss]
    return 'BV'+''.join(a)

def bv_to_av(n):
    ans = 0
    n = n.replace('BV','',1)
    # 同理，这里目标av号的第i位（从右往左）是给定BV号的第rand[i]位
    for i in range(10): # 要求的是第i位，应该找到BV号（字符串n）的第rand[i]位
        tmp = n[ rand[i] ]  # 当前求的第i位(base58)对应的BV号中的一位
        ss = f_map[tmp]     # 将被打乱过的base58 反向映射成阿拉伯数字的base58
        ans += ss*(58**i)   # 将base58转换成十进制
    # 下面用到了异或运算的性质：
    # 若 a^b = c
    # 则 c^b = a, c^a = b
    # 很容易证明，无非就4种情况：0^1=1,1^1=0,1^0=1,0^0=0，它们分别满足这一性质
    return (ans-add)^xor

# 伪造请求头，你懂得（来自我的Cent Broser浏览器）
headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Host": "api.bilibili.com",
            "Referer": "https://www.bilibili.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
        }

def api_av_to_bv(n):
    url = "https://api.bilibili.com/x/web-interface/archive/stat?&aid="+str(n)
    r = requests.get(url,headers=headers)
    response_dict = r.json()
    target = response_dict['data']
    return target['bvid']

def api_bv_to_av(n):
    url = "https://api.bilibili.com/x/web-interface/archive/stat?&bvid="+str(n)
    r = requests.get(url,headers=headers)
    response_dict = r.json()
    target = response_dict['data']
    return target['aid']

link = input("支持的格式：1.原始视频链接 2.av号（av+数字） 3.BV号（BV+字符）")
judge = link.find('BV')
if judge == -1:
    # av to bv
    st = link.find('av')
    ends = link.find('/',st)
    if ends==-1:
        s = link[st+2:len(link)]
    else:
        s = link[st+2:ends]
    print("使用算法转换结果：  ",end='')
    print(av_to_bv(int(s)))
    print("使用api转换结果：  ",end='')
    print(api_av_to_bv(int(s)))
else:
    ends = link.find('/',judge)
    if ends==-1:
        s = link[judge:len(link)]
    else:
        s = link[judge:ends]
    print("使用算法转换结果：  ",end='')
    print(bv_to_av(s))
    print("使用api转换结果：  ",end='')
    print(api_bv_to_av(s))
```

# 3.使用效果

![BV链接](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200327234927.png)

![av链接](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200327235126.png)

![BV号](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200327235356.png)

![av号](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20200327235444.png)