import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
  SystemFont,
  useDraw,
} from "@hex-engine/2d";
import Whiteboard from "./Whiteboard";
import WhiteboardHeader from "./WhiteboardHeader";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 2 });

  const ui = useChild(() => {
    const whiteboardHeader = useChild(WhiteboardHeader);
    const headerHeight =
      whiteboardHeader.rootComponent.label.size.y +
      whiteboardHeader.rootComponent.verticalPadding;

    const whiteboardSize = new Vector(200, 200);

    const whiteboard = useChild(() => Whiteboard(whiteboardSize));
    whiteboard.rootComponent.geometry.position.mutateInto(
      whiteboardSize.divide(2).addY(headerHeight)
    );

    return { whiteboardHeader, whiteboard };
  });
}
