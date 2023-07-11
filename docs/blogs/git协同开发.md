## 组长

0\. 克隆项目

```bash
git clone git@github.com:ifer-itcast/hmmm-frontend.git # 运行项目请参考`项目环境`
# git clone https://gitee.com/zhoushugang/hmmm-frontend-dev.git
```

1\. 变成自己的本地仓库

```bash
rm -rf .git # 删除项目中的 `.git` 文件夹
git init # 初始化仓库
git add . # 添加暂存区 
git commit -m 项目初始化 # 提交本地仓库
git remote add origin https://gitee.com/ifercarly/hmm-front.git # 添加远程仓库地址
git push -u origin master # 推送到远端，第一次推送到 master 写完整，后续再推送到 master 只需要 git push 就行啦
git branch release # 基于 master 分支创建 release 分支，测试分支
git branch # 查看所有分支
git branch develop # 基于 master 分支创建 develop 分支，开发分支，一般组员在自己的分支把代码完毕后，都要合到这个分支上面
```

2\. 新建远程仓库并拉小组成员

```bash
Settings -> Manage access -> 输入小伙伴 GitHub 账号并确认 -> 小伙伴会收到通知，点击确认（如出现404，把这个地址粘贴到已登录 GitHub 的浏览器）
```

3\. 推送所有分支到远程仓库

```bash
git remote add origin git@github.com:ifer-itcast/test.git
# 推送 master 分支
git push -u origin master
# 推送 release 分支
git push origin release
# 推送 develop 分支
git push origin develop
```

## 组员

0\. 克隆项目所有分支

```bash
# 注意是 https:// 的地址
git clone https://github.com/ifer-itcast/test.git（组长的地址）

# 可以是 git fetch 远端地址 远端分支:本地分支
# git fetch https://github.com/ifer-itcast/test.git release:release
git checkout release # 如果说本地有，就切换到本地的 release，如果没有就去远端拉取 release 并切换

# git fetch https://github.com/ifer-itcast/test.git develop:develop
git checkout develop
```

1\. 创建 `任务分支`

```bash
# 切换到 develop 分支
git checkout develop # 如果本地有 develop 分支，就直接切换，如果本地没有，会去远端把 develop 拉过来并切换到 develop
# 例如创建基础题库分支，规范(feature/功能)
git checkout -b feature/questions
```

其他举例

```bash
feature/questions # 基础题库
feature/questions-choice # 精选题库
feature/questions-new # 试题录入
feature/randoms # 题组列表
feature/subjects # 学科管理
feature/directorys # 目录管理
feature/tags # 标签管理
feature/articles # 面试技巧
```

2\. 当你开发完成一个小功能/步骤需要提交代码

```bash
# 添加到暂存
git add .
# 提交本地仓库，无需推送！
git commit -m '备注'
```

3\. 开发完毕

当你确认你的任务功能开发完毕后，合并到develop分支然后推送到远程

```bash
# 切换到develop分支
git checkout develop
# 注意！！！！拉取最新develop分支（没有配置origin直接使用仓库地址）
git pull origin develop
# 合并自己的任务分支   例如（featrue/questions）基础题库
git merge feature/questions
git pull  //在拉 防止冲突
# 推送develop分支 （没有配置origin直接使用仓库地址）
git push origin develop
```

`切换到了 develop，拉取了远端代码，合并了自己分支的代码，此时还需要再次开发新功能，建议直接基于 develop 重新创建一个新分支`

假如张三又想开发一个新功能

```bash
# 保证目前处于 develop
git checkout -b feature/questionAdd
# 写代码....
git add .
git commit -m 又开发完啦
# 自己的分支没有必要 push 到远端
git checkout develop
# 注意！！！！拉取最新 develop 分支的代码
git pull origin develop
# 再合并
git merge feature/questionAdd
```

`<font color=e32d40>`**注意：checkout 切换分支之前要保证当前分支是干净的！**`</font>`

## 测试

0\. 拉取远程 develop 分支到本地进行测试

==合并的操作由组长进行==

```bash
# 先保证自己处于 develop
git checkout develop
# 拉取最新的develop分支到本地
git pull origin develop
# 合并到release分支
git checkout release
git merge develop
# 推送合并完成的release分支到远程仓库
git push origin release
```

1\. 其他组员也可以拉取 release 代码到本地进行测试

2\. 创建修改 Bug 的分支

```bash
# 先保证自己处于 release
git checkout release
# 再拉取最新的 release 分支
git pull origin release
# 创建修改 bug 的分支，规范（hotfix/questions）
git checkout -b hotfix/questions
```

3\. 进行修复

```bash
# 添加暂存
git add .
# 提交本地，无需推送！
git commit -m '修改基础题库bug-分页错误'
# 合并分支
git checkout release
# 拉取最新release分支
git pull origin release
git merge hotfix/questions
# 推送release分支
git push origin release
```

4\. 测试完毕

==合并 master 的操作由组长进行==

```bash
# 拉取最新的 develop 分支到本地
git pull origin release
# 合并到 release 分支
git checkout master
git merge release
# 推送合并完成的 release 分支到远程仓库
git push
# 有的公司，有自动化构建平台，这个平台/工具能自动拉去 master 的代码，自动打包发布
npm run build # 生成一个 dist 目录，把这个发给我
```

## 问题

如何解决冲突？

代码开发一半，想切换分支，又不想提交怎么办？git stash 暂存  git stash apply 应用最新的暂存
