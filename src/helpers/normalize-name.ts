export function normalizeName(name: string | undefined | null) {
  if (name) {
    const currentName = name.toLowerCase();

    return currentName
      .split(" ")
      .map((srt) => srt.charAt(0).toUpperCase() + srt.slice(1))
      .join(" ");
  }

  return "";
}
