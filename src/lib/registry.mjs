/** Extract only literal manifest fields. Fail loudly if the pinned registry schema changes. */
export function parseRegistry(cpp) {
  const blocks = [...cpp.matchAll(/ModelManifest m;([\s\S]*?)builtins_\.push_back/g)];
  if (blocks.length !== 2)
    throw new Error('Expected the two audited built-in models; review new registry entries.');
  return blocks.map(([, text]) => {
    const string = (field) => {
      const value = text.match(new RegExp(`m\\.${field} = "([^"]+)"`))?.[1];
      if (!value) throw new Error(`Missing ${field}`);
      return value;
    };
    const number = (field) => {
      const value = text.match(new RegExp(`m\\.${field} = (\\d+)`))?.[1];
      if (!value) throw new Error(`Missing ${field}`);
      return Number(value);
    };
    return {
      name: string('name'),
      architecture: string('architecture'),
      quantization: string('quantization'),
      source: string('source'),
      layers: number('n_layers'),
      experts: number('n_routed_experts'),
      activeExperts: number('k_active_experts'),
      context: number('context_length'),
      vocab: number('vocab_size'),
      bytes: [...text.matchAll(/s\d\.size_bytes = (\d+)/g)].reduce((n, m) => n + Number(m[1]), 0),
    };
  });
}
