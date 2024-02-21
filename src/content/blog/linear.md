---
title: '一道线性代数习题引发的思考'
pubDate: '2022-10-13'
mathjax: true
tag: 'math'
description: '简单题目，一时脑子没转过弯来，记录一下以供参考'
---

# 一道线性代数习题引发的思考

## 题目描述：

设数域$K$上的$s \times n$矩阵
$$
A =
\begin{pmatrix}
 a_{11} & a_{12} & \cdots & a_{1n}\\\\
 a_{21} & a_{22} & \cdots & a_{2n}\\\\
 \vdots & \vdots & \ddots & \vdots\\\\
 a_{s1} & a_{s2} & \cdots & a_{sn}
\end{pmatrix}
$$
满足$s \le n$且
$$
2 \left | a_{ii} \right |>\sum_{j=1}^{n}\left | a_{ij} \right |,\qquad i=1,2,\cdots ,s
$$
证明$A$的行向量组 $\alpha_{1} , \cdots , \alpha_{s}$线性无关

## 原证明过程

将原矩阵补全成方阵：

$$
\begin{pmatrix}
 a_{11} & a_{12} & \cdots & a_{1s} & a_{1,s+1} & \cdots & a_{1n}\\\\
 a_{21} & a_{22} & \cdots & a_{2s} & a_{2,s+1} & \cdots & a_{2n}\\\\
 \vdots & \vdots & \ddots & \vdots & \vdots & \ddots & \vdots\\\\
 a_{s1} & a_{s2} & \cdots & a_{ss} & a_{s,s+1} & \cdots & a_{sn}\\\\
 0 & 0 & \cdots & 0 & 1 & \cdots & 0 \\\\
 \vdots & \vdots & \ddots & \vdots & \vdots & \ddots & \vdots\\\\
 0 & 0 & \cdots & 0 & 0 & \cdots & 1
\end{pmatrix}
$$

### 证明思路：

新方阵的列向量组线性无关$\to$方阵的行向量组线性无关$\to$行向量组的部分组线性无关$\to$原向量组线性无关

故关键在于证明新方阵列向量组线性无关，证明步骤如下：

反证法，假设方阵的列向量组$\beta_{1},\cdots,\beta_{n}$线性相关，则$\exists k_{1},k_{2},\cdots,k_{s},k_{s+1},\cdots,k_{n}\in \mathbb K \quad 且 \ k_{1},k_{2},\cdots,k_{n}不全为0$，使得$k_{1}\beta_{1}+k_{2}\beta_{2}+\cdots+k_{n}\beta_{n}=\mathbf{0}$，由于方阵第s+1行到第n行的特殊性，容易得到$k_{s+1}=k_{s+2}=\cdots=k_{n}=0$，不妨设$\left|k_{l}\right|=max\{\left|k_{1}\right|,\left|k_{2}\right|,\cdots,\left|k_{n}\right|\}$，易得$\left|k_{l}\right|>0$且$ \ l \in \{1,2,\cdots,s\}$
$$
令\ i=l\qquad 有\ a_{ii}=-\frac{k_{1}}{k_{i}}a_{i1}-\frac{k_{2}}{k_{i}}a_{i2}-\cdots-\frac{k_{i-1}}{k_{i}}a_{i,i-1}-\frac{k_{i+1}}{k_{i}}a_{i,i+1}-\cdots-\frac{k_{n}}{k_{i}}a_{in}\\\\
\left|a_{ii}\right|=\sum_{j=1,j\neq i}^{n}\left|\frac{k_{j}}{k_{i}}a_{ij}\right|=\sum_{j=1,j\neq l}^{n}\left|\frac{k_{j}}{k_{l}}a_{lj}\right|\le\sum_{j=1,j \neq l}^{n}\left|a_{lj}\right|\\\\
$$
即$\ i = l\ $时，$2 \left | a_{ii} \right |>\sum_{j=1}^{n}\left | a_{ij} \right |$不成立，与题设矛盾。

$\therefore$ 方阵的列向量组$\beta_{1},\cdots,\beta_{n}$线性相关

## 提出质疑

以上论证关键的一步在于通过构造方阵使得$k_{s+1}=k_{s+2}=\cdots=k_{n}=0$这样就避免了举反例的时候出现$a_{ll}\quad l\in \{s+1,s+2,\cdots,n\}$的情况。但这样是否相当于默认了新方阵的列向量组线性无关？

## 论证

若原行向量组线性无关，则该矩阵代表的n元其次线性方程组会产生$n-s$个自由未知量，故规定$k_{s+1}=k_{s+2}=\cdots=k_{n}=0$相当于构造了一个零解，但由于向量组本来就线性无关，所以不会产生影响。

若原行向量组线性相关，$rank\{\alpha_{1},\alpha_{2},\cdots,\alpha_{s}\}\le s$则会产生多于$n-s$个的自由未知量，那么规定其中$n-s$个为0，剩余的数必然可以取非0值，原论证成立。

