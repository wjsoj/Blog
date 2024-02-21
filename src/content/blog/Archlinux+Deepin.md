---
title: 'Archlinux+Deepin V20'
pubDate: '2020-11-7'
tag: 'software'
description: 'Archlinux搭配Deepin桌面安装过程全记录'
---

# 1. 安装前准备

1. 写入镜像，使用Rufus
2. 更改启动顺序，从U盘启动
![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20201108110636.png)

# 2. 安装命令

```bash
# 验证启动模式
ls /sys/firmware/efi/efivars
# 使用iwd连接无线网
iwctl
device list
[iwd#] station <devicename> scan
[iwd#] station <devicename> get-networks # 显示扫描的结果
station <devicename> connect <wifi-ssid>
exit
# 检查联网情况
ping www.baidu.com
# 同步时间
timedatectl status
timedatectl set-ntp true
# 分区
fdisk -l
cfdisk
(GUI)

mkfs.fat -F32 /dev/sda1
mkfs.ext4 /dev/sda2
mkfs.ext4 /dev/sda4
mkswap /dev/sda3
swapon /dev/sda3

mount /dev/sda2 /mnt
mkdir /mnt/efi
mount /dev/sda1 /mnt/efi
mkdir /mnt/home
mount /dev/sda4 /mnt/home

# 修改镜像源
vim /etc/pacman.d/mirrorlist
i
(edit)
(加在最前面)
Server = https://mirrors.163.com/archlinux/$repo/os/$arch
ESC
:
wq

#(网易不太稳，先刷新一下，这样下载的时候能响应更及时点)
pacman -Syy
pacstrap /mnt base linux linux-firmware base-devel
(waiting)

genfstab -U /mnt >> /mnt/etc/fstab
cat /mnt/etc/fstab

arch-chroot /mnt

ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc

pacman -S vim iwd networkmanager dialog wireless_tools wpa_supplicant ntfs-3g dhcpcd
vim /etc/locale.gen
locale-gen
vim /etc/locale.conf
LANG=en_SG.UTF-8

vim /etc/hostname
(主机名)

vim /etc/hosts

127.0.0.1	localhost
::1		localhost
127.0.1.1	myhostname.localdomain	myhostname

passwd

pacman -S grub efibootmgr os-prober intel-ucode

grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=ArchLinux
grub-mkconfig -o /boot/grub/grub.cfg

systemctl enable dhcpcd iwd NetworkManager systemd-networkd systemd-resolved

exit
umount -R /mnt
reboot
```

# 3. 后续配置

![](https://cdn.jsdelivr.net/gh/wjsoj/pic/img/20201114225521.png)

```bash
# 安装一大堆驱动
pacman -S xf86-video-intel
pacman -S xf86-input-libinput xf86-input-synaptics
pacman -S alsa-utils pulseaudio pulseaudio-alsa
pacman -S bluez bluez-utils bluedevil pulseaudio-bluetooth
pacman -S xf86-video-nouveau
pacman -S xf86-video-vesa

vim /etc/pacman.conf
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = http://mirrors.163.com/archlinux-cn/$arch

pacman -Syy
pacman -S archlinuxcn-keyring
pacman -S yay

useradd -m -G wheel username
passwd username
EDITOR=vim visudo
(删除 %wheel ALL=(ALL)ALL 前的注释符)

pacman -S ttf-dejavu wqy-microhei
pacman -S wqy-zenhei wqy-bitmapfont

exit
(切换为普通用户)
yay -S ttf-win7-fonts ttf-office-2007-fonts

pacman -S xorg xorg-server xorg-apps
pacman -S deepin deepin-extra
pacman -S lightdm lightdm-deepin-greeter
pacman -S git zsh neofetch file-roller p7zip unrar mpv
pacman -S deepin-kwin

vim /etc/lightdm/lightdm.conf
去掉#minimum-vt=7 # Settiing this is to value < 7 implies security issues ,see FS#46799前面的#
greeter-session=lightdm-deepin-greeter


pacman -S ibus ibus-libpinyin
ibus-setup

IBus has been started! If you cannot use IBus, please add below lines in $HOME/.bashrc, and relogin your desktop.
（译：IBus已启动！如果您还不能用Ibus,请您先将以下的三行代码加到$HOME/.bashrc，再重新登录。)
  export GTK_IM_MODULE=ibus
  export XMODIFIERS=@im=ibus
  export QT_IM_MODULE=ibus

```

