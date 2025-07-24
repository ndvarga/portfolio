import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import React from 'react';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type customPdfViewerProps = {
    file: string | File;
    onLoadComplete?: () => void;
};

export default function CustomPdfViewer({ file, onLoadComplete }: customPdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);

    const minScale = 0.5;
    const maxScale = 3.0;
    const scaleStep = 0.25;
    
    const pdfContainerRef = React.useRef<HTMLDivElement>(null); 

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
        onLoadComplete?.();
    }

    const handlePageChange = (newPageNumber: number) => {
        if (newPageNumber === pageNumber) return;

        setIsFlipping(true);

        setTimeout(() => {
            setPageNumber(newPageNumber);
            setTimeout(() => setIsFlipping(false), 50);
        }, 400);
    };

    const zoomIn = () => setScale(prev => Math.min(prev + scaleStep, maxScale));
    const zoomOut = () => setScale(prev => Math.max(prev - scaleStep, minScale));
    const resetZoom = () => setScale(1.0);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (pdfContainerRef.current) {
                pdfContainerRef.current.requestFullscreen();
                setIsFullscreen(true);
            }
            
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
        
    }, []);

    return (
        <div 
            ref={pdfContainerRef}
            style={{
                width: '80vw',
                height: '100vh',
                display: 'flex',
                margin: '2rem auto',
                flexDirection: 'column',
                color: 'black',
                background: 'var(--color-5)',
        }}>
            {/* Top Controls */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                background: 'var(--color-4)',
                boxShadow: '0px 4px 5px #221a1981',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                {/* Page Navigation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        className='arrow-button'
                        onClick={() => handlePageChange(Math.max(pageNumber - 1, 1))}
                        disabled={pageNumber <= 1 || isFlipping}
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ccc',
                            background: pageNumber <= 1 ? '#f5f5f5' : 'none',
                            cursor: pageNumber <= 1 || isFlipping ? 'not-allowed' : 'pointer', 
                        }}
                    >
                        &lt;
                    </button>
                    
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Page {pageNumber} of {numPages}
                    </span>
                    
                    <button
                        className='arrow-button'
                        onClick={() => handlePageChange(Math.min(pageNumber + 1, numPages ?? 1))}
                        disabled={pageNumber >= (numPages ?? 1) || isFlipping}
                        style={{
                            padding: '0.5rem 1rem',
                            background: pageNumber >= (numPages ?? 1) ? '#f5f5f5' : '#fff',
                            cursor: pageNumber >= (numPages ?? 1) || isFlipping ? 'not-allowed' : 'pointer',
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
                        className='arrow-button'
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
                    {/* Fullscreen Button*/}
                    <button 
                        onClick={toggleFullscreen}
                        className='arrow-button'
                        style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #ccc',
                            background: isFullscreen ? '#e3f2fd' : '#fff',
                            cursor: 'pointer',
                        }}
                    >
                    {isFullscreen ? '⛶' : '⛶'}
                    </button>
                </div>
            </div>

            {/* PDF Viewer */}
            <div
                className='page-flip-container' 
                style={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '2rem',
            }}>
                <div className={`page-flip-content ${isFlipping ? 'flipping' : ''}`}>
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
        </div>
    );
};
