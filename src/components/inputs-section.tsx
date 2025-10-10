import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Phase, CalculatorConfig } from '@/types/calculator'

interface InputsSectionProps {
  config: CalculatorConfig
  phases: Phase[]
  onConfigChange: (config: CalculatorConfig) => void
  onPhasesChange: (phases: Phase[]) => void
}

export function InputsSection({ config, phases, onConfigChange, onPhasesChange }: InputsSectionProps) {

  const handleAddPhase = () => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      name: `Phase ${phases.length + 1}`,
      hours: 0,
    }
    onPhasesChange([...phases, newPhase])
  }

  const handleRemovePhase = (id: string) => {
    onPhasesChange(phases.filter((phase) => phase.id !== id))
  }

  const handlePhaseChange = (id: string, field: keyof Phase, value: string | number) => {
    onPhasesChange(
      phases.map((phase) =>
        phase.id === id ? { ...phase, [field]: value } : phase
      )
    )
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all phases?')) {
      onPhasesChange([])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Configuration</CardTitle>
        <CardDescription>
          Set your rates and add project phases with estimated hours
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Configuration Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="hourlyRate" className="text-sm font-medium">
              Hourly Rate (USD)
            </label>
            <Input
              id="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              value={config.hourlyRate}
              onChange={(e) =>
                onConfigChange({ ...config, hourlyRate: parseFloat(e.target.value) || 0 })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="exchangeRate" className="text-sm font-medium">
              Exchange Rate (Gs per USD)
            </label>
            <Input
              id="exchangeRate"
              type="number"
              min="0"
              step="1"
              value={config.exchangeRate}
              onChange={(e) =>
                onConfigChange({ ...config, exchangeRate: parseFloat(e.target.value) || 0 })
              }
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="profitMargin" className="text-sm font-medium">
              Profit Margin (%)
            </label>
            <Input
              id="profitMargin"
              type="number"
              min="0"
              max="100"
              step="1"
              value={config.profitMargin}
              onChange={(e) =>
                onConfigChange({ ...config, profitMargin: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
        </div>

        {/* Phases Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Project Phases</h3>
            <div className="flex gap-2">
              <Button onClick={handleAddPhase} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Phase
              </Button>
              {phases.length > 0 && (
                <Button onClick={handleReset} variant="outline" size="sm">
                  Reset
                </Button>
              )}
            </div>
          </div>

          {phases.length > 0 ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Phase Name</TableHead>
                    <TableHead className="w-[35%]">Estimated Hours</TableHead>
                    <TableHead className="w-[15%] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phases.map((phase) => (
                    <TableRow key={phase.id}>
                      <TableCell>
                        <Input
                          value={phase.name}
                          onChange={(e) =>
                            handlePhaseChange(phase.id, 'name', e.target.value)
                          }
                          className="border-0 focus-visible:ring-1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={phase.hours}
                          onChange={(e) =>
                            handlePhaseChange(
                              phase.id,
                              'hours',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="border-0 focus-visible:ring-1"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemovePhase(phase.id)}
                          className="h-8 w-8"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg border-dashed">
              <p className="text-muted-foreground text-sm">
                No phases added yet. Click "Add Phase" to get started.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
