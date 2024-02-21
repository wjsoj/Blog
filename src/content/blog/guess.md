---
title: '一道有趣的数学题'
pubDate: '2023-3-22'
mathjax: true
tag: 'math'
description: '朋友问的一道题，有一系列循序渐进的难度级别，挺有意思的'
---

## 基本思路

定义

`ans`：最后返回的猜出来的数组

`k`：总询问次数

`n`：数组长度

`m`：数组中1的个数

根据题目最后的提示，对于四个位置`(a,b,c,d)`，如果`query(a,b,c) = 0`且`query(b,c,d) = 1`，我们可以推断出`b,c`是一组特殊的位置，他们必然一个取0，另一个取1。则对于任意一个位置`x`，满足：

$$
ans[x] = query(b,c,x) \tag{1}
$$

即`query(b,c,x)`是0是1完全取决于x是0是1，据此性质可以解题

## Bonus 1

1. 遍历整个数组，对每相邻三个位置均执行一次查询操作，利用提示给出的性质找到连续两个分别取0和1的位置，找到后立即退出，**最坏情况下**的查询次数为$ n-2 $，根据性质$ \frac{m}{3}<n<\frac{2m}{3} $，**大胆猜测**必然存在这样两个连续的位置符合条件

2. 找到这样的位置（记第一个位置为`index`）之后，再遍历一次数组，可以通过利用：
   $$
   ans[x] = query(index,index+1,x)
   $$
   确定除这两个位置之外的$n-2$个位置的值，这一步查询次数固定为$n-2$

3. 最后再利用另一组分别为0和1的`x,y`确定`index`和`index+1`两个位置上的具体值，查询次数为2，`x,y`可以在上一步执行过程中同时确定

总查询次数最坏为$2n-2$

### Code（with python）

```python
from random import randint

def guess(data,a,b,c):
    return round((data[a]+data[b]+data[c])/3)

# generate data
def dataGenerator(n):
    while True:
        a = [randint(0,1) for x in range(n)]
        # check data
        if sum(a)>n/3 and sum(a)<n*2/3:
            return a

def solve(data):
    cnt = 0 # record query times
    ans = [0 for i in range(len(data))]
    preguess = None
    index = None
    
    for i in range(len(data)-2):
        now = guess(data,i,i+1,i+2)
        cnt+=1
        if preguess is not None:
            if now!=preguess:
                index = i
                break
        preguess = now
    
    for i in range(len(data)):
        if i!=index and i!=index+1:
            ans[i]=guess(data,index,index+1,i)
            cnt+=1
            if ans[i]:
                x = i
            else:
                y = i
    ans[index] = guess(data,index,x,y)
    ans[index+1] = guess(data,index+1,x,y)
    cnt+=2
    print("guess time:\t",cnt)
    return ans

for i in range(10):
    print("--------------Test Case--------------")
    data = dataGenerator(3*randint(2,10))
    print(data)
    print("data length:\t",len(data))
    if solve(data)==data:
        print("Pass")
```

### Result（数据随机生成）

![image-20230322152331013](C:\Users\30232\AppData\Roaming\Typora\typora-user-images\image-20230322152331013.png)

### 转译成java（with GPT-4）

```java
public static int[] solve(int[] data) {
    int cnt = 0; // record query times
    int[] ans = new int[data.length];
    Integer preguess = null;
    Integer index = null;

    for (int i = 0; i < data.length - 2; i++) {
        int now = guess(data, i, i + 1, i + 2);
        cnt++;
        if (preguess != null) {
            if (now != preguess) {
                index = i;
                break;
            }
        }
        preguess = now;
    }

    int x = 0;
    int y = 0;
    for (int i = 0; i < data.length; i++) {
        if (i != index && i != index + 1) {
            ans[i] = guess(data, index, index + 1, i);
            cnt++;
            if (ans[i] == 1) {
                x = i;
            } else {
                y = i;
            }
        }
    }
    ans[index] = guess(data, index, x, y);
    ans[index + 1] = guess(data, index + 1, x, y);
    cnt += 2;
    System.out.println("guess time:\t" + cnt);
    return ans;
}
```

