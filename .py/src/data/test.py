from sentence_transformers import SentenceTransformer
import asyncio
import concurrent.futures
from typing import List, Union
import numpy as np
import threading
from functools import lru_cache

class AsyncVectorGenerator:
    """异步向量生成器"""
    
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self, model_name: str = 'all-MiniLM-L6-v2'):
        if not hasattr(self, '_initialized'):
            self.model_name = model_name
            self.model = None
            self.executor = None
            self._initialized = False
    
    def _lazy_init(self):
        """延迟初始化模型"""
        if not self._initialized:
            print(f"加载模型: {self.model_name}")
            self.model = SentenceTransformer(self.model_name)
            # 根据CPU核心数设置线程池大小
            cpu_count = os.cpu_count() or 4
            self.executor = concurrent.futures.ThreadPoolExecutor(
                max_workers=min(cpu_count, 8),
                thread_name_prefix="vector_worker"
            )
            self._initialized = True
            print(f"模型加载完成，维度: {self.model.get_sentence_embedding_dimension()}")
    
    async def gen_vector_async(self, text: str) -> List[float]:
        """
        异步生成单个文本的向量
        
        Args:
            text: 输入文本
            
        Returns:
            向量列表
        """
        self._lazy_init()
        
        loop = asyncio.get_event_loop()
        
        # 在线程池中运行同步的 encode 函数
        vector = await loop.run_in_executor(
            self.executor,
            self.model.encode,
            text
        )
        
        return vector.tolist()  # 转换为Python列表
    
    async def gen_vectors_batch_async(self, texts: List[str]) -> List[List[float]]:
        """
        异步批量生成向量
        
        Args:
            texts: 文本列表
            
        Returns:
            向量列表
        """
        self._lazy_init()
        
        loop = asyncio.get_event_loop()
        
        # 批量处理
        vectors = await loop.run_in_executor(
            self.executor,
            self.model.encode,
            texts
        )
        
        return vectors.tolist()
    
    def close(self):
        """清理资源"""
        if self.executor:
            self.executor.shutdown(wait=False)
    
    def __del__(self):
        self.close()

# 使用示例
async def example_usage():
    """使用示例"""
    generator = AsyncVectorGenerator('all-MiniLM-L6-v2')
    
    # 单文本生成
    text = "机器学习是人工智能的重要分支"
    vector = await generator.gen_vector_async(text)
    print(f"向量维度: {len(vector)}")
    print(f"前5个值: {vector[:5]}")
    
    # 批量生成
    texts = [
        "深度学习在计算机视觉中应用广泛",
        "自然语言处理包括文本分类和情感分析",
        "强化学习用于游戏AI和机器人控制"
    ]
    vectors = await generator.gen_vectors_batch_async(texts)
    print(f"\n批量生成了 {len(vectors)} 个向量")
    print(f"每个向量维度: {len(vectors[0])}")