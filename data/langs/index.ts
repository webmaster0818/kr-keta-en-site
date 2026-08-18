import type { LangContent } from "./_schema";
import { zhTw } from "./zh-tw";

/**
 * 言語ディレクトリの登録簿。
 * ⚠️ 英語はルート（/）で配信しているのでここには入れない。
 * ⚠️ 台湾（繁体字）は K-ETA の一時免除対象。「今は不要・2027年から要る」が主役。
 */
export const LANGS: Record<string, LangContent> = { "zh-tw": zhTw };
export const LANG_CODES = Object.keys(LANGS);
export type { LangContent };
