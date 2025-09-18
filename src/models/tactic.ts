import { Position } from './player';

export interface Tactic {
  name: TacticList;
  formation: Position[];
}
export interface PositionReplacement {
  position: Position;
  replacements: { position: Position; penalty: number }[];
}

export enum TacticList {
  '3-4-3' = '3-4-3',
  '3-5-2' = '3-5-2',
  '4-2-3-1' = '4-2-3-1',
  '4-3-3' = '4-3-3',
  '4-3-3-Defensivo' = '4-3-3-Defensivo',
  '4-4-2' = '4-4-2',
  '4-4-2-Rombo' = '4-4-2-Rombo',
  '4-5-1' = '4-5-1',
  '4-5-1-Ofensivo' = '4-5-1-Ofensivo',
  '5-3-2' = '5-3-2',
  '5-4-1' = '5-4-1',
  '5-4-1-Ofensivo' = '5-4-1-Ofensivo',
}
