import { transliterate } from "./transliterate.ts"
if (import.meta.main) {
  let buffer = '';
  const decoder = new TextDecoder();
  for await (const chunk of Deno.stdin.readable) {
    const text = decoder.decode(chunk);
    buffer += text;

    Deno.stdout.write(new TextEncoder().encode(transliterate(buffer)));
    // console.log(' ' + text)
  }
  // console.log(transliterate(buffer));
}
