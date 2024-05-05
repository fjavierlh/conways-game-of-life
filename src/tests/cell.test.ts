import { Cell } from '../core/cell';
import { CellStatus } from '../core/cell-status';

/*
1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/

describe('The Cell', () => {
  test('alive with fewer than two live neighbors dies, as if by underpopulation', () => {
    const numberOfNeighbors = 1;

    expect(Cell.create(CellStatus.Alive).regenerate(numberOfNeighbors).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Dead).regenerate(numberOfNeighbors).isAlive()).toBe(false);
  });

  test('alive with two or three live neighbors lives on to the next generation', () => {
    expect(Cell.create(CellStatus.Alive).regenerate(2).isAlive()).toBe(true);
    expect(Cell.create(CellStatus.Alive).regenerate(3).isAlive()).toBe(true);
    expect(Cell.create(CellStatus.Dead).regenerate(2).isAlive()).toBe(false);
  });

  test('alive with more than three live neighbors dies, as if by overpopulation', () => {
    expect(Cell.create(CellStatus.Alive).regenerate(4).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Dead).regenerate(4).isAlive()).toBe(false);
  });

  test('dead  with exactly three live neighbors becomes a live cell, as if by reproduction', () => {
    expect(Cell.create(CellStatus.Dead).regenerate(3).isAlive()).toBe(true);
  });

  test('with undefined initial status are not allowed', () => {
    expect(() => Cell.create(undefined)).toThrow();
    expect(() => Cell.create(null)).toThrow();
  });
});
