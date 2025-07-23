import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type customPdfViewerProps = {
    file: string | File;
};

export default function CustomPdfViewer({ file }: customPdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    const minScale = 0.5;
    const maxScale = 3.0;
    const scaleStep = 0.25;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const zoomIn = () => setScale(prev => Math.min(prev + scaleStep, maxScale));
    const zoomOut = () => setScale(prev => Math.max(prev - scaleStep, minScale));
    const resetZoom = () => setScale(1.0);

    return (
        <div style={{
            width: '90vw',
            height: '100vh',
            display: 'flex',
            margin: '2rem auto',
            flexDirection: 'column',
            color: 'black',
            background: '#f5f5f5',
        }}>
            {/* Top Controls */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                background: 'white',
                borderBottom: '1px solid #ddd',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                {/* Page Navigation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        className='arrow-button'
                        onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                        disabled={pageNumber <= 1}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ccc',
                            background: pageNumber <= 1 ? '#f5f5f5' : 'none',
                            cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        &lt;
                    </button>
                    
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Page {pageNumber} of {numPages}
                    </span>
                    
                    <button
                        className='arrow-button'
                        onClick={() => setPageNumber(page => Math.min(page + 1, numPages ?? 1))}
                        disabled={pageNumber >= (numPages ?? 1)}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ccc',
                            background: pageNumber >= (numPages ?? 1) ? '#f5f5f5' : '#fff',
                            cursor: pageNumber >= (numPages ?? 1) ? 'not-allowed' : 'pointer',
                        }}
                    >
                        &gt;
                    </button>
                </div>

                {/* Zoom Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        className='arrow-button'
                        onClick={zoomOut}
                        disabled={scale <= minScale}
                        style={{
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            background: scale <= minScale ? '#f5f5f5' : '#fff',
                            cursor: scale <= minScale ? 'not-allowed' : 'pointer',
                        }}
                    >
                        −
                    </button>
                    
                    <span style={{ fontSize: '1rem', minWidth: '60px', textAlign: 'center' }}>
                        {Math.round(scale * 100)}%
                    </span>
                    
                    <button
                        className='arrow-button'
                        onClick={zoomIn}
                        disabled={scale >= maxScale}
                        style={{
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            background: scale >= maxScale ? '#f5f5f5' : '#fff',
                            cursor: scale >= maxScale ? 'not-allowed' : 'pointer',
                        }}
                    >
                        +
                    </button>
                    
                    <button
                        onClick={resetZoom}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ccc',
                            background: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* PDF Viewer */}
            <div style={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '2rem',
            }}>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div style={{ padding: '2rem' }}>Loading PDF...</div>}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderAnnotationLayer={true}
                        renderTextLayer={true}
                    />
                </Document>
            </div>
        </div>
    );
}
