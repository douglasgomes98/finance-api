import { NormalizeName } from '@/data/protocols/formatters/normalize-name';

export class FormatterAdapter implements NormalizeName {
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
