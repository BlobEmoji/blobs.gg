import { Guild } from "../types";
import { CSSObject } from "@emotion/styled";
import { MutableRefObject, ReactElement } from "react";

export interface EmojiProps {
  id: string;
  animated: boolean;
  name: string;
  guild: Guild;
  baseSize?: number;
  showGuild?: boolean;
  invite?: string;
  externalContainerStyle?: CSSObject;
  enlarge?: boolean;
  disableTooltip?: boolean;
}

export interface ConditionalLinkProps{
  link: string;
  wrapper: (children: ReactElement, ref: ((instance: (unknown | null)) => void) | MutableRefObject<unknown | null>) => ReactElement;
  children: ReactElement;
}
