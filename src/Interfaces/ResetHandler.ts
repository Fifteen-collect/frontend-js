import * as React from "react";

export default interface ResetHandler {
    (event: React.MouseEvent<Element, MouseEvent>): void,
}
