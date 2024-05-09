import Cell from '../core/cell';
import CellStatus from '../core/cell-status';
import World from '../core/world';

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
