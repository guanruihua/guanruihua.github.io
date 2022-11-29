# 提交pr(pull request)

## 复制仓库

> 点击`fork`, 就会在自己github上创建此仓库

## 克隆仓库

> clone 代码, 或者用命令克隆仓库到本地

## 创建分支

```bash
git checkout -b [branch Name]
```

## 推送到远程库

```bash
git add .
git commit -m "[desc]"
git push origin [branch Name]
```

## 创建拉取请求

> github 仓库点击 `Compare & pull request` 按钮

## 同步复刻`master`分支

```bash
git checkout master
# 给原始仓库添加upstream仓库
git remote add upstream [HTTPS]
```

## 获取原始仓库的变更

> 从原始仓库获取变更，所有提交到原始仓库的变更将会保存在本地的`upstream/master`分支中

```bash
git fetch upstream
```

## 合并变更

```bash
git merge upstream/master
```

## 把变更推送到github

```bash
git push origin master
```

## 删除无用分支

```bash
git branch -d [Branch Name]
# 删除github 无用分支
git push origin --delete [Branch Name]
```
