/**
 * Represents a phase in the project estimation
 */
export interface Phase {
  id: string
  name: string
  hours: number
}

/**
 * Configuration settings for the calculator
 */
export interface CalculatorConfig {
  projectName: string
  hourlyRate: number
  exchangeRate: number
  profitMargin: number
}

/**
 * Calculated results for a phase
 */
export interface PhaseCalculation {
  phase: Phase
  costUSD: number
  costGuaranies: number
}

/**
 * Final calculation results
 */
export interface CalculationResults {
  phases: PhaseCalculation[]
  totalHours: number
  subtotalUSD: number
  subtotalGuaranies: number
  profitUSD: number
  profitGuaranies: number
  totalUSD: number
  totalGuaranies: number
}
