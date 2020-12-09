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

    public getRow(useOnlyCertainValues: boolean) {
        return this.parent.getRow(this.y, useOnlyCertainValues)
    }

    public getColumn(useOnlyCertainValues: boolean) {
        return this.parent.getColumn(this.x, useOnlyCertainValues)
    }

    public getSubgrid(useOnlyCertainValues: boolean) {
        return this.parent.getSubgrid(Math.floor(this.x / 3), Math.floor(this.y / 3), useOnlyCertainValues)
    }

    public getCandidates(useOnlyCertainValues: boolean) {
        const candidates:number[] = []

        for (let i = 1; i <= 9; i++) {

        }
    }
}