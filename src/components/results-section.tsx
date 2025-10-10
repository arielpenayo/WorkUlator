import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Download, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { CalculationResults, CalculatorConfig } from '@/types/calculator'
import { formatUSD, formatGuaranies } from '@/lib/utils'
import { generatePDF } from '@/lib/pdf-generator'

interface ResultsSectionProps {
  results: CalculationResults | null
  config: CalculatorConfig
  onSaveConfiguration: () => void
}

export function ResultsSection({ results, config, onSaveConfiguration }: ResultsSectionProps) {
  if (!results || results.phases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>
            Add phases and hours to see cost calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">
              Your calculation results will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Prepare chart data
  const chartData = results.phases.map((phaseCalc) => ({
    name: phaseCalc.phase.name,
    USD: phaseCalc.costUSD,
    Guaranies: phaseCalc.costGuaranies / 1000000, // Convert to millions for readability
  }))

  const handleDownloadPDF = () => {
    generatePDF(results, config)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{results.totalHours}h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Subtotal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatUSD(results.subtotalUSD)}</div>
            <div className="text-sm text-muted-foreground">
              {formatGuaranies(results.subtotalGuaranies)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Profit ({config.profitMargin}%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{formatUSD(results.profitUSD)}</div>
            <div className="text-sm text-muted-foreground">
              {formatGuaranies(results.profitGuaranies)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader className="pb-3">
            <CardDescription>Final Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">{formatUSD(results.totalUSD)}</div>
            <div className="text-sm text-muted-foreground">
              {formatGuaranies(results.totalGuaranies)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Distribution by Phase</CardTitle>
          <CardDescription>
            Visual breakdown of costs per project phase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'USD') {
                    return formatUSD(value)
                  }
                  return `${value.toFixed(2)}M Gs`
                }}
              />
              <Legend />
              <Bar dataKey="USD" fill="hsl(var(--primary))" name="Cost (USD)" />
              <Bar dataKey="Guaranies" fill="hsl(var(--chart-2))" name="Cost (Millions Gs)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleDownloadPDF} size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download as PDF
            </Button>
            <Button onClick={onSaveConfiguration} variant="outline" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
