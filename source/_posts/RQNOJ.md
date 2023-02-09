---
title: RQNOJ系列题目
date: 2019-12-21 11:47:03
auther: WJS
top: false
cover: false
toc: true
comments: false
summary:
tags:
  - algorithm
categories:
  - algorithm
---
# **RQNOJ 99 配置魔药**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/99)
在《Harry Potter and the Chamber of Secrets》中，Ron的魔杖因为坐他老爸的Flying Car撞到了打人柳，不幸被打断了，从此之后，他的魔杖的魔力就大大减少，甚至没办法执行他施的魔咒，这为Ron带来了不少的烦恼。这天上魔药课，Snape要他们每人配置一种魔药（不一定是一样的），Ron因为魔杖的问题，不能完成这个任务，他请Harry在魔药课上(自然是躲过了Snape的检查)帮他配置。现在Harry面前有两个坩埚，有许多种药材要放进坩埚里，但坩埚的能力有限，无法同时配置所有的药材。一个坩埚相同时间内只能加工一种药材，但是不一定每一种药材都要加进坩埚里。加工每种药材都有必须在一个起始时间和结束时间内完成（起始时间所在的那一刻和结束时间所在的那一刻也算在完成时间内），每种药材都有一个加工后的药效。现在要求的就是Harry可以得到最大的药效。
出自:宜昌一中

### **输入格式**
输入文件的第一行有2个整数，一节魔药课的t（1≤t<≤500）和药材数n（1≤n≤100）。
输入文件第2行到n+1行中每行有3个数字，分别为加工第i种药材的起始时间t1、结束时间t2、（1≤t1≤t2≤t）和药效w（1≤w≤100）。
### **输出格式**
输出文件medic.out只有一行，只输出一个正整数，即为最大药效。
### **样例**
### Input
```
7 4
1 2 10
4 7 20
1 3 2
3 7 3
```
### Output
```
35
```
### **主要思路**
此题可化简为选取线段的题目：即选取多条线段，任意两条线段不能有重合，求最大的分值。但此题由于有两个锅，所以较为麻烦。我的解决方法是：开一个三维dp数组，dp[k][i][j]，描述选到第k个魔药，第一个锅在配第i种魔药，第二个锅在配第j种魔药时的最大分值（药效）。当转移第一个锅时，前两维相同，第二个锅时，第一维和第三维相同，这样就不会有重复，每次更新答案即可。转移过程如下：
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwOTAyMTYzNjU4NTA2?x-oss-process=image/format,png)
此题与另一道题（RQNOJ 569 Milking Time)相比，更多了一层难度，对于选取线段的题目基础知识的讲解，详见RQNOJ 569

### **代码如下**
``` cpp
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define ll long long

struct nod{
	int l,r,w;
}a[105];

int t,n,ans;
int dp[105][105][105];

bool cmp(nod x,nod y)
{
	return x.l<y.l;
}

int main(int argc, char const *argv[])
{
	ios::sync_with_stdio(false);
	cin>>t>>n;
	for(int i=1;i<=n;i++)
		cin>>a[i].l>>a[i].r>>a[i].w;
	sort(a+1,a+n+1,cmp);
	for(int k=1;k<=n;k++)
		for(int i=0;i<k;i++)
			for(int j=0;j<k;j++)
			{
				dp[k][i][j]=dp[k-1][i][j];
				if(a[i].r<a[k].l)
					dp[k][k][j]=max(dp[k][k][j],dp[k-1][i][j]+a[k].w);
				if(a[j].r<a[k].l)
					dp[k][i][k]=max(dp[k][i][k],dp[k-1][i][j]+a[k].w);
				ans=max(ans,max(dp[k][k][j],dp[k][i][k]));
			}
	cout<<ans<<endl;
	return 0;
}
```

# **RQNOJ 569 Milking Time**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/569)
在一个数轴上可以摆M个线段，每个线段的起始终止端点给定（为整数），且每个线段有一个分值，问如何从中选取一些线段使得任意两个线段之间的距离大于R。每一条线段属于[0，N]。如何选择这些线段，使得分值之和最大？
FROM USACO
### **输入格式**
第一行三个整数，N，M，R。M〈=1000；N〈=1000000
以下M行，每行三个整数，表示起点、终点、分值。
### **输出格式**
一个整数，最大分值。
### **样例**
### Input
```
12 4 2
1 2 8
10 12 19
3 6 24
7 10 31
```
### Output
```
43
```
### **主要思路**
此题一看，便知是经典的dp题目——选取线段，只不过多了一个**“距离大于R”**。而选取线段的题目，则是由01背包扩展而来的，只不过多了端点，由点变成了线段。下面，先讲一下选取线段的题目如何想：（懂得此部分内容的大佬请略过，直接到图片下方）
如果我们将题目中的"R"删去，改为**“任意两条线段都不重合”**，就是传统的选取线段问题。此类题目，只需要开一个结构体存储线段的左端点（l），右端点（r）和分值（w），再对结构体按照左端点从小到大排序，就变成了背包问题。用dp[i]表示选到第i条线段时的最大分数，再枚举左端点在i之前的线段j，此时只需考虑线段j的右端点是否小于等于线段i的左端点，如果是就转移，否则不变。同时，由于不一定要选到最后一条线段，答案不一定是dp[m]（例如dp[m]是负无穷），所以要每步更新ans。
**转移过程如下：**
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwODMwMjEzMzU3NDY2?x-oss-process=image/format,png)
到这里，唯一的问题就是新加入的距离R，为了解决这个问题，**我采取了最最最智障的方法：假设每条线段比原本的线段长R，不就解决了？**因此，在读入时，将线段的右端点+R即可。
### **代码如下**
``` cpp
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define ll long long

struct nod{//存储线段
	int l,r,w;
}a[1005];

int n,m,r,ans=0;
int dp[1000005];

bool cmp(nod x,nod y)
{
	return x.l<y.l;
}

int main(int argc, char const *argv[])
{
	ios::sync_with_stdio(false);
	cin>>n>>m>>r;
	for(int i=1;i<=m;i++)
	{
		cin>>a[i].l>>a[i].r>>a[i].w;
		a[i].r+=r;//距离问题
	}
	sort(a+1,a+m+1,cmp);
	for(int i=1;i<=m;i++)
	{
		dp[i]=a[i].w;//首先必须选自己
		for(int j=1;j<i;j++)//由于排好序，只需枚举前面的线段即可
			if(a[j].r<=a[i].l)//如果合法
				dp[i]=max(dp[i],dp[j]+a[i].w);//转移
		ans=max(ans,dp[i]);//更新答案
	}	
	cout<<ans<<endl;//输出
	return 0;
}
```

# **RQNOJ 429 词链**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/429)
给定一个仅包含小写字母的英文单词表，其中每个单词最多包含50个字母。
如果一张由一个词或多个词组成的表中，每个单词（除了最后一个）都是排在它后面的单词的前缀，则称此表为一个词链。例如下面的单词组成了一个词链：
i
int
integer
而下面的单词不组成词链：
integer
intern
请在给定的单词表中取出一些词，组成最长的词链。最长的词链就是包含单词数最多的词链。
数据保证给定的单词表中，单词互不相同，并且单词按字典顺序排列。
### **输入格式**
第一行一个整数n(n<=10000)，表示单词表中单词数
下接n行每行一个单词。
### **输出格式**
一个整数，表示最长词链长度。
### **样例**
### Input
```
5
i
int
integer
intern
internet
```
###Output
```
4
```
### **主要思路**
一眼看上去，便知这是一道dp题目，并且是一道典型的类似01背包型的题目，只不过添加了字符串，用dp[i]表示当前选到第i个字符串，所构成的最长词链的长度是多少，再枚举j，看哪些词能与当前字符串构成词链，dp方程不难推出：
**如果字符串i与j能够成词链：**
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwODI4MjEzMjE5NTgw?x-oss-process=image/format,png)
#### 看上去很简单是不是？相信大家都想到了。**但是！**这是n^2的复杂度，n<=10000!
于是，TLE，80分...
因此，我们需要进行一些优化。转过头来看题目描述，发现：
```
并且单词按字典顺序排列
```
所以，我们大可以不必枚举完，只需**逆序**枚举j，一但找到，果断break掉，便可省去一半的复杂度，并且能够保证是最优解，于是，奇迹般地AC了...

### 下面，为大家展示我用上了STL大法，主函数仅约20行的代码：
### **代码如下**
``` cpp
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define ll long long
//请忽略以上的内容

int n,ans=0;
string a[10005];//不情愿地用上了速度极慢的string
int dp[10005];

int main(int argc, char const *argv[])
{
	ios::sync_with_stdio(false);//流加速
	cin>>n;
	for(int i=1;i<=n;i++)
		cin>>a[i];
	for(int i=1;i<=n;i++)
	{
		for(int j=i-1;j>0;j--)//逆序枚举
		{
			int la=a[i].size(),lb=a[j].size();//求长度
			string b=a[i].substr(0,lb);//STL大法好！
			/*
				插播substr()函数详解：
				此处意为将a[i]这一字符串从下标0开始截取长度为lb的一个子串
				由此可保证b串与a[j]长度相等，便可以比较
			*/
			if(la>=lb && b==a[j])
			{
				dp[i]=max(dp[i],dp[j]+1);
				break;//如果找到，break掉
			}
		}
		ans=max(ans,dp[i]);//求出答案
	}
	cout<<ans+1<<endl;//由于dp数组初值为0，没有包含第一个字符串，所以此处必须要+1
	return 0;
}
```

# **RQNOJ 188 购物问题**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/188)
由于换季，商场推出优惠活动，以超低价格出售若干种商品。但是商场为避免过分亏本，规定某些商品不能同时购买，而且每种超低价商品只能买一件。身为顾客的你想获得最大的实惠，也就是争取节省最多的钱。经过仔细研究，我们发现商场出售的超低价商品中，不存在以下这种情况：n(n>=3)种商品C1，C2，C3，……，Cn，其中Ci和Ci+1是不能同时购买的（i=1,2,……,n-1），而且C1和Cn也不能同时购买。
请编程计算可以接生**(??节省??)**的最大金额数。
### **输入格式**
第一行两个整数K，M（1<=K<=1000），其中K表示超低价商品数，K种商品的编号依次为1，2，3，……，K；M表示不能同时购买的商品对数。
接下来K行，第i行有一个整数Xi表示购买编号为i的商品可以节省的金额（1<=Xi<=100）。
再接下来M行，每行两个数A，B，表示A和B不能同时购买，1<=A,B<=K,A≠B。
### **输出格式**
仅一行一个整数，表示能节省的最大金额数。
### **样例**
### Input
```
3 1
1
1
1
1 2
```
### Output
```
2
```
### **主要思路**
此题一看便是dp（废话，人家RQNOJ都告诉你了），经过仔细观察，发现题目中存在这样一句话：
```
不存在以下这种情况：n(n>=3)种商品C1，C2，C3，……，Cn，其中Ci和Ci+1是不能同时购买的（i=1,2,……,n-1），而且C1和Cn也不能同时购买。
```
**再结合那m种不能同时购买的情况，其实，这就是一道树上dp题目。**
思路有了，问题来了：dp方程怎么搞？
通过观察发现，此题边无向，便成为了森林类的树上dp。
**于是，dp方程便出来了：**
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwODI4MjA0NTI3Nzgz?x-oss-process=image/format,png)
这是最终实现时的代码，nex代表与now有边相连的点，
**其中，按边扩展的dp[i][0]表示不选i及其子树的最大节省金额数**
**dp[i][1]则表示选择i及其子树的最大节省金额数**
枚举i,求出每一个节点的dp[i][0]与dp[i][1]，求出其中的最大值，从而相加得到最终的答案。
### **代码如下**
``` cpp
//如有不懂请参考注释，谢谢！
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define ll long long
//请忽略上面的一切

vector <int> lin[10005];//代替邻接表，当时发现link在RQNOJ中是关键字，便改成了这样

int k,m,ans=0;
int a[1005];
int dp[1005][2];//根据前文介绍，第二维只需0、1两个下标即可
bool vis[100005];//判断该点是否被访问过

//披着dfs的dp
void dfs(int now,int pre)//pre用来检查是否重复走同一条边（因为无向）
{
	vis[now]=1;
	dp[now][0]=0;
	dp[now][1]=a[now];//由于选择其子树，即至少选择该节点
	int len=lin[now].size();//由该点出发能通向多少个点
	for(int i=0;i<len;i++)
	{
		int nex=lin[now][i];
		if(nex!=pre)//如果没有原路返回
		{
			dfs(nex,now);//搜索
			dp[now][0]+=max(dp[nex][0],dp[nex][1]);//如果不选择其子树，便可选择另一点的子树
			dp[now][1]+=dp[nex][0];//否则不行
		}
	}
}

int main(int argc, char const *argv[])
{
	memset(vis,0,sizeof(vis));//强迫症犯了...
	ios::sync_with_stdio(false);//流加速
	cin>>k>>m;
	for(int i=1;i<=k;i++)
		cin>>a[i];
	for(int i=1;i<=m;i++)
	{
		int x,y;
		cin>>x>>y;
		lin[x].push_back(y);//由于是无向边（互不相容），需要添加两次
		lin[y].push_back(x);
	}
	for(int i=1;i<=k;i++)//一次对每个未被访问到的节点进行搜索，求出对应的dp[i][0]和dp[i][1]
		if(!vis[i])
		{
			dfs(i,-1);
			ans+=max(dp[i][0],dp[i][1]);
		}
	cout<<ans<<endl;
	return 0;
}
```

# **RQNOJ 117 最佳课题选择**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/117)
NaCN_JDavidQ要在下个月交给老师n篇论文，论文的内容可以从m个课题中选择。由于课题数有限，NaCN_JDavidQ不得不重复选择一些课题。完成不同课题的论文所花的时间不同。具体地说，对于某个课题i，若NaCN_JDavidQ计划一共写x篇论文，则完成该课题的论文总共需要花费Ai*x^Bi个单位时间（系数Ai和指数Bi均为正整数）。给定与每一个课题相对应的Ai和Bi的值，请帮助NaCN_JDavidQ计算出如何选择论文的课题使得他可以花费最少的时间完成这n篇论文。
### **输入格式**
第一行有两个用空格隔开的正整数n和m，分别代表需要完成的论文数和可供选择的课题数。
以下m行每行有两个用空格隔开的正整数。其中，第i行的两个数分别代表与第i个课题相对应的时间系数Ai和指数Bi。
对于30%的数据，n<=10,m<=5；
对于100%的数据，n<=200，m<=20，Ai<=100，Bi<=5。
### **输出格式**
输出完成n篇论文所需要耗费的最少时间。
### **样例**
### Input
```
10 3
2 1
1 2
2 1
```
### Output
```
19
```
### **主要思路**
首先，此题是一道dp题，但在设计方程之前，现想这样一个问题：时间怎么存？为了解决这个问题，我专门开了一个time二维数组来记录时间。其中**time[i][j]表示第i个课题完成j篇论文所用的时间**。只需在读入时循环枚举j，计算出来就好（建议不要用pow函数，我是手打的快速幂）。有了存储时间的方法，dp方程便不难设计：用dp[i]表示写i篇论文所用的最小时间，只需循环m个课题，再枚举当前计算的i与此时写的论文数j。
**转移过程如下：**
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwODMwMjA0NjEwNTY4?x-oss-process=image/format,png)
### **代码如下**
``` cpp
//请看注释
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define int long long//呵呵
#define INF 0x7f//呵呵

int n,m;
int dp[10005];
int tim[1005][1005];

int kuai_su_mi(int n,int m)//呵呵快速幂
{
	int ans=1;
	while(m)
	{
		if(m&1)
			ans*=n;
		n*=n;
		m>>=1;
	}
	return ans;
}

#undef int//呵呵
int main(int argc, char const *argv[])//呵呵
#define int long long//呵呵
{
	ios::sync_with_stdio(false);//呵呵
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		int a,b;
		cin>>a>>b;
		for(int j=1;j<=n;j++)//论文篇数不超过n
			tim[i][j]=a*kuai_su_mi(j,b);//预处理做第i个课题中的j篇论文的时间
	}
	memset(dp,INF,sizeof(dp));//呵呵
	dp[0]=0;//做0篇论文不需要时间
	for(int k=1;k<=m;k++)//当前选到第k个课题
		for(int i=n;i>0;i--)//该算dp[i]了，注意正着枚举会WA
			for(int j=1;j<=i;j++)//第k个课题做了j篇论文
				dp[i]=min(dp[i],dp[i-j]+tim[k][j]);
							//做上一个课题时的论文数（i-j）+当前耗费的时间（time[k][j]）
	cout<<dp[n]<<endl;//输出
	return 0;
}
```

# **RQNOJ 95 多多看DVD(加强版)**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/95)
多多进幼儿园了，今天报名了。只有今晚可以好好放松一下了（以后上了学后会很忙）。她的叔叔决定给他买一些动画片DVD晚上看。可是爷爷规定他们只能在一定的时间段L看完。（因为叔叔还要搞NOIP不能太早陪多多看碟，而多多每天很早就困了所以只能在一定的时间段里看碟）。多多列出一张表要叔叔给她买N张DVD碟，大多都是多多爱看的动画片（福音战士，机器猫，火影忍者，樱桃小丸子……）。这N张碟编号为（1，2，3……N）。多多给每张碟都打了分Mi（Mi>0），打分越高的碟说明多多越爱看。每张碟有播放的时间Ti。多多想在今晚爷爷规定的时间里看的碟总分最高。（必须把要看的碟看完，也就是说一张碟不能只看一半）。显然叔叔在买碟是没必要把N张全买了，只要买要看的就OK了，这样节省资金啊。而且多多让叔叔惯的特别任性只要他看到有几张就一定会看完。
可是出现了一个奇怪的问题，买碟的地方只买给顾客M（M<N）张碟，不会多也不会少。这可让多多叔叔为难了。怎么可以在N张碟中只买M张而且在规定时间看完，而且使总价值最高呢？
聪明的你帮帮多多的叔叔吧。
数据范围 by RQ
对于100%的数据m<n<=100 l<=1000
### **输入格式**
输入文件有三行
第一行：两个数空格隔开的正整数，N，M，L（分别表示叔叔给多多买的碟的数量，商店要买给叔叔的碟的数量，爷爷规定的看碟的时间段）。
第二行到第N行，每行两个数：T，M，给出多多列表中DVD碟的信息。
### **输出格式**
单独输出一行，表示多多今晚看的碟的总分。
如果商店卖给叔叔的M张碟无法在爷爷规定的时间看完输出0；
### **样例**
### Input
```
3 2 10
11 100
1 2
9 1
```
### Output
```
3
```
### **主要思路**
此题可以用dp[i][j]表示看了i张碟（这里的碟在1~m范围内），花费时间为j时得到的最大分数。为了解决输出0的情况，初始化为负无穷，只让dp[0][i]=0（看0张碟时一定不会得到分数）最后输出dp[m][l]即可。在转移时，先枚举每张碟k（1~n），再从大到小枚举m张碟i，最后从大到小枚举时间j（l(限定时间)~第k张碟的时间），转移过程如下：
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwOTAyMTYxMzM0OTQ2?x-oss-process=image/format,png)
其中t数组为每张碟的时间，a数组为每张碟的打分。
另外，最后需要特判：如果dp[m][l]<0，（仍是负无穷，未被更新的话）将其变为0再输出。
### **代码如下**
``` cpp
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define ll long long

int n,m,l;
int a[105],t[105];
int dp[105][1005];

int main(int argc, char const *argv[])
{
	ios::sync_with_stdio(false);
	cin>>n>>m>>l;
	for(int i=1;i<=n;i++)
		cin>>t[i]>>a[i];
	for(int i=0;i<105;i++)
		for(int j=0;j<1005;j++)
			dp[i][j]=-999999;
	for(int i=0;i<1005;i++)//l<=1000
		dp[0][i]=0;
	for(int k=1;k<=n;k++)
		for(int i=m;i>=1;i--)
			for(int j=l;j>=t[k];j--)
				dp[i][j]=max(dp[i][j],dp[i-1][j-t[k]]+a[k]);
	if(dp[m][l]<0)
		dp[m][l]=0;
	cout<<dp[m][l]<<endl;
	return 0;
}
```

# **RQNOJ 57 找啊找啊找GF**
### **题目描述**
#### [**传送门**](https://www.rqnoj.cn/problem/57)
"找啊找啊找GF,找到一个好GF,吃顿饭啊拉拉手,你是我的好GF.再见."
"诶,别再见啊..."
七夕...七夕...七夕这个日子,对于sqybi这种单身的菜鸟来说是多么的痛苦...虽然他听着这首叫做"找啊找啊找GF"的歌,他还是很痛苦.为了避免这种痛苦,sqybi决定要给自己找点事情干.他去找到了七夕模拟赛的负责人zmc MM,让她给自己一个出题的任务.经过几天的死缠烂打,zmc MM终于同意了.
但是,拿到这个任务的sqybi发现,原来出题比单身更让人感到无聊-_-....所以,他决定了,要在出题的同时去办另一件能够使自己不无聊的事情--给自己找GF.

sqybi现在看中了n个MM,我们不妨把她们编号1到n.请MM吃饭是要花钱的,我们假设请i号MM吃饭要花rmb[i]块大洋.而希望骗MM当自己GF是要费人品的,我们假设请第i号MM吃饭试图让她当自己GF的行为(不妨称作泡该MM)要耗费rp[i]的人品.而对于每一个MM来说,sqybi都有一个对应的搞定她的时间,对于第i个MM来说叫做time[i]. sqybi保证自己有足够的魅力用time[i]的时间搞定第i个MM^_^.
sqybi希望搞到尽量多的MM当自己的GF,这点是毋庸置疑的.但他不希望·为此花费太多的时间(毕竟七夕赛的题目还没出),所以他希望在保证搞到MM数量最多的情况下花费的总时间最少.

sqybi现在有m块大洋,他也通过一段时间的努力攒到了r的人品(这次为模拟赛出题也攒rp哦~).他凭借这些大洋和人品可以泡到一些MM.他想知道,自己泡到最多的MM花费的最少时间是多少.
注意sqybi在一个时刻只能去泡一个MM--如果同时泡两个或以上的MM的话,她们会打起来的...
### **输入格式**
输入的第一行是n,表示sqybi看中的MM数量.
接下来有n行,依次表示编号为1, 2, 3, ..., n的一个MM的信息.每行表示一个MM的信息,有三个整数:rmb, rp和time.
最后一行有两个整数,分别为m和r.

对于20%数据,1<=n<=10;
对于100%数据,1<=rmb<=100,1<=rp<=100,1<=time<=1000;
对于100%数据,1<=m<=100,1<=r<=100,1<=n<=100
### **输出格式**
你只需要输出一行,其中有一个整数,表示sqybi在保证MM数量的情况下花费的最少总时间是多少.
### **样例**
### Input
```
4
1 2 5
2 1 6
2 2 2
2 2 3
5 5
```
### Output
```
13
```
### **主要思路**
用mm[i][j]表示消耗i个人民币，j点人品泡到的最大mm数
dp[i][j]表示消耗i个人民币，j点人品泡最多mm下花费的最小时间。
先枚举当前该泡第k个MM，再枚举人民币i和人品j，无非分三种情况转移：
**1.当前花费泡到的mm数<=更少花费（不泡当前mm）时泡到的mm数，此时选了当前mm，得到的mm数量会更多，因此让当前花费的mm数=不泡当前mm时的mm数+1（选择当前mm），当前花费消耗的时间=更少花费消耗的时间+泡当前mm需要的时间；**
**2.当前花费泡到的mm数正好=更少花费（不泡当前mm）时泡到的mm数+1（选择当前mm），此时无需更新mm的值，只需更新时间就好，让dp[i][j]=min(dp[i][j],dp[i-花费钱数][j-花费人品])即可；**
**3.当前花费泡到的mm数>更少花费（不泡当前mm）时泡到的mm数+1（选择当前mm），此时指在同等花费下能泡到更多mm，因此更新答案反而不是最优解，所以不予更新（不理会即可）。**
#### **转移过程如下：**
![](https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwOTAyMTMwNjI4Mjg0?x-oss-process=image/format,png)
**另外，在求答案的时候，应用maxn表示泡到的最大mm数，用minn表示最小花费。如果当前花费泡到的mm>maxn或者当前花费泡到的mm=maxn但当前时间小于minn时，即可更新答案。（具体请见代码）**
### **代码如下**
``` cpp
#include <iostream>
#include <cstdio>
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <map>
#include <stack>
#include <cstring>
using namespace std;
#define ll long long

int n,m,r;
int rmb[105],rp[105],tim[105];
int dp[105][105],mm[105][105];
int maxn=-999,minn=999;

int min(int x,int y)//重载min函数，防止输出0
{
	if(!x)
		return y;
	if(!y)
		return x;
	if(x<y)
		return x;
	return y;
}

int main(int argc, char const *argv[])
{
	ios::sync_with_stdio(false);
	cin>>n;
	for(int i=1;i<=n;i++)
		cin>>rmb[i]>>rp[i]>>tim[i];
	cin>>m>>r;//rmb & rp
	for(int k=1;k<=n;k++)
		for(int i=m;i>=rmb[k];i--)
			for(int j=r;j>=rp[k];j--)
			{
				if(mm[i][j]<=mm[i-rmb[k]][j-rp[k]])
				{
					mm[i][j]=mm[i-rmb[k]][j-rp[k]]+1;
					dp[i][j]=dp[i-rmb[k]][j-rp[k]]+tim[k];
				}
				if(mm[i][j]==mm[i-rmb[k]][j-rp[k]]+1)
					dp[i][j]=min(dp[i][j],dp[i-rmb[k]][j-rp[k]]+tim[k]);
			}
	for(int i=0;i<=m;i++)
		for(int j=0;j<=r;j++)
			if(mm[i][j]>maxn || (mm[i][j]==maxn && dp[i][j]<minn))
				maxn=mm[i][j],minn=dp[i][j];
	cout<<minn<<endl;
	return 0;
}
```