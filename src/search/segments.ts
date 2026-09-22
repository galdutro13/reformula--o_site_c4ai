import type { Block } from '../content/model';

export interface SearchSegment {
  format: 'html' | 'text';
  value: string;
}
export interface SearchItem {
  title: string;
  path: string;
  segments: SearchSegment[];
}

// The resolver keeps collection access on the build side, outside client code.
export async function searchSegments(
  blocks: Block[],
  resolveChallenge: (ref: string) => Promise<Block[]>,
): Promise<SearchSegment[]> {
  const segments = await Promise.all(
    blocks.map(async (block): Promise<SearchSegment[]> => {
      switch (block.type) {
        case 'html':
          return [{ format: 'html', value: block.html }];
        case 'heading':
          return [{ format: 'text', value: block.text }];
        case 'image':
          return block.alt ? [{ format: 'text', value: block.alt }] : [];
        case 'embed':
          return [{ format: 'text', value: block.label }];
        case 'details':
          return [
            { format: 'text', value: block.label },
            ...(await searchSegments(block.children, resolveChallenge)),
          ];
        case 'group':
          return searchSegments(block.children, resolveChallenge);
        case 'challenge':
          return searchSegments(
            await resolveChallenge(block.ref),
            resolveChallenge,
          );
      }
    }),
  );
  return segments.flat();
}
