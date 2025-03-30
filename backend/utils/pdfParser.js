import pdfParse from "pdf-parse";

/**
 * Extracts text from a PDF buffer.
 * @param {Buffer} pdfBuffer - The uploaded PDF file buffer.
 * @returns {Promise<string>} - Extracted text.
 */
const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer); // Pass buffer instead of path
    return data.text; 
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from resume");
  }
};

export default extractTextFromPDF;
