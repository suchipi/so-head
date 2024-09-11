import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
} from "@hex-engine/2d";
import Whiteboard from "./Whiteboard";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 3 });

  const whiteboardSize = new Vector(200, 200);
  const whiteboard = useChild(() => Whiteboard(whiteboardSize));
  whiteboard.rootComponent.geometry.position.mutateInto(
    whiteboardSize.divide(2)
  );
}
