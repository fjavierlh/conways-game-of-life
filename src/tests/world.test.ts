/*
Create
Next generation
Alive neighbors in coordinates
[[Dead, Dead]] (0,0) => 0
[[Dead, Alive]] (0,0) => 1

[[Alive, Dead, Alive]] (0, 1) => 2

[[Alive, Dead, Alive]] 
[[Alive, Dead, Alive]] (0, 1) => 4

[[Alive, Alive, Alive]] 
[[Alive, Dead, Alive]] (1, 1) => 5

[[Alive, Alive, Alive]] 
[[Alive, Dead, Alive]] 
[[Alive, Alive, Alive]] (1, 1) => 8
*/

import Cell from '../core/cell';
import CellStatus from '../core/cell-status';

class World {
  private constructor(readonly cellMatrix: Cell[][]) {}

  static createFrom(initialState: CellStatus[][]) {
    const cellMatrix = initialState.map((row) => row.map((status) => Cell.create(status)));
    return new World(cellMatrix);
  }

  neighborsFor(row: number, column: number): number {
    return (
      this.aliveNeighborsInPreviousRow(row, column) +
      this.aliveNeighborsInNextColumn(row, column) +
      this.aliveNeighborsInPreviousColumn(row, column) +
      this.aliveNeighborsInNextRow(row, column)
    );
  }

  private aliveNeighborsInNextRow(row: number, column: number) {
    let aliveNeighbors = 0;
    const nextRowIndex = row + 1;
    if (nextRowIndex < this.cellMatrix.length) {
      if (this.isCellAliveAt(nextRowIndex, column)) {
        aliveNeighbors++;
      }
      aliveNeighbors += this.aliveNeighborsInPreviousColumn(nextRowIndex, column);
      aliveNeighbors += this.aliveNeighborsInNextColumn(nextRowIndex, column);
    }
    return aliveNeighbors;
  }

  private aliveNeighborsInPreviousRow(row: number, column: number) {
    let aliveNeighbors = 0;
    const previousRowIndex = row - 1;
    if (previousRowIndex >= 0) {
      if (this.isCellAliveAt(previousRowIndex, column)) {
        aliveNeighbors++;
      }
      aliveNeighbors += this.aliveNeighborsInPreviousColumn(previousRowIndex, column);
      aliveNeighbors += this.aliveNeighborsInNextColumn(previousRowIndex, column);
    }
    return aliveNeighbors;
  }

  private aliveNeighborsInPreviousColumn(row: number, column: number) {
    let aliveNeighbors = 0;
    if (this.isCellAliveAt(row, column - 1)) {
      aliveNeighbors++;
    }
    return aliveNeighbors;
  }

  private isCellAliveAt(row: number, column: number) {
    return this.cellMatrix[row][column] && this.cellMatrix[row][column].isAlive();
  }

  private aliveNeighborsInNextColumn(row: number, column: number) {
    let aliveNeighbors = 0;
    if (this.isCellAliveAt(row, column + 1)) {
      aliveNeighbors++;
    }
    return aliveNeighbors;
  }
}

const { Dead, Alive } = CellStatus;

describe('The world', () => {
  it('be able to create a world', () => {
    const initialState = [[Dead]];
    expect(World.createFrom(initialState).cellMatrix).toEqual([[Cell.create(Dead)]]);
  });

  it('count neighbors for a given coordinates', () => {
    expect(World.createFrom([[Dead, Dead]]).neighborsFor(0, 0)).toBe(0);
    expect(World.createFrom([[Dead, Alive]]).neighborsFor(0, 0)).toBe(1);
    expect(World.createFrom([[Alive, Dead, Alive]]).neighborsFor(0, 1)).toBe(2);
    expect(
      World.createFrom([
        [Alive, Dead, Alive],
        [Alive, Dead, Alive],
      ]).neighborsFor(0, 1)
    ).toBe(4);
    expect(
      World.createFrom([
        [Alive, Alive, Alive],
        [Alive, Dead, Alive],
      ]).neighborsFor(1, 1)
    ).toBe(5);
    expect(
      World.createFrom([
        [Alive, Alive, Alive],
        [Alive, Dead, Alive],
        [Alive, Alive, Alive],
      ]).neighborsFor(1, 1)
    ).toBe(8);
  });
});
