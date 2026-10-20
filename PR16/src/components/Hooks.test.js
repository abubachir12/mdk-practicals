import { cartReducer, stopwatchReducer } from './AdvancedHooks';

describe('ПР16: useReducer', () => {
  test('добавление товара и увеличение количества', () => {
    const item = { id: 1, name: 'Товар', price: 100 };
    const a = cartReducer({ items: [] }, { type: 'ADD_ITEM', payload: item });
    const b = cartReducer(a, { type: 'ADD_ITEM', payload: item });
    expect(b.items).toEqual([{ ...item, quantity: 2 }]);
  });
  test('уменьшение до нуля удаляет товар', () => {
    const state = { items: [{ id: 1, price: 100, quantity: 1 }] };
    expect(cartReducer(state, { type: 'UPDATE_QUANTITY', payload: { id: 1, quantity: 0 } }).items).toEqual([]);
  });
  test('очистка корзины', () => {
    expect(cartReducer({ items: [{ id: 1 }] }, { type: 'CLEAR_CART' }).items).toEqual([]);
  });
  test('секундомер', () => {
    const initial = { isRunning: false, time: 0, laps: [] };
    const running = stopwatchReducer(initial, { type: 'START' });
    const ticked = stopwatchReducer(running, { type: 'TICK' });
    const lapped = stopwatchReducer(ticked, { type: 'LAP' });
    expect(lapped.laps).toEqual([1]);
    expect(stopwatchReducer(lapped, { type: 'RESET' })).toEqual(initial);
  });
});
