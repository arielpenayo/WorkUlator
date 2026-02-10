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
  
  const projectName = config.projectName || 'WorkUlator'
  
  // Set document properties
  doc.setProperties({
    title: `${projectName} - Cotización de Proyecto`,
    subject: 'Estimación de Costos de Proyecto de Software',
    author: projectName,
    creator: 'WorkUlator App'
  })

  let yPosition = 20

  // Header
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(projectName, 105, yPosition, { align: 'center' })
  
  yPosition += 10
  doc.setFontSize(16)
  doc.text('Estimación de Costos del Proyecto', 105, yPosition, { align: 'center' })
  
  yPosition += 15
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 105, yPosition, { align: 'center' })

  // Configuration section
  yPosition += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Configuración', 20, yPosition)
  
  yPosition += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Tarifa por hora: ${formatUSD(config.hourlyRate)}`, 20, yPosition)
  
  yPosition += 6
  doc.text(`Tipo de cambio: ${formatGuaranies(config.exchangeRate)} por USD`, 20, yPosition)
  

  // Phases section
  yPosition += 15
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Fases del Proyecto', 20, yPosition)

  yPosition += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Fase', 20, yPosition)
  doc.text('Horas', 100, yPosition)
  doc.text('Costo (USD)', 130, yPosition)
  doc.text('Costo (Gs)', 170, yPosition)

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
  doc.text('Horas totales:', 20, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(results.totalHours.toString(), 100, yPosition)

  yPosition += 8
  doc.setFont('helvetica', 'bold')
  doc.text('Subtotal:', 20, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(formatUSD(results.subtotalUSD), 130, yPosition)
  doc.text(formatGuaranies(results.subtotalGuaranies), 170, yPosition)

  yPosition += 2
  doc.line(20, yPosition, 200, yPosition)
  yPosition += 8

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL:', 20, yPosition)
  doc.text(formatUSD(results.totalUSD), 130, yPosition)
  doc.text(formatGuaranies(results.totalGuaranies), 170, yPosition)

  // Save the PDF
  const sanitizedProjectName = projectName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const fileName = `${sanitizedProjectName}-cotizacion-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
