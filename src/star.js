function Star(x, y, w, h, confettiColor, p){
    var options = {
        friction: 0.5,
        frictionAir: 0.05,
        restitution: .5,
        density: 0.001
    }
    // this.body = Bodies.rectangle(x, y, w, h, options);
    // Bodies.fromVertices(x, y, [[vector]], [options], [flagInternal=false], [removeCollinear=0.01], [minimumArea=10], [removeDuplicatePoints=0.01])
    var star = Matter.Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38');

    this.body = Bodies.fromVertices(x, y, star, options);
    this.w = w;
    this.h = h;

    //explosion force vector based on https://observablehq.com/@timhau/playing-with-matter-js
    // const forceMagnitude = random(0.01,0.01) * this.body.mass;
    // Matter.Body.applyForce(this.body, this.body.position, {
    //     x: (forceMagnitude + random(0.01,0.01) * random(0.01,0.01) * forceMagnitude),
    //     y: (-forceMagnitude + random(0.01,0.01) * random(0.01,0.01) * -forceMagnitude)
    //   });

    World.add(world, this.body);


    this.isOffScreen = function(){
        var pos = this.body.position;
        return (pos.y > p.height + 100);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
      };

    this.show = function(){
        var pos = this.body.position;
        var angle = this.body.angle;

        p.push();
        p.translate(pos.x, pos.y);
        p.rotate(angle);
        p.rectMode(p.CENTER);
        p.colorMode(p.HSB);
        p.fill("#F93528");
        p.strokeWeight(0);
        // p.rect(0, 0, this.w, this.h);
        // p.beginShape();
        // 50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38
        //     p.vertex(50,0)
        //     p.vertex(63,38)
        //     p.vertex(100,38)
        //     p.vertex(69,59)
        //     p.vertex(82,100)
        //     p.vertex(50,75)
        //     p.vertex(18,100)
        //     p.vertex(31,59)
        //     p.vertex(0,38)
        //     p.vertex(37,38)
        // p.endShape(p.CLOSE);
        this.star(0, 0, 30, 70, 5);
        // box(this.w, this.h, 1, 1);
        // rotateY(millis() / 1000);
        p.pop();
    }

    this.star = function(x, y, radius1, radius2, npoints) {
        let angle = p.TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angle) {
          let sx = x + p.cos(a) * radius2;
          let sy = y + p.sin(a) * radius2;
          p.vertex(sx, sy);
          sx = x + p.cos(a + halfAngle) * radius1;
          sy = y + p.sin(a + halfAngle) * radius1;
          p.vertex(sx, sy);
          
        }
        p.endShape(p.CLOSE);
      }
}

