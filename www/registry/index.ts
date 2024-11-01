import { lib } from "@/registry/registry-lib"
import { ui } from "@/registry/registry-ui"
import type { Registry } from "@/registry/schema"

export const registry: Registry = [...ui, ...lib]
