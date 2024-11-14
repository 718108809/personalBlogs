# 在windows上docker运行流程文档.md

1、下载docker
官方网站下载https://www.docker.com/
![1731576862384](image/在windows上docker运行流程文档/1731576862384.png)下载完成后按照流程正常安装
2、进入控制面板，找到程序中启动或关闭Windows功能，确认Hyper-v与适用Linux的Windows子系统勾选上
![1731577155164](image/在windows上docker运行流程文档/1731577155164.png)

![1731577177996](image/在windows上docker运行流程文档/1731577177996.png)

![1731577207883](image/在windows上docker运行流程文档/1731577207883.png)![1731577249529](image/在windows上docker运行流程文档/1731577249529.png)

3、打开cmd控制台或PowerShell 执行 wsl --update 指令

![1731577405510](image/在windows上docker运行流程文档/1731577405510.png)

4、重启电脑，打开Docker Desktop 即可运行docker。
