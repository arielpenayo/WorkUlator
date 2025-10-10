import type { CalculatorConfig, Phase, CalculationResults, PhaseCalculation } from '@/types/calculator'

/**
 * Calculates the project cost based on phases and configuration
 * @param phases - Array of project phases with hours
 * @param config - Calculator configuration (rates and margin)
 * @returns Complete calculation results
 */
export function calculateProjectCost(
  phases: Phase[],
  config: CalculatorConfig
): CalculationResults {
  // Calculate costs for each phase
  const phaseCalculations: PhaseCalculation[] = phases.map((phase) => {
    const costUSD = phase.hours * config.hourlyRate
    const costGuaranies = costUSD * config.exchangeRate
    
    return {
      phase,
      costUSD,
      costGuaranies,
    }
  })

  // Calculate totals
  const totalHours = phases.reduce((sum, phase) => sum + phase.hours, 0)
  const subtotalUSD = phaseCalculations.reduce((sum, calc) => sum + calc.costUSD, 0)
  const subtotalGuaranies = phaseCalculations.reduce((sum, calc) => sum + calc.costGuaranies, 0)

  // Calculate profit
  const profitUSD = subtotalUSD * (config.profitMargin / 100)
  const profitGuaranies = profitUSD * config.exchangeRate

  // Calculate final totals
  const totalUSD = subtotalUSD + profitUSD
  const totalGuaranies = subtotalGuaranies + profitGuaranies

  return {
    phases: phaseCalculations,
    totalHours,
    subtotalUSD,
    subtotalGuaranies,
    profitUSD,
    profitGuaranies,
    totalUSD,
    totalGuaranies,
  }
}
