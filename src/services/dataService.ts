/**
 * Data access layer.
 *
 * Phase 1: returns static data from src/data.
 * Phase 2: swap these implementations for `fetch(`${API_URL}/...`)` calls to the FastAPI backend –
 * components only depend on these function signatures, so the UI does not need to change.
 */
import { village, landmarks, type VillageProfile, type Landmark } from '../data/village'
import { manifestoItems, type ManifestoItem } from '../data/manifesto'
import { longTermMilestones, roadmapPhases } from '../data/roadmap'

export const dataService = {
  getVillage: async (): Promise<VillageProfile> => village,
  getLandmarks: async (): Promise<Landmark[]> => landmarks,
  getManifesto: async (): Promise<ManifestoItem[]> => manifestoItems,
  getRoadmap: async () => ({ phases: roadmapPhases, milestones: longTermMilestones }),
}
