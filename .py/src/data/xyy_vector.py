from sentence_transformers import SentenceTransformer
# import numpy as np

# 加载预训练模型
model = SentenceTransformer('all-MiniLM-L6-v2')  # 384维，轻量快速
# model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')  # 多语言
# model = SentenceTransformer('all-mpnet-base-v2')  # 768维，效果更好

# 单文本生成向量
# text = "机器学习是人工智能的重要分支"
# vector = model.encode(text)
# print(f"向量维度: {vector.shape}")  # (384,)
# print(f"向量值: {vector[:5]}...")

# # 多文本批量生成
# texts = [
#     "深度学习在计算机视觉中应用广泛",
#     "自然语言处理包括文本分类和情感分析",
#     "强化学习用于游戏AI和机器人控制"
# ]
# vectors = model.encode(texts)
# print(f"批量向量维度: {vectors.shape}")  # (3, 384)

# 保存和加载向量
# np.save('data/output/vectors.npy', vectors)
async def genVectorByText(text):
    return await model.encode(text)


