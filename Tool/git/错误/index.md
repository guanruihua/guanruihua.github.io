# git error

## git page `Error: The process '/usr/bin/git' failed with exit code 128`

> 我处理方法, 添加补充README.md 后就正常了

## git push origin HEAD:＜name-of-remote-branch＞

```shell
git push origin HEAD:develop
```

> develop: 分支名

## 解决 error: Your local changes to the following files would be overwritten by merge：XXXX

### 保留本地最新修改，并拉取仓库中忘记 pull 的代码到本地

```shell
git stash  
git pull origin master  
git stash pop  
```

### 放弃本地代码，新修改的都不要了，退回上一版本，再拉取代码到本地

```shell
git reset --hard  
git pull origin master  
```

### 对于本地的项目中修改不做任何理会，就需要用到 Git pull 的强制覆盖

```shell
 git fetch --all
 git reset --hard origin/master 
 git pull
```
