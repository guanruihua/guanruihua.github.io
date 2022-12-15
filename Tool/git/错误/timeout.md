# Timeout

## git上传代码报错ssh: connect to host github.com port 22: Connection timed out解决办法

当在远程库上设置了SSH 之后还是报错连接超时，问题如下

```bash
$ git push origin master
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

这个时候需要检查一下SSH是否能够连接成功，输入以下命令

```bash
ssh -T git@github.com
```

稍等片刻如果继续报错，如下：

```bash
ssh: connect to host github.com port 22: Connection timed out
```

则，可以使用一下解决办法

打开存放ssh的目录

```bash
cd ~/.ssh

ls
```

查看是否存在 `id_rsa_github.pub` ,`id_rsa_github`, `known_hosts` 三个文件，如果没有移步解决办法：

如果存在，则新建config文件输入下面内容

```bash
Host github.com
User YourEmail@163.com
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```

其中User后面为GitHub的账号名称

创建方法：

`vim config`

然后编辑，最后:wq退出

保存之后再次执行`"ssh -T git@github.com"`时，会出现如下提示，回车"yes"即可
