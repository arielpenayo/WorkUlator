import jsPDF from 'jspdf'
import type { CalculationResults, CalculatorConfig } from '@/types/calculator'
import { formatUSD, formatGuaranies } from '@/lib/utils'

/**
 * Generates and downloads a PDF quote with the calculation results
 * @param results - The calculation results to include in the PDF
 * @param config - The calculator configuration used
 */
export function generatePDF(results: CalculationResults, config: CalculatorConfig): void {
  const doc = new jsPDF()
  
  // Set document properties
  doc.setProperties({
    title: 'WorkUlator - Project Quote',
    subject: 'Software Project Cost Estimation',
    author: 'WorkUlator',
    creator: 'WorkUlator App'
  })

  let yPosition = 20

  // Header
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('WorkUlator', 105, yPosition, { align: 'center' })
  
  yPosition += 10
  doc.setFontSize(16)
  doc.text('Project Cost Estimation', 105, yPosition, { align: 'center' })
  
  yPosition += 15
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, yPosition, { align: 'center' })

  // Configuration section
  yPosition += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Configuration', 20, yPosition)
  
  yPosition += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Hourly Rate: ${formatUSD(config.hourlyRate)}`, 20, yPosition)
  
  yPosition += 6
  doc.text(`Exchange Rate: ${formatGuaranies(config.exchangeRate)} per USD`, 20, yPosition)
  
  yPosition += 6
  doc.text(`Profit Margin: ${config.profitMargin}%`, 20, yPosition)

  // Phases section
  yPosition += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Project Phases', 20, yPosition)

  yPosition += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Phase', 20, yPosition)
  doc.text('Hours', 100, yPosition)
  doc.text('Cost (USD)', 130, yPosition)
  doc.text('Cost (Gs)', 170, yPosition)

  yPosition += 2
  doc.line(20, yPosition, 200, yPosition)

  yPosition += 6
  doc.setFont('helvetica', 'normal')

  results.phases.forEach((phaseCalc) => {
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 20
    }
    
    doc.text(phaseCalc.phase.name, 20, yPosition)
    doc.text(phaseCalc.phase.hours.toString(), 100, yPosition)
    doc.text(formatUSD(phaseCalc.costUSD), 130, yPosition)
    doc.text(formatGuaranies(phaseCalc.costGuaranies), 170, yPosition)
    yPosition += 6
  })

  // Totals section
  yPosition += 10
  doc.line(20, yPosition, 200, yPosition)
  yPosition += 8

  doc.setFont('helvetica', 'bold')
  doc.text('Total Hours:', 20, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(results.totalHours.toString(), 100, yPosition)

  yPosition += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Subtotal:', 20, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(formatUSD(results.subtotalUSD), 130, yPosition)
  doc.text(formatGuaranies(results.subtotalGuaranies), 170, yPosition)

  yPosition += 6
  doc.setFont('helvetica', 'bold')
  doc.text(`Profit (${config.profitMargin}%):`, 20, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(formatUSD(results.profitUSD), 130, yPosition)
  doc.text(formatGuaranies(results.profitGuaranies), 170, yPosition)

  yPosition += 2
  doc.line(20, yPosition, 200, yPosition)
  yPosition += 8

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL:', 20, yPosition)
  doc.text(formatUSD(results.totalUSD), 130, yPosition)
  doc.text(formatGuaranies(results.totalGuaranies), 170, yPosition)

  // Save the PDF
  const fileName = `workulator-quote-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
