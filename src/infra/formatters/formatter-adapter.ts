import { NormalizeNameProtocol } from '@/data/protocols/formatters/normalize-name-protocol';

export class FormatterAdapter implements NormalizeNameProtocol {
  normalizeName(name: string | null | undefined): string {
    if (name) {
      const currentName = name.toLowerCase();

      return currentName
        .split(' ')
        .map(srt => srt.charAt(0).toUpperCase() + srt.slice(1))
        .join(' ');
    }

    return '';
  }
}
