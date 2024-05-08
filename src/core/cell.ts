import CellStatus from './cell-status';

class Cell {
  private constructor(readonly status: CellStatus) {}

  static create(status: CellStatus) {
    if (status == null) {
      throw new Error('Status should be defined as dead or alive');
    }

    return new Cell(status);
  }

  regenerate(numberOfNeighbors: number) {
    const nextStatus = this.isAlive()
      ? this.statusForAliveCell(numberOfNeighbors)
      : this.statusForDeadCell(numberOfNeighbors);
    return new Cell(nextStatus);
  }

  private statusForAliveCell(numberOfNeighbors: number) {
    const isFertilePopulation = numberOfNeighbors === 2 || numberOfNeighbors === 3;
    return isFertilePopulation ? CellStatus.Alive : CellStatus.Dead;
  }

  private statusForDeadCell(numberOfNeighbors: number) {
    const isStablePopulation = numberOfNeighbors === 3;
    return isStablePopulation ? CellStatus.Alive : CellStatus.Dead;
  }

  isAlive() {
    return this.status === CellStatus.Alive;
  }
}

export default Cell;
