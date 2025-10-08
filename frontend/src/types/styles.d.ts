import "styled-components";

import type { ColorMapToken } from "antd/es/theme/interface";

declare module "styled-components" {
  export interface DefaultTheme extends Partial<ColorMapToken> {}
}
