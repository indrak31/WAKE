/**
 * Domain Type Definitions for WAKE
 */

export type ReceiptType =
  | "music"
  | "movie"
  | "place"
  | "purchase"
  | "photo"
  | "message"
  | "search"
  | "event"
  | "note";

export interface ReceiptDetails {
  merchant?: string;
  items?: { name: string; price: number }[];
  total?: number;
  artist?: string;
  album?: string;
  albumArt?: string;
  audioUrl?: string;
  duration?: string;
  playCount?: number;
  sender?: string;
  isOutgoing?: boolean;
  address?: string;
  coords?: string;
  weather?: string;
  noteText?: string;
  query?: string;
  imageUrl?: string;
  ticketCount?: number;
  venue?: string;
  timeLabel?: string;
  sourceDataset?: string;
}

export interface Receipt {
  id: string;
  type: ReceiptType;
  title: string;
  subtitle?: string;
  timestamp: string;
  chapterId: string;
  linkedIds: string[];
  details?: ReceiptDetails;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  timeframe: string;
  arcLine: string;
  mood: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  isReflectionOnly?: boolean;
}

export interface RevealConnection {
  receiptAId: string;
  receiptBId: string;
  linkReason: string;
  discoveryOrder: number;
}
