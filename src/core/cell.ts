import { CellStatus } from './cell-status';

export class Cell {
  constructor(readonly status: CellStatus) {}

  static create(status: CellStatus) {
    if (status == null) {
      throw new Error('Invalid status for cell');
    }

    return new Cell(status);
  }

  regenerate(numberOfNeighbors: number) {
    const nextStatus =
      this.status === CellStatus.Alive
        ? this.statusForAliveCell(numberOfNeighbors)
        : this.statusForDeadCell(numberOfNeighbors);

    return new Cell(nextStatus);
  }

  isAlive() {
    return this.status === CellStatus.Alive;
  }

  private statusForDeadCell(numberOfNeighbors: number) {
    const isFertilePopulation = numberOfNeighbors === 3;
    return isFertilePopulation ? CellStatus.Alive : CellStatus.Dead;
  }

  private statusForAliveCell(numberOfNeighbors: number) {
    const isStablePopulation = numberOfNeighbors === 2 || numberOfNeighbors === 3;
    return isStablePopulation ? CellStatus.Alive : CellStatus.Dead;
  }
}
