import { transliterate } from "./transliterate.ts"
import { Ollama } from "npm:ollama"

const ollama = new Ollama()

async function capitalize(source: string, transliteration: string): Promise<string> {
  //return transliteration.replace(/(^|\p{P}&&[^-]|\s+)(ʾ?)(\p{L})/gu, (_, c, a, b) => c + a + b.toUpperCase());
  return transliteration.replace(/(^)(ʾ?)(\p{L})/gu, (_, c, a, b) => c + a + b.toUpperCase());
}

if (import.meta.main) {
  let buffer = '';
  const decoder = new TextDecoder();
  for await (const chunk of Deno.stdin.readable) {
    const text = decoder.decode(chunk);
    buffer += text;
  }

  const lines = buffer.split('\n');
  for (const source of lines) {
    const transliteration = transliterate(source);
    const sanitized = await capitalize(source, transliteration);
    console.log(sanitized);
  }
}
