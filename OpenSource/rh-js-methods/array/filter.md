# filter<T extends object>

> - `description` 单层过滤
> - `param` `list` `T[]` 待过滤数组
> - `param` `filterConditions` `{` `[key:string]:` `number|` `string` `|` `RegExp` `}` 过滤条件
> - `param` `retainNotObject` 是否保留非对象项
> - `returns` `T[]`