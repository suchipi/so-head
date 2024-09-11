import {
  useDraw,
  useNewComponent,
  useType,
  Geometry,
  Mouse,
  Polygon,
  Vector,
  HexMouseEvent,
} from "@hex-engine/2d";

export default function Whiteboard(size: Vector) {
  useType(Whiteboard);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(size),
    })
  );

  // outer border
  useDraw((context) => {
    context.lineWidth = 1;
    context.strokeStyle = "black";
    geometry.shape.draw(context, "stroke");
  });

  const strokes: Array<Array<Vector>> = [];

  const mouse = useNewComponent(() => Mouse({ geometry }));

  mouse.onDown((event) => {
    if (!event.buttons.left) return;
    strokes.push([event.pos.clone()]);
  });

  mouse.onMove((event) => {
    if (!mouse.isPressingLeft) return;
    if (!mouse.isInsideBounds) return;

    strokes[strokes.length - 1].push(event.pos.clone());
  });

  mouse.onRightClick((event) => {
    // empty the array
    strokes.length = 0;
  });

  const centerOffset = new Vector(
    geometry.shape.width,
    geometry.shape.height
  ).divideMutate(2);

  useDraw((context) => {
    context.translate(centerOffset.x, centerOffset.y);

    context.strokeStyle = "red";

    for (const points of strokes) {
      context.beginPath();
      const [first, ...rest] = points;
      context.moveTo(first.x, first.y);
      for (const point of rest) {
        context.lineTo(point.x, point.y);
      }
      context.stroke();
    }
  });

  return {
    geometry,

    // for debugging
    strokes,
  };
}
