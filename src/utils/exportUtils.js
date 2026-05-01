import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  doc.text(title, 14, 20);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

  // Prepare table data
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]));

  // Add table
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 40,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  // Save PDF
  doc.save(filename);
};


// Generate timestamp with date and time
const getTimestamp = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
  return `${date}_${time}`;
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
    
    // Top Products Sheet
    const productsSheet = XLSX.utils.json_to_sheet(dashboardData.topProducts);
    XLSX.utils.book_append_sheet(workbook, productsSheet, 'Top Products');
    
    // Sales by Country Sheet
    const salesSheet = XLSX.utils.json_to_sheet(dashboardData.salesByCountry);
    XLSX.utils.book_append_sheet(workbook, salesSheet, 'Sales by Country');
    
    XLSX.writeFile(workbook, `full-dashboard-${timestamp}.xlsx`);
  } else if (format === 'pdf') {
    const doc = new jsPDF();
    let yPosition = 20;
    
    // Title
    doc.setFontSize(20);
    doc.text('Dashboard Report', 14, yPosition);
    yPosition += 10;
    
    // Timestamp
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPosition);
    yPosition += 15;
    
    // Summary Section
    doc.setFontSize(14);
    doc.text("Today's Sales Summary", 14, yPosition);
    yPosition += 5;
    
    const summaryData = dashboardData.summary.map(item => [
      item.title,
      item.value,
      item.change
    ]);
    
    doc.autoTable({
      head: [['Metric', 'Value', 'Change']],
      body: summaryData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    yPosition = doc.lastAutoTable.finalY + 15;
    
    // Top Products Section
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Top Products', 14, yPosition);
    yPosition += 5;
    
    const productsData = dashboardData.topProducts.map(item => [
      item.id,
      item.name,
      `${item.sales}%`
    ]);
    
    doc.autoTable({
      head: [['#', 'Product Name', 'Sales']],
      body: productsData,
      startY: yPosition,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    doc.save(`full-dashboard-${timestamp}.pdf`);
  }
};
