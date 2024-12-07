import { Day, DosageUnit } from "../enum";

export interface Medication {
  id?: string;
  name: string;
  dosage: number;
  unit: DosageUnit;
  days?: Day[];
  times?: string[];
  lastUpdated?: Date;
}