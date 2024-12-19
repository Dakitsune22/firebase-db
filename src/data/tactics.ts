import { Tactic, PositionReplacement } from 'src/models';
import { Position } from 'src/models/player';
import { TacticList } from 'src/models/tactic';

export const tactics: Tactic[] = [
  {
    name: TacticList['3-4-3'],
    formation: [
      Position.POR,
      Position.DF,
      Position.DF,
      Position.DF,
      Position.MCD,
      Position.MC,
      Position.MC,
      Position.MCO,
      Position.ED,
      Position.DC,
      Position.EI,
    ],
  },
  {
    name: TacticList['3-5-2'],
    formation: [
      Position.POR,
      Position.DF,
      Position.DF,
      Position.DF,
      Position.MCD,
      Position.MC,
      Position.MC,
      Position.MC,
      Position.MCO,
      Position.DC,
      Position.DC,
    ],
  },
  {
    name: TacticList['4-2-3-1'],
    formation: [
      Position.POR,
      Position.LD,
      Position.DF,
      Position.DF,
      Position.LI,
      Position.MC,
      Position.MC,
      Position.ED,
      Position.MCO,
      Position.EI,
      Position.DC,
    ],
  },
  {
    name: TacticList['4-3-3'],
    formation: [
      Position.POR,
      Position.LD,
      Position.DF,
      Position.DF,
      Position.LI,
      Position.MC,
      Position.MC,
      Position.MC,
      Position.ED,
      Position.DC,
      Position.EI,
    ],
  },
  {
    name: TacticList['4-4-2'],
    formation: [
      Position.POR,
      Position.LD,
      Position.DF,
      Position.DF,
      Position.LI,
      Position.MCD,
      Position.MC,
      Position.MC,
      Position.MCO,
      Position.DC,
      Position.DC,
    ],
  },
  {
    name: TacticList['4-5-1'],
    formation: [
      Position.POR,
      Position.LD,
      Position.DF,
      Position.DF,
      Position.LI,
      Position.MCD,
      Position.MC,
      Position.MC,
      Position.MC,
      Position.MCO,
      Position.DC,
    ],
  },
  {
    name: TacticList['5-3-2'],
    formation: [
      Position.POR,
      Position.LD,
      Position.DF,
      Position.DF,
      Position.DF,
      Position.LI,
      Position.MC,
      Position.MC,
      Position.MC,
      Position.DC,
      Position.DC,
    ],
  },
  {
    name: TacticList['5-4-1'],
    formation: [
      Position.POR,
      Position.LD,
      Position.DF,
      Position.DF,
      Position.DF,
      Position.LI,
      Position.MCD,
      Position.MC,
      Position.MC,
      Position.MCO,
      Position.DC,
    ],
  },
];

export const positionReplacements: PositionReplacement[] = [
  {
    position: Position.POR,
    replacements: [],
  },
  {
    position: Position.DF,
    replacements: [
      { position: Position.MCD, penalty: 8 },
      { position: Position.LD, penalty: 10 },
      { position: Position.LI, penalty: 10 },
    ],
  },
  {
    position: Position.LD,
    replacements: [
      { position: Position.LI, penalty: 3 },
      { position: Position.DF, penalty: 5 },
    ],
  },
  {
    position: Position.LI,
    replacements: [
      { position: Position.LD, penalty: 3 },
      { position: Position.DF, penalty: 5 },
    ],
  },
  {
    position: Position.MCD,
    replacements: [{ position: Position.MC, penalty: 3 }],
  },
  {
    position: Position.MC,
    replacements: [
      { position: Position.MCD, penalty: 3 },
      { position: Position.MCO, penalty: 3 },
      { position: Position.ED, penalty: 6 },
      { position: Position.EI, penalty: 6 },
    ],
  },
  {
    position: Position.MCO,
    replacements: [
      { position: Position.MC, penalty: 5 },
      { position: Position.ED, penalty: 5 },
      { position: Position.EI, penalty: 5 },
    ],
  },
  {
    position: Position.ED,
    replacements: [
      { position: Position.EI, penalty: 2 },
      { position: Position.MCO, penalty: 3 },
    ],
  },
  {
    position: Position.EI,
    replacements: [
      { position: Position.ED, penalty: 2 },
      { position: Position.MCO, penalty: 3 },
    ],
  },
  {
    position: Position.DC,
    replacements: [
      { position: Position.ED, penalty: 8 },
      { position: Position.EI, penalty: 8 },
      { position: Position.MCO, penalty: 10 },
    ],
  },
];
