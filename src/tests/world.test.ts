import Cell from '../core/cell';
import CellStatus from '../core/cell-status';

class World {
  private constructor(readonly cellMatrix: Cell[][]) {}

  static createFrom(initialState: CellStatus[][]) {
    const cellMatrix = initialState.map((row) => row.map((status) => Cell.create(status)));
    return new World(cellMatrix);
  }

  nextGeneration() {
    const nextGeneration = this.cellMatrix.map((row, rowIndex) =>
      row.map((cell, columnIndex) => cell.regenerate(this.aliveNeighborsFor(rowIndex, columnIndex)))
    );
    return new World(nextGeneration);
  }

  private aliveNeighborsFor(row: number, column: number): number {
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

  it('generate status for the next generations', () => {
    const world = World.createFrom([
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
    ]);

    const nextWorld = world.nextGeneration();

    expect(nextWorld.cellMatrix).toEqual([
      [Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
      [Cell.create(Alive), Cell.create(Alive), Cell.create(Alive)],
      [Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
    ]);

    expect(nextWorld.nextGeneration().cellMatrix).toEqual([
      [Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
      [Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
      [Cell.create(Dead), Cell.create(Alive), Cell.create(Dead)],
    ]);
  });
});
