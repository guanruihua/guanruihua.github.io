import asyncio
import lancedb
import numpy as np
import pandas as pd
import xyy_utils as u
import xyy_vector as v

# 连接到数据库
db = lancedb.connect("data/lancedb")  # 本地存储路径

# 准备数据
texts = [ 
  "苹果是水果", 
  "香蕉是热带水果", 
  "橙子富含维生素C", 
]
async def start():
  data = [
      # {"vector": [3.1, 4.1], "text": "苹果是水果", "id":  u.id() },
      # {"vector": [5.9, 26.5], "text": "香蕉是热带水果", "id":  u.id() },
      # {"vector": [9.1, 11.0], "text": "橙子富含维生素C", "id": u.id() },
  ]
  for text in texts:
    vector = await v.genVectorByText(text=text)
    data.append({
      "vector": vector, 
      "text": text,  
      "id":  u.id(),
    })

  print(data)
  
  u.writeJSON('data/output/data.json', data)

  # # 创建表
  # table = db.create_table("fruits", data=data)

  # # 搜索
  # query = [3.0, 4.0]
  # results = table.search(query).limit(2).to_pandas()
  # print("搜索结果:")
  # print(results)

if __name__ == "__main__":
  asyncio.run(start())