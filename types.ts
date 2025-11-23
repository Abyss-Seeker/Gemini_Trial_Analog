export enum HorrorTheme {
  NUCLEAR = 'NUCLEAR',
  CASSETTE = 'CASSETTE',
  PUNK = 'PUNK'
}

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  year: string;
  threatLevel: string; // e.g., "Critical", "Low", "Unknown"
}

export interface GeneratedLore {
  description: string;
  containmentProtocol: string;
}
