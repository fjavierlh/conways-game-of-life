import Cell from '../core/cell';
import CellStatus from '../core/cell-status';

describe('The Cell', () => {
  it('Any live cell with fewer than two live neighbors dies, as if by underpopulation', () => {
    expect(Cell.create(CellStatus.Alive).regenerate(1).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Alive).regenerate(0).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Dead).regenerate(1).isAlive()).toBe(false);
  });

  it('Any live cell with two or three live neighbors lives on to the next generation', () => {
    expect(Cell.create(CellStatus.Alive).regenerate(2).isAlive()).toBe(true);
    expect(Cell.create(CellStatus.Alive).regenerate(3).isAlive()).toBe(true);
    expect(Cell.create(CellStatus.Dead).regenerate(2).isAlive()).toBe(false);
  });

  it('Any live cell with more than three live neighbors dies, as if by overpopulation', () => {
    expect(Cell.create(CellStatus.Alive).regenerate(4).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Alive).regenerate(5).isAlive()).toBe(false);
    expect(Cell.create(CellStatus.Dead).regenerate(5).isAlive()).toBe(false);
  });

  it('Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction', () => {
    expect(Cell.create(CellStatus.Alive).regenerate(3).isAlive()).toBe(true);
    expect(Cell.create(CellStatus.Dead).regenerate(3).isAlive()).toBe(true);
  });

  it('throw an error if status is not defined', () => {
    expect(() => Cell.create(null)).toThrow();
    expect(() => Cell.create(undefined)).toThrow();
  });
});
