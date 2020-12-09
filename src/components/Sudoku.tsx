// THIS CLASS IS STRICTLY FOR VISUALIZATION IN THE BROWSER
// IT SHOULD NOT CONTAIN ANY SOLVING LOGIC

import React from 'react'
import Cell from './Cell'

import coordToIndex from '../utils/coordToIndex'
import indexToCoord from '../utils/indexToCoord'

interface Props {}
interface State {
    values: number[][];
    focusedIndex: number | null;
}

export default class SudokuInput extends React.Component<Props, State> {
    constructor (props:Props) {
        super(props)

        const values:number[][] = []

        for (let y = 0; y < 9; y++) {
            const row:number[] = []

            for (let x = 0; x < 9; x++) {
                row.push(0)
            }

            values.push(row)
        }

        this.state = {
            values: values,
            focusedIndex: null
        }

        this.handleKeyboardInput = this.handleKeyboardInput.bind(this)
        this.focusCell = this.focusCell.bind(this)
        this.isIndexFocused = this.isIndexFocused.bind(this)
    }

    handleKeyboardInput(event:KeyboardEvent) {
        const key = event.key
        const keyAsInt = parseInt(key)

        if (this.state.focusedIndex === null) {
            this.setState({
                focusedIndex: 0
            })
        }
        
        if (this.state.focusedIndex !== null) {
            let currentCoord = indexToCoord(this.state.focusedIndex)

            switch (key) {
                case "ArrowLeft":
                    currentCoord.x = currentCoord.x - 1 < 0 ? 8 : currentCoord.x - 1
                    break;
                case "ArrowRight":
                    currentCoord.x = currentCoord.x + 1 > 8 ? 0 : currentCoord.x + 1
                    break;
                case "ArrowUp":
                    currentCoord.y = currentCoord.y - 1 < 0 ? 8 : currentCoord.y - 1
                    break;
                case "ArrowDown":
                    currentCoord.y = currentCoord.y + 1 > 8 ? 0 : currentCoord.y + 1
                    break;
            }

            this.setState({
                focusedIndex: coordToIndex(currentCoord.x, currentCoord.y)
            })
        }


        if (!isNaN(keyAsInt) && this.state.focusedIndex !== null) {
            const currentCoord = indexToCoord(this.state.focusedIndex)

            const newValues = [...this.state.values]
            newValues[currentCoord.y][currentCoord.x] = keyAsInt

            console.log(newValues)

            this.setState({
                values: newValues
            })
        }

        if (key === "Backspace" && this.state.focusedIndex !== null) {
            const currentCoord = indexToCoord(this.state.focusedIndex)

            const newValues = [...this.state.values]
            newValues[currentCoord.y][currentCoord.x] = 0

            this.setState({
                values: newValues
            })
        }
    }

    public focusCell(index: number) {
        this.setState({
            focusedIndex: index
        })
    }

    public isIndexFocused(index: number) {
        return this.state.focusedIndex === index
    }

    componentDidMount () {
        this.focusCell(0)
        document.addEventListener("keydown", this.handleKeyboardInput, false)
        setTimeout(() => {
            this.loadString("000000000010000000002000000003000000000000000000000000000000000000000000000000000")
        }, 1000)
    }

    componentWillUnmount () {
        document.removeEventListener("keydown", this.handleKeyboardInput, false)
    }

    toString() {
        let final = ""

        for (const row of this.state.values) {
            for (const value of row) {
                final += value.toString()
            }
        }

        return final
    }

    loadString(sudokuString: string) {
        const newValues:number[][] = []

        for (let y = 0; y < 9; y++) {
            newValues[y] = []
            for (let x = 0; x < 9; x++) {
                const currentValue = parseInt(sudokuString[y*9+x])
                newValues[y][x] = currentValue
            }
        }

        this.setState({
            values: newValues
        })
    }

    render() {
        let rows:JSX.Element[] = []

        for (let y = 0; y < this.state.values.length; y++) {
            const rowValues = this.state.values[y]
            const rowElements:JSX.Element[] = []

            for (let x = 0; x < rowValues.length; x++) {
                const cellValue = rowValues[x]
                const index = y * 9 + x
                
                rowElements.push(<Cell
                    index={index}
                    value={cellValue}
                    focusHandler={this.focusCell.bind(this)}
                    isFocused={this.state.focusedIndex === index}
                    key={index}
                />)
            }

            const row = <div key={y} className="sudoku-row">
                { rowElements }
            </div>

            rows.push(row)
        }

        return <React.Fragment>
            <div className="sudoku-container">
            { rows }
            </div>
            <code>{this.toString()}</code>
        </React.Fragment>
    }
}
