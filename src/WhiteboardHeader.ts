import {
  useType,
  useNewComponent,
  SystemFont,
  useDraw,
  Label,
  Geometry,
  Polygon,
  Vector,
} from "@hex-engine/2d";
import Draggable from "./Draggable";

export default function WhiteboardHeader() {
  useType(WhiteboardHeader);

  let text = "Your Head:";

  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 16, color: "black" })
  );

  const label = useNewComponent(() => Label({ text, font }));

  const verticalPadding = 4;

  const shape = Polygon.rectangle(label.size);
  const position = label.size
    .divide(2)
    .addY(font.measureText(label.text).baselineToAscentLine + verticalPadding);

  const geometry = useNewComponent(() => Geometry({ shape, position }));

  // useNewComponent(() => Draggable(geometry));

  useDraw((context) => {
    context.fillStyle = "black";
    label.draw(context);
  });

  return {
    font,
    label,
    verticalPadding,
  };
}
