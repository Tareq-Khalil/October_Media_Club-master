class Line {
    constructor(x, y, px, py, color) {
      this.x = x;
      this.y = y;
      this.px = px;
      this.py = py;
      this.color = split(color, ',');
      this.time = 100;
    }
    display(){
        stroke(this.color[0],this.color[1], this.color[2])
        line(this.x, this.y, this.px, this.py)
        this.time--;
    }
  }
