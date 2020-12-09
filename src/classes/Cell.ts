import Sudoku from './Solver'

export default class Cell {
    x: number;
    y: number;
    index: number;
    value: number;
    isClue: boolean;
    isCertain: boolean;
    parent: Sudoku;

    constructor(x: number, y: number, value: number, parent: Sudoku) {
        const isClue = value === 0

        this.x = x,
        this.y = y,
        this.index = y*9+x,
        this.value = value,
        this.isClue = isClue,
        this.isCertain = this.isClue,
        this.parent = parent
    }
}