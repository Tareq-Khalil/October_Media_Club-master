function Box(x, y, w, h, confettiColor, p){
    var options = {
        friction: 0.5,
        frictionAir: 0.08,
        restitution: .5,
        density: 0.01
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
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
        p.fill(confettiColor);
        p.strokeWeight(0);
        p.rect(0, 0, this.w, this.h);
        // box(this.w, this.h, 1, 1);
        // rotateY(millis() / 1000);
        p.pop();
    }
}