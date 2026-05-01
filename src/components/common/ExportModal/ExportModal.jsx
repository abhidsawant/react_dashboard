import { useState } from 'react';
import { Download, X, FileText, FileSpreadsheet, File } from 'lucide-react';
import './ExportModal.css';

const ExportModal = ({ isOpen, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [exportType, setExportType] = useState('summary');

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(selectedFormat, exportType);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <Download size={24} />
            Export Data
          </h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Export Type Selection */}
          <div className="export-section">
            <label className="export-label">What to Export</label>
            <div className="export-options">
              <label className="export-option">
                <input
                  type="radio"
                  name="exportType"
                  value="summary"
                  checked={exportType === 'summary'}
                  onChange={(e) => setExportType(e.target.value)}
                />
                <span>Summary Only</span>
              </label>
              <label className="export-option">
                <input
                  type="radio"
                  name="exportType"
                  value="full"
                  checked={exportType === 'full'}
                  onChange={(e) => setExportType(e.target.value)}
                />
                <span>Full Dashboard</span>
              </label>
            </div>
          </div>

          {/* Format Selection */}
          <div className="export-section">
            <label className="export-label">Export Format</label>
            <div className="format-cards">
              <div
                className={`format-card ${selectedFormat === 'csv' ? 'active' : ''}`}
                onClick={() => setSelectedFormat('csv')}
              >
                <FileText size={32} />
                <h3>CSV</h3>
                <p>Comma-separated values</p>
              </div>
              <div
                className={`format-card ${selectedFormat === 'excel' ? 'active' : ''}`}
                onClick={() => setSelectedFormat('excel')}
              >
                <FileSpreadsheet size={32} />
                <h3>Excel</h3>
                <p>Microsoft Excel format</p>
              </div>
              <div
                className={`format-card ${selectedFormat === 'pdf' ? 'active' : ''}`}
                onClick={() => setSelectedFormat('pdf')}
              >
                <File size={32} />
                <h3>PDF</h3>
                <p>Portable document format</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-export" onClick={handleExport}>
            <Download size={18} />
            Export {selectedFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
