import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min?url'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type customPdfViewerProps = {
    file: string | File;
};

export default function CustomPdfViewer({ file }: customPdfViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages } : { numPages: number}) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    return (
        <div style={{textAlign: 'center'}}>
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading='Loading PDF...'
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <div style={{ margin: '1rem 0'}}>
                <button 
                    onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
                    disabled={numPages === null || pageNumber <= 1}
                >
                    Prev
                </button>
                <span style={{ margin: '0 1rem'}}>
                    Page {pageNumber} of {numPages}
                </span>
                <button
                    onClick={() => setPageNumber(page => Math.min(page + 1, numPages ?? 1))}
                    disabled={numPages === null || pageNumber >= numPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

