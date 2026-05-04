import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Generate timestamp with date and time
const getTimestamp = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
  return `${date}_${time}`;
};

// Export to CSV
export const exportToCSV = (data, filename = 'export.csv') => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values with commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export to Excel
export const exportToExcel = (data, filename = 'export.xlsx', sheetName = 'Sheet1') => {
  // Create workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Auto-size columns
  const maxWidth = 50;
  const colWidths = Object.keys(data[0]).map(key => {
    const maxLength = Math.max(
      key.length,
      ...data.map(row => String(row[key] || '').length)
    );
    return { wch: Math.min(maxLength + 2, maxWidth) };
  });
  worksheet['!cols'] = colWidths;

  // Write file
  XLSX.writeFile(workbook, filename);
};

// Export to PDF
export const exportToPDF = (data, filename = 'export.pdf', title = 'Report') => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 20);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

  // Prepare table data
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => String(row[header] || '')));

  // Add table using autoTable
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 40,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: { top: 40 },
  });

  // Save PDF
  doc.save(filename);
};

// Export Dashboard Summary to CSV
export const exportDashboardSummaryToCSV = (summaryData) => {
  const data = summaryData.map(item => ({
    'Metric': item.title,
    'Value': item.value,
    'Change': item.change
  }));
  
  const timestamp = getTimestamp();
  exportToCSV(data, `dashboard-summary-${timestamp}.csv`);
};

// Export Dashboard Summary to Excel
export const exportDashboardSummaryToExcel = (summaryData) => {
  const data = summaryData.map(item => ({
    'Metric': item.title,
    'Value': item.value,
    'Change': item.change
  }));
  
  const timestamp = getTimestamp();
  exportToExcel(data, `dashboard-summary-${timestamp}.xlsx`, 'Summary');
};

// Export Dashboard Summary to PDF
export const exportDashboardSummaryToPDF = (summaryData) => {
  const data = summaryData.map(item => ({
    'Metric': item.title,
    'Value': item.value,
    'Change': item.change
  }));
  
  const timestamp = getTimestamp();
  exportToPDF(data, `dashboard-summary-${timestamp}.pdf`, "Today's Sales Summary");
};

// Export Full Dashboard Data
export const exportFullDashboard = (dashboardData, format = 'excel') => {
  const timestamp = getTimestamp();
  
  if (format === 'excel') {
    const workbook = XLSX.utils.book_new();
    
    // Summary Sheet
    const summaryData = dashboardData.summary.map(item => ({
      'Metric': item.title,
      'Value': item.value,
      'Change': item.change
    }));
    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
    
    // Visitors Sheet
    const visitorsSheet = XLSX.utils.json_to_sheet(dashboardData.visitors);
    XLSX.utils.book_append_sheet(workbook, visitorsSheet, 'Visitors');
    
    // Revenue Sheet
    const revenueSheet = XLSX.utils.json_to_sheet(dashboardData.revenue);
    XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Revenue');

    // Satisfaction Sheet
    const satisfactionSheet = XLSX.utils.json_to_sheet(dashboardData.satisfaction);
    XLSX.utils.book_append_sheet(workbook, satisfactionSheet, 'Satisfaction');

    // Target vs Reality Sheet
    const targetSheet = XLSX.utils.json_to_sheet(dashboardData.targetReality);
    XLSX.utils.book_append_sheet(workbook, targetSheet, 'Target vs Reality');
    
    // Top Products Sheet
    const productsSheet = XLSX.utils.json_to_sheet(dashboardData.topProducts);
    XLSX.utils.book_append_sheet(workbook, productsSheet, 'Top Products');
    
    // Sales by Country Sheet
    const salesSheet = XLSX.utils.json_to_sheet(dashboardData.salesByCountry);
    XLSX.utils.book_append_sheet(workbook, salesSheet, 'Sales by Country');

    // Volume vs Service Sheet
    const volumeSheet = XLSX.utils.json_to_sheet(dashboardData.volumeService);
    XLSX.utils.book_append_sheet(workbook, volumeSheet, 'Volume vs Service');
    
    XLSX.writeFile(workbook, `full-dashboard-${timestamp}.xlsx`);
  } else if (format === 'pdf') {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Full Dashboard Report', 14, yPosition);
    yPosition += 10;
    
    // Timestamp
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPosition);
    yPosition += 15;
    
    // ===== Summary Section =====
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Today's Sales Summary", 14, yPosition);
    yPosition += 5;
    
    const summaryData = dashboardData.summary.map(item => [
      item.title,
      item.value,
      item.change
    ]);
    
    autoTable(doc, {
      head: [['Metric', 'Value', 'Change']],
      body: summaryData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 9 },
    });
    
    // ===== Visitors Insights Section =====
    doc.addPage();
    yPosition = 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Visitor Insights', 14, yPosition);
    yPosition += 5;
    
    const visitorsData = dashboardData.visitors.map(item => [
      item.name,
      item.loyal,
      item.new,
      item.unique
    ]);
    
    autoTable(doc, {
      head: [['Month', 'Loyal', 'New', 'Unique']],
      body: visitorsData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] },
      styles: { fontSize: 9 },
    });
    
    // ===== Revenue Section =====
    yPosition = doc.lastAutoTable.finalY + 15;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Revenue', 14, yPosition);
    yPosition += 5;
    
    const revenueData = dashboardData.revenue.map(item => [
      item.month,
      `$${item.online}`,
      `$${item.offline}`,
      `$${item.total}`
    ]);
    
    autoTable(doc, {
      head: [['Month', 'Online', 'Offline', 'Total']],
      body: revenueData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 9 },
    });
    
    // ===== Customer Satisfaction Section =====
    doc.addPage();
    yPosition = 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Satisfaction', 14, yPosition);
    yPosition += 5;
    
    const satisfactionData = dashboardData.satisfaction.map(item => [
      item.month,
      item.lastMonth,
      item.thisMonth
    ]);
    
    autoTable(doc, {
      head: [['Month', 'Last Month', 'This Month']],
      body: satisfactionData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      styles: { fontSize: 9 },
    });
    
    // ===== Target vs Reality Section =====
    yPosition = doc.lastAutoTable.finalY + 15;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Target vs Reality', 14, yPosition);
    yPosition += 5;
    
    const targetRealityData = dashboardData.targetReality.map(item => [
      item.month,
      item.reality,
      item.target
    ]);
    
    autoTable(doc, {
      head: [['Month', 'Reality', 'Target']],
      body: targetRealityData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      styles: { fontSize: 9 },
    });
    
    // ===== Top Products Section =====
    doc.addPage();
    yPosition = 20;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Top Products', 14, yPosition);
    yPosition += 5;
    
    const productsData = dashboardData.topProducts.map(item => [
      item.id,
      item.name,
      `${item.popularity}%`,
      `${item.sales}%`
    ]);
    
    autoTable(doc, {
      head: [['#', 'Product Name', 'Popularity', 'Sales']],
      body: productsData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 9 },
    });
    
    // ===== Sales by Country Section =====
    yPosition = doc.lastAutoTable.finalY + 15;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Sales by Country', 14, yPosition);
    yPosition += 5;
    
    const salesByCountryData = dashboardData.salesByCountry.map(item => [
      item.country,
      `$${item.sales.toLocaleString()}`,
      `${item.percentage}%`
    ]);
    
    autoTable(doc, {
      head: [['Country', 'Sales', 'Percentage']],
      body: salesByCountryData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [245, 158, 11] },
      styles: { fontSize: 9 },
    });
    
    // ===== Volume vs Service Section =====
    yPosition = doc.lastAutoTable.finalY + 15;
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Volume vs Service Level', 14, yPosition);
    yPosition += 5;
    
    const volumeServiceData = dashboardData.volumeService.map(item => [
      item.month,
      item.volume,
      item.service
    ]);
    
    autoTable(doc, {
      head: [['Month', 'Volume', 'Service']],
      body: volumeServiceData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] },
      styles: { fontSize: 9 },
    });
    
    doc.save(`full-dashboard-${timestamp}.pdf`);
  } else if (format === 'csv') {
    // For CSV, create a comprehensive text file with all sections
    let csvContent = '';
    
    // Summary Section
    csvContent += "TODAY'S SALES SUMMARY\n";
    csvContent += 'Metric,Value,Change\n';
    dashboardData.summary.forEach(item => {
      csvContent += `${item.title},${item.value},${item.change}\n`;
    });
    csvContent += '\n\n';
    
    // Visitors Section
    csvContent += 'VISITOR INSIGHTS\n';
    csvContent += 'Month,Loyal,New,Unique\n';
    dashboardData.visitors.forEach(item => {
      csvContent += `${item.name},${item.loyal},${item.new},${item.unique}\n`;
    });
    csvContent += '\n\n';
    
    // Revenue Section
    csvContent += 'TOTAL REVENUE\n';
    csvContent += 'Month,Online,Offline,Total\n';
    dashboardData.revenue.forEach(item => {
      csvContent += `${item.month},${item.online},${item.offline},${item.total}\n`;
    });
    csvContent += '\n\n';
    
    // Customer Satisfaction Section
    csvContent += 'CUSTOMER SATISFACTION\n';
    csvContent += 'Month,Last Month,This Month\n';
    dashboardData.satisfaction.forEach(item => {
      csvContent += `${item.month},${item.lastMonth},${item.thisMonth}\n`;
    });
    csvContent += '\n\n';
    
    // Target vs Reality Section
    csvContent += 'TARGET VS REALITY\n';
    csvContent += 'Month,Reality,Target\n';
    dashboardData.targetReality.forEach(item => {
      csvContent += `${item.month},${item.reality},${item.target}\n`;
    });
    csvContent += '\n\n';
    
    // Top Products Section
    csvContent += 'TOP PRODUCTS\n';
    csvContent += '#,Product Name,Popularity,Sales\n';
    dashboardData.topProducts.forEach(item => {
      csvContent += `${item.id},"${item.name}",${item.popularity}%,${item.sales}%\n`;
    });
    csvContent += '\n\n';
    
    // Sales by Country Section
    csvContent += 'SALES BY COUNTRY\n';
    csvContent += 'Country,Sales,Percentage\n';
    dashboardData.salesByCountry.forEach(item => {
      csvContent += `${item.country},${item.sales},${item.percentage}%\n`;
    });
    csvContent += '\n\n';
    
    // Volume vs Service Section
    csvContent += 'VOLUME VS SERVICE LEVEL\n';
    csvContent += 'Month,Volume,Service\n';
    dashboardData.volumeService.forEach(item => {
      csvContent += `${item.month},${item.volume},${item.service}\n`;
    });
    
    // Create and download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `full-dashboard-${timestamp}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
