```js
// 获取暂存区与工作区的差异
execAsync('git diff --cached');

// 获取两个提交之间的差异
execAsync('git diff commit1 commit2');

// 获取特定文件的差异
execAsync('git diff file.txt');

// 获取特定文件在两个提交间的差异
execAsync('git diff commit1 commit2 -- file.txt');

// 获取统计信息
execAsync('git diff --stat');

// 获取简洁的 diff
execAsync('git diff --no-color');

// 获取单词级别的 diff
execAsync('git diff --word-diff');

// 获取与远程分支的差异
execAsync('git diff origin/main');
```
