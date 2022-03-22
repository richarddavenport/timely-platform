import { writableQs } from "./writableQs";

interface TestingState {
    vehicleAge: number;
    vehicleMileage: number;
    vehicleClass: string;
    deductibles: string[];
    coverageMiles: string[];
    coverageMonths: string[];
}

export const testingStore = writableQs("testing", {} as TestingState);
