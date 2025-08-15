# transform

```css
.style {
  /* 变换矩阵 */
  transform: matrix(1, 2, 3, 4, 5, 6);
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  /* 透视 */
  transform: perspective(17px);

  /* 旋转 */
  transform: rotate(0.5turn);
  transform: rotate3d(1, 2, 3, 10deg);
  transform: rotateX(10deg);
  transform: rotateY(10deg);
  transform: rotateZ(10deg);

  /* 移动 */
  transform: translate(12px, 50%);
  transform: translate3d(12px, 50%, 3em);
  transform: translateX(2em);
  transform: translateY(3in);
  transform: translateZ(2px);

  /* 缩放 */
  transform: scale(2, 0.5);
  transform: scale3d(2.5, 1.2, 0.3);

  /* 缩放 */
  transform: scaleX(2);
  transform: scaleY(0.5);
  transform: scaleZ(0.3);

  /* 倾斜角 */
  transform: skew(30deg, 20deg);
  transform: skewX(30deg);
  transform: skewY(1.07rad);
}
```
