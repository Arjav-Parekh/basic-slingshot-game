
    let engine = Matter.Engine.create();

    let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1600,
        height: 800,
        wireframes: false,
        background:'transparent'

    },
    });

    let ground = Matter.Bodies.rectangle(1200, 450, 400, 20, {
    isStatic: true,
    });

    let ground2 = Matter.Bodies.rectangle(800, 700, 400, 20, {
        isStatic: true,
        });

    let ball = Matter.Bodies.circle(300, 500, 20,{
        render: {
            sprite: {
            texture: "stone.png",
            xScale: 0.12,
            yScale: 0.12,
            },
        },
        });
    let sling = Matter.Constraint.create({
    pointA: { x: 300, y: 500 },
    bodyB: ball,
    stiffness: 0.1,
    render: {
        strokeStyle: 'black'
   }
    });

    let mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false },
    },
    });
    render.mouse = mouse;
    var count=0
    let firing = false;
    document.getElementById('countDone').innerHTML=count;
    Matter.Events.on(mouseConstraint, "enddrag", function (e) {
    if (e.body === ball ){firing = true;count=count+1;   document.getElementById('countDone').innerHTML=count;} ;
    });
 
    Matter.Events.on(engine, "afterUpdate", function () {
    if (
        firing &&
        Math.abs(ball.position.x - 300) < 20 &&
        Math.abs(ball.position.y - 500) < 20
    ) {
        ball = Matter.Bodies.circle(300, 500, 20,{
        render: {
            sprite: {
            texture: "stone.png",
            xScale: 0.12,
            yScale: 0.12,
            },
        },
        });
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
    });

    let stack = Matter.Composites.stack(
    1100,
    220,
    4,
    4,
    0,
    0,
    function (x, y) {
        return Matter.Bodies.polygon(x, y, 8, 30, {
        render: {
            sprite: {
            texture: "boxes.png",
            xScale: 0.12,
            yScale: 0.12,
            },
        },
        });
    }
    );

    
    let stack2 = Matter.Composites.pyramid(
        650,
        400,
        5,
        4,
        0,
        0,
        function (x, y) {
            return Matter.Bodies.polygon(x, y, 8, 30, {
            render: {
                sprite: {
                texture: "boxes.png",
                xScale: 0.12,
                yScale: 0.12,
                },
            },
            });
        }
        );

    Matter.World.add(engine.world, [
    stack,
    stack2,
    ground2,
    ground,
    ball,
    sling,
    mouseConstraint,
    ]);
    Matter.Engine.run(engine);
    Matter.Render.run(render);
