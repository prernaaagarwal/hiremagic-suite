import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const SUPPORTED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const SUPPORTED_EXTENSIONS = ['.pdf', '.docx'];

export interface ParsedFile {
  name: string;
  type: string;
  text: string;
  size: number;
}

export function isSupported(file: File): boolean {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase();
  return SUPPORTED_TYPES.includes(file.type) || SUPPORTED_EXTENSIONS.includes(ext);
}

export function validateFile(file: File): string | null {
  if (!isSupported(file)) {
    return `Unsupported file type. Please upload PDF or DOCX files.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large. Maximum size is 20MB.`;
  }
  return null;
}

async function parsePdf(buffer: ArrayBuffer): Promise<string> {
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => item.str)
      .join(' ');
    pages.push(text);
  }
  return pages.join('\n\n');
}

async function parseDocx(buffer: ArrayBuffer): Promise<string> {
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}

export async function parseFile(file: File): Promise<ParsedFile> {
  const error = validateFile(file);
  if (error) throw new Error(error);

  const buffer = await file.arrayBuffer();
  const ext = file.name.split('.').pop()?.toLowerCase();

  let text: string;
  if (ext === 'pdf' || file.type === 'application/pdf') {
    text = await parsePdf(buffer);
  } else {
    text = await parseDocx(buffer);
  }

  if (!text.trim()) {
    throw new Error('Could not extract text from the file. It may be scanned or image-based.');
  }

  return { name: file.name, type: file.type, text: text.trim(), size: file.size };
}
