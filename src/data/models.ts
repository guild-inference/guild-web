import snapshot from './generated/sources.json';
import hub from './hub-evidence.json';
import { parseRegistry } from '../lib/registry.mjs';
const registry = parseRegistry(
  snapshot.documents.find((d) => d.path === 'src/models/registry.cpp')!.markdown,
);
export type ModelStage = 'Supported' | 'Experimental' | 'Planned' | 'Research';
interface Entry {
  id: string;
  name: string;
  stage: ModelStage;
  summary: string;
  architecture: string;
  parameters: string;
  activeParameters: string;
  registry?: (typeof registry)[number];
  upstream?: string;
  availability: string;
  memory: string;
  notes: string[];
}
export const models: Entry[] = [
  {
    id: 'qwen3-8-flash-next',
    name: 'Qwen3.8-Flash-Next',
    stage: 'Supported',
    architecture: 'qwen4exp',
    parameters: `${(hub.qwen.ggufTotalParameters / 1e9).toFixed(2)}B stored parameters (Hub GGUF metadata)`,
    activeParameters: 'Not verified in the available metadata',
    registry: registry[0],
    upstream: `https://huggingface.co/${hub.qwen.repository}/tree/${hub.qwen.revision}`,
    availability:
      'Public upstream repository verified on 2026-10-22. Guild registry selects UD-IQ4_XS; other Hub quantizations are not automatically validated in Guild.',
    memory:
      'Phase 6, 4,096 populated prompt / 32,768 capacity, host-only FP16 KV: 7,310 MiB sampled VRAM on GTX 1070. This is an observed configuration, not a minimum requirement.',
    summary:
      'Guild’s primary development target. Hybrid recurrent and attention execution with routed experts, per-layer embeddings, and an optional MTP draft path.',
    notes: [
      'Hub GGUF parameter totals describe stored tensors, not per-token active computation. Do not equate them to marketing model sizes.',
      'Guild registry geometry: 48 layers, 512 routed experts, 10 selected per layer.',
      'Registry context metadata is 262,144 tokens; runtime limits and usable context depend on the runner, memory, and configuration.',
      'The Hub lists multimodal assets; this catalog does not claim Guild vision or video support.',
    ],
  },
  {
    id: 'ornith-1-5-35b',
    name: 'Ornith 1.5 35B',
    stage: 'Experimental',
    architecture: 'qwen35moe',
    parameters: '35B nominal model name; upstream count not independently verified',
    activeParameters: 'Not verified; 8 of 256 routed experts per layer',
    registry: registry[1],
    availability:
      'The upstream repository named in the registry could not be found on 2026-10-22. Use an existing lawful local model artifact; download availability is unverified.',
    memory:
      'Phase 6, 4,096 populated prompt / 32,768 capacity, host-only FP16 KV: 2,662 MiB sampled VRAM on GTX 1070. This is an observed configuration, not a minimum requirement.',
    summary:
      'A registered and benchmarked hybrid MoE model. Guild’s README classifies the Qwen3.5 MoE / Ornith execution path as experimental and under active development.',
    notes: [
      'Registry quantization: Q4_K_M. Phase 6/6.5/6.6 reports include actual model runs.',
      'The benchmark artifact has no MTP weights; lookup and session-local retrieval do not need a draft model.',
      'Although registry metadata says 262,144 context tokens, the documented dense-attention limit is 32,768 total in the Phase 6 benchmark configuration.',
      'No current upstream download is presented as verified.',
    ],
  },
  ...['GLM', 'DeepSeek', 'Mixtral'].map((name) => ({
    id: name.toLowerCase(),
    name: `${name}-style MoE`,
    stage: 'Planned' as const,
    architecture: `${name.toLowerCase()} archetype`,
    parameters: 'Model-dependent; no checkpoint selected',
    activeParameters: 'Not specified',
    availability: 'No downloadable Guild model entry. Architecture roadmap only.',
    memory: 'No validated runtime memory requirement.',
    summary:
      'Metadata inspection and planning descriptors exist. The pinned README lists execution support as planned; an archetype descriptor is not a complete inference runner.',
    notes: [
      'No end-to-end runtime compatibility is claimed.',
      'Refer to MODEL_RUNNERS.md and src/model/archetype.cpp for the boundary between metadata descriptions and execution.',
    ],
  })),
  {
    id: 'eon',
    name: 'Eon',
    stage: 'Research',
    architecture: 'Proposed family; architecture not finalized',
    parameters: 'Not specified',
    activeParameters: 'Not specified',
    availability: 'No released checkpoints. Research grant decision pending.',
    memory: 'Not specified; no model artifact exists to measure.',
    summary:
      'Guild Labs’ proposed model family. Research interests include efficient language models, sparse MoE architectures, and ternary representations.',
    notes: [
      'Scale, quantization, architecture, and release dates have not been finalized.',
      'No performance, memory-fit, or model quality claims are made.',
    ],
  },
];
