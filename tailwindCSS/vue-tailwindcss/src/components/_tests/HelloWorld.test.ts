import { render, screen, fireEvent } from '@testing-library/vue';
import HelloWorld from '../HelloWorld.vue';
import { test, expect } from 'vitest';
import '@testing-library/jest-dom';

test('renders message and updates count on button click', async () => {
  // 渲染组件
  const { container } = render(HelloWorld, {
    props: {
      msg: 'Hello Vitest!',
    },
  });
  // 检查组件是否渲染了正确的消息
  expect(screen.getByText('Hello Vitest!')).toBeInTheDocument();

  // 检查组件初始计数
  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  console.log(container.innerHTML);

  // 触发按钮点击事件
  await fireEvent.click(screen.getByText('Increment'));

  // 检查计数是否更新
  expect(screen.getByText('Count: 1')).toBeInTheDocument();

  console.log(container.innerHTML);

});
