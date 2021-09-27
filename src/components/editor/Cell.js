export default class Cell {
    constructor(i, j) {
        this.rowIndex = i;
        this.colIndex = j;
        this.width = 10;
        this.x = this.rowIndex * this.width + 1;
        this.y = this.colIndex * this.width + 1;
    };
}