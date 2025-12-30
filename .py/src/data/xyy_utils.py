import numpy as np
import uuid
import json
import os
# data = np.load('data/output/vectors.npy')
# print(data)

def rend_npy(path):
  return np.load(path)

def id():
  return uuid.uuid4().hex
  # return str(uuid.uuid4())

def writeJSON(path, data):
  """保存数据到JSON文件"""
  try:
      # 确保目录存在
      os.makedirs(os.path.dirname(path), exist_ok=True)
        
      with open(path, 'w', encoding='utf-8') as f:
          json.dump(data, f, indent=4, ensure_ascii=False)
        
      print(f"数据已保存到: {path}")
      return True
    
  except Exception as e:
      print(f"保存失败: {e}")
      return False