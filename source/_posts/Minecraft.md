---
title: Minecraft配置合集
date: 2020-1-18 13:44:03
auther: WJS
top: false
cover: false
mathjax: false
comments: false
toc: true
summary:
tags:
  - software
categories:
  - software
---

# 1.前期准备

## 1.1 运行环境

### 1.1.1 Windows 10 64位 + **Java 8 64位**

注意Java 8的选择是因为要运行1.12版本，如果是最新版本的MC应该可以支持Java 10

(如果非64位在运行游戏时内存无法调至2G以上且限制诸多，强烈建议使用64位Java，Java的下载非常麻烦，我使用的是别人打包好的Java 8 Update 202)

### 1.1.2 MC启动器

这里推荐采用github上的一个开源项目**HMCL**，完全依赖Java 系列版本进行开发，界面简洁美观无恶意广告，且支持几乎所有版本的Minecraft并附带相应Mod包管理器。

最重要的是支持离线模式运行，完美逃避付费困扰。（不过自然没办法加入联机服务器了）

![软件主页](http://yanxuan.nosdn.127.net/79c6d24c0d1f02b44ea2e83099828b6a.png)

![版权信息](http://yanxuan.nosdn.127.net/93a51c322b52c34bd7db0ed3b866fcc6.png)

**[项目地址](https://github.com/huanghongxun/HMCL)**

---

## 1.2 安装选项

### 参考配置：

1. 全局游戏配置：物理内存 4096MB
2. MC版本：1.12.2稳定版
3. Forge版本：1.12.2---14.23.2 （方便对应MOD）
4. OptFine：最新稳定版即可

# 2. MOD配置

## 2.1 RTM（Real Train Mod）

相关资源链接：[百度RTM吧](https://tieba.baidu.com/f?kw=minecraft_realtrainmod)

### 2.1.1 介绍

RTM，来自日本某大佬的真实火车MOD，可以控制火车材质参数等，还内置了火车站建设所需的一切工具，隐藏了枪械、飞机等彩蛋。

原帖链接见贴吧，全程需要-Wall，下载地址则在CurseForge，一直用的是较为稳定的1.12.2版本。

RTM MOD包含一个不得不装的依赖库和一个地形快速编辑MOD，比MC的指令要快很多，通过快捷键操作就可以快速进行建造、毁坏、地形修改等操作。具体来说是如下三个MOD（按照我下载时的原始文件名）：

1. RTM2.4.8-27_forge-1.12.2-14.23.2.2611.jar
2. NGTLib2.4.3-20_forge-1.12.2-14.23.2.2611.jar
3. MCTE2.4.3-17_forge-1.12.2-14.23.2.2611.jar

> 注：NGTLib是原MOD的依赖库，必须要安装。MCTE就是地形编辑器MOD，之前的一些版本据说要输入激活码，否则会在游戏界面右上角不断供滚动文字，但不知道为什么一直没遇见，估计现在不需要激活了。

### 2.1.2 安装

这不是废话，直接把.jar文件拖到`mods`文件夹不就完了。

### 2.1.3 有关追加包

追加包的下载建议在贴吧上找，上面有很多优秀的追加包，如和谐号、上海地铁等。安装方式与Mod相同，放入`mods`文件夹即可。

贴吧上的各位大佬都对版权问题极为重视，不得随意传播追加包，且公开发图的时候必须注明使用的是谁制作的追加包，因此千万不要说是我告诉你的。

**常用追加包修改：**

这里主要关注的是速度和加速度这两个项目，因为一不小心就会超速然后区块加载器爆掉，然后你的电脑就差不多报废了。

![json内容](http://yanxuan.nosdn.127.net/c272f71a1a075da6af288c9599eeabac.png)

追加包压缩包`mods`文件夹一直打开，最底层每个车都会有一个.json文件，在记事本里编辑就好。**maxSpeed**是每一个档位的最大速度，每项数值乘以100可以理解为km/h，实际感受就是创造模式下全速开疾跑飞行的速度大约感受为0.80.

加速度默认就好，不可过大（转弯时极易侧翻）。

### 2.1.4 使用教程

具体教程可以b站搜索。这里说几个坑：

1. 上车巨难上，必须右键找准位置
2. W、S键调的只是档位，切勿操之过急
3. 转弯半径要大，火车的爬坡能力没有你想象的那么好

### 2.1.5 晒图时间到

（我也不管什么版权了）

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/2019-07-20_19.22.39.png)

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/2019-07-20_19.24.53.png)

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/2019-10-04_15.49.45.png)
![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/2019-10-04_15.50.12.png)

## 2.2 其他MOD

### 2.2.1  journeymap

极其好用的小地图mod，可以显示周围生物，设置WayPoints（被僵尸撸死之前逃生的利器），绘制地形，还有更多精美主题等你探索~~~

![网上找的图](http://oss.minecraftxz.com/wp-content/uploads/2017/08/430716ff5ea80255dacab7564e7acda5.jpg)

**缺点：**所有地图间数据是通用的，也就是说要想发挥这个mod的最大功效，从此就只能玩一个地图，目前还未尝试寻找解决方法。（反正一般我也不用）

### 2.2.2 JEI物品管理器

话说这个JEI跟NEI有什么区别，还有为什么我不会取东西了？

![网上找的图](https://nie.res.netease.com/r/pic/20180613/181a4a55-12b2-4d7a-b1b0-f326f0a44a7f.png)

### 2.2.3 Hwyla（**Here's What You're Looking At**）

你看啥就显示啥。

![熔炉](http://oss.minecraftxz.com/wp-content/uploads/2017/08/3f0694debd4c2dc4eb428ecfff98fde7.png)

此外看向生物体时会显示血量，看向村民会显示职业，还可以预览箱子中物品。

### 2.2.4 Waila-Harvestability-Mod

Hwyla是Waila的一个前置，界面相似（根本就是一模一样），可以显示当前方块能否被挖掘破坏，应该用什么工具破坏。

# 3. 光影

![Snipaste_2020-01-19_00-50-23.png](http://yanxuan.nosdn.127.net/d8c3b71e642a750c429900f78d022a85.png)

作为伸手党从52pojie上下载的整合包，放在`resourcepacks`文件夹中，打开游戏后在Optfine中决定是否开启即可。

记得一定要优化图形设置，不然显卡会爆掉。

# 4. MC指令合集

## 4.1 游戏规则修改

游戏规则指令：` /gamerule`

其后传递的是一个布尔值

1. **doDaylightCycle** 时间是否流动
2. **doFireTick** 火线是否蔓延
3. **doMobLoot** 怪物物品是否掉落
4. **doMobSpawning** 怪物是否自动生成
5. **doTileDrops** 破坏物品是否掉落方块
6. **keepInventory** 死亡物品是否保存
7. **mobGrfiefing** 怪物是否破坏地形
8. **naturalRegeneration** 满饱食度是否自动回复生命值
9. **showDeathMessages** 显示死亡消息

示例：`/gamerule keepInventory true`

> 注意！`/gamerule`指令强制区分大小写

## 4.2 作弊指令

### 4.2.1 gamemode

`/gamemode 0`切生存

`/gamemode 1`切创造

### 4.2.2 无中生有

**给予附魔物品例子**：`/give @p minecraft:diamond_sword 1 0 {ench:[{id:17,lvl:127},{id:18,lvl:127}]}`
0为数据值，如附魔金苹果数据值为`1`，金苹果则为`0`。

#### 4.2.2.1 附魔ID：

##### 装备：

　　0 - 防御，Protection (头盔，装甲，鞋子，裤子)
　　1 - 火焰防御，Fire Protection (头盔，装甲，鞋子，裤子)
　　2 - 摔伤减半，Feather Falling (鞋子)
　　3 - 爆炸防御，Blast Protection (头盔，装甲，鞋子，裤子)
　　4 - 远程攻击防御，Projectile Protection (头盔，装甲，鞋子，裤子)
　　5 - 水下呼吸，Respiration (头盔)
　　6 - 水下挖掘，Aqua Affinity (头盔)
　　7 - 伤害反射，Thorns (头盔，装甲，鞋子，裤子)
　

##### 武器 (剑)：

　　16 - 锋利，Sharpness (剑)
　　17 - 亡灵杀手，Smite (剑)
　　18 - 节肢杀手，Bane Of Arthropods (剑)
　　19 - 击退，Knock Back (剑)
　　20 - 火元素，Fire Aspect (剑)
　　21 - 掉落品加倍，Looting (剑)

##### 工具：

　　32 - 挖掘效率，Efficiency (稿子，斧子，铲子)
　　33 - 精准采集，Silk Touch (稿子，斧子，铲子)
　　34 - 不毁，Unbreaking (稿子，斧子，铲子，武器，装备)
　　35 - 幸运挖掘，Fortune (稿子，斧子，铲子)

##### 武器 (弓箭)：

　　48 - 力量，Power (弓箭)
　　49 - 弓箭击退，Punch (弓箭)
　　50 - 火元素，Flame (弓箭)
　　51 - 无限弓箭，Infinity (弓箭)

> 注：**附魔等级最高为`32767`**（浓浓的Java味）

#### 4.2.2.2常用例子（全部精心修改）：

```
/give @p minecraft:golden_apple 64 1
/give @p minecraft:diamond_sword 1 0 		{ench:[{id:17,lvl:32767},{id:16,lvl:32767},{id:18,lvl:32767},{id:19,lvl:3},{id:20,lvl:32767},{id:21,lvl:5},{id:34,lvl:32767}]}
/give @p minecraft:diamond_helmet 1 0 		{ench:[{id:0,lvl:32767},{id:1,lvl:32767},{id:2,lvl:32767},{id:3,lvl:32767},{id:4,lvl:32767},{id:7,lvl:32767},{id:34,lvl:32767},{id:6,lvl:32767},{id:5,lvl:32767}]}
/give @p minecraft:diamond_chestplate 1 0 	{ench:[{id:0,lvl:32767},{id:1,lvl:32767},{id:2,lvl:32767},{id:3,lvl:32767},{id:4,lvl:32767},{id:7,lvl:32767},{id:34,lvl:32767},{id:6,lvl:32767},{id:5,lvl:32767}]}
/give @p minecraft:diamond_leggings 1 0 	{ench:[{id:0,lvl:32767},{id:1,lvl:32767},{id:2,lvl:32767},{id:3,lvl:32767},{id:4,lvl:32767},{id:7,lvl:32767},{id:34,lvl:32767},{id:6,lvl:32767},{id:5,lvl:32767}]}
/give @p minecraft:diamond_boots 1 0 		{ench:[{id:0,lvl:32767},{id:1,lvl:32767},{id:2,lvl:32767},{id:3,lvl:32767},{id:4,lvl:32767},{id:7,lvl:32767},{id:34,lvl:32767},{id:6,lvl:32767},{id:5,lvl:32767}]}

/give @p minecraft:diamond_shovel 1 0 		{ench:[{id:32,lvl:3},{id:34,lvl:32767},{id:35,lvl:7}]}
/give @p minecraft:diamond_hoe 1 0 		{ench:[{id:32,lvl:3},{id:34,lvl:32767},{id:35,lvl:7}]}
/give @p minecraft:diamond_axe 1 0	 	{ench:[{id:32,lvl:3},{id:34,lvl:32767},{id:35,lvl:7}]}
/give @p minecraft:diamond_pickaxe 1 0	 	{ench:[{id:32,lvl:3},{id:17,lvl:32767},{id:18,lvl:32767},{id:34,lvl:32767},{id:35,lvl:7}]}
/give @p minecraft:bow 1 0 			{ench:[{id:17,lvl:32767},{id:18,lvl:32767},{id:48,lvl:32767},{id:50,lvl:32767},{id:51,lvl:32767},{id:49,lvl:3},{id:34,lvl:32767}]}
```

### 4.2.3 嗑药大法

#### `/effect` 玩家 效果 时间 倍数

#### 效果ID （ 注释为倍数X1）：

**1 速度** 注释：增加视野（FOV）,提升速度%20

**2 缓慢** 注释：缩小视野（FOV），速度减慢%15

**3 急迫** 注释：方块挖掘速度提升%20（手臂挥动得更快）

**4 挖掘疲劳** 注释：方块挖掘速度减少%20（手臂挥动得更慢）

**5 力量** 注释：近身攻击造成的伤害提高130%

**6 瞬间治疗** 注释：瞬间恢复4（❤❤）

**7 瞬间伤害** 注释：瞬间造成6（❤❤❤）

**8 跳跃提升** 注释：允许玩家跳得更高

**9 反胃** 注释：导致视野摇晃和扭曲

**10 生命恢复** 注释：每50刻恢复（❤❤❤）

**11 抗性提升** 注释：减少所有受到的伤害20%

**12 防火** 注释：对货和岩浆免疫

**13 水下呼吸** 注释：氧气条件在水下不会减少

**14 隐身** 注释：导致实体消失，除非你直接接触他们，否则生物不会攻击你。如果你穿任何一件盔甲，生物最远能在一米外见到你，在此每增加一件盔甲这个距离将增加3米，当你穿整套盔甲时距离为10米。（无效果时为15米）

**15 失明** 注释：在玩家身边创造出黑色浓雾，禁止疾跑和暴击。

**16 夜视** 注释：增加亮度，增加水下视野

**17 饥饿** 注释：导致食物表更快耗尽（每刻增加0.025饥饿等级）

**18 虚弱** 注释：近身攻击力降低3，受到此效果僵尸村民能使用金苹果治疗僵尸化，洞穴蜘蛛不会使目标中毒。

**19 中毒** 注释：每25刻/1.25秒给予半颗心的伤害，生命条变绿，剩下半颗心将不会继续掉血。

**20 凋零** 注释：凋零每40刻/2秒给予半颗心伤害。此效果能致命。生命条会变黑。

**21 生命提升** 注释： 增加2颗心生命值，额外生命值会在效果结束时消失。

**22 伤害吸收** 注释：添加2颗心生命值，这些生命值不会受到天然恢复或者其他效果影响，但每30秒无视剩余生命值的状态刷新一次，额外生命值会在效果结束时消失。

**23 饱和** 注释：每刻恢复1饱食度。

# 5. Enjoy Minecrafting!