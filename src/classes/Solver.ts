import Cell from './Cell'

export default class SudokuSolver {
    rows: Cell[][]

    constructor(sudokuString: string) {
        const rows:Cell[][] = []

        for (let y = 0; y < 9; y++) {
            const row: Cell[] = []

            for (let x = 0; x < 9; x++) {
                const value = parseInt(sudokuString[y*9+x])
                const cell = new Cell(x, y, value, this)

                row.push(cell)
            }

            rows.push(row)
        }

        this.rows = rows
    }

    getRow(y:number) {
        return this.rows[y]
    }

    getColumn(x: number) {
        const col:Cell[] = []

        for (let y = 0; y < 9; y++) {
            col.push(this.rows[y][x])
        }

        return col
    }

    getSubgrid(x: number, y: number) {
        const subgrid:Cell[] = []

        for (let yOffset = 0; yOffset < 3; y++) {
            for (let xOffset = 0; xOffset < 3; x++) {
                subgrid.push(this.rows[y * 3 + yOffset][x * 3 + xOffset])
            }
        }

        return subgrid
    }

    solveLoneSingles () {
        for (const row of this.rows) {
            for (const cell of row) {

            }
        }
    }
}