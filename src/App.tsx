import { useEffect, useState } from 'react'
import { Calculator } from 'lucide-react'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import { InputsSection } from '@/components/inputs-section'
import { ResultsSection } from '@/components/results-section'
import type { Phase, CalculatorConfig, CalculationResults } from '@/types/calculator'
import { calculateProjectCost } from '@/lib/calculator'

const STORAGE_KEY = 'workulator-config'

// Default configuration
const defaultConfig: CalculatorConfig = {
  hourlyRate: 17,
  exchangeRate: 7010,
  profitMargin: 15,
}

function App() {
  const [config, setConfig] = useState<CalculatorConfig>(defaultConfig)
  const [phases, setPhases] = useState<Phase[]>([])
  const [results, setResults] = useState<CalculationResults | null>(null)

  // Load saved configuration on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.config) setConfig(parsed.config)
        if (parsed.phases) setPhases(parsed.phases)
      } catch (error) {
        console.error('Failed to load saved configuration:', error)
      }
    }
  }, [])

  // Recalculate results whenever config or phases change
  useEffect(() => {
    if (phases.length > 0) {
      const calculatedResults = calculateProjectCost(phases, config)
      setResults(calculatedResults)
    } else {
      setResults(null)
    }
  }, [config, phases])

  const handleSaveConfiguration = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          config,
          phases,
        })
      )
      alert('Configuration saved successfully!')
    } catch (error) {
      console.error('Failed to save configuration:', error)
      alert('Failed to save configuration')
    }
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="workulator-ui-theme">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">WorkUlator</h1>
                <p className="text-sm text-muted-foreground">
                  Software Project Cost Estimator
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Inputs Section */}
            <InputsSection
              config={config}
              phases={phases}
              onConfigChange={setConfig}
              onPhasesChange={setPhases}
            />

            {/* Results Section */}
            <ResultsSection
              results={results}
              config={config}
              onSaveConfiguration={handleSaveConfiguration}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
            <p>
              WorkUlator - Created with Vite, React, TypeScript, TailwindCSS & shadcn/ui
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
