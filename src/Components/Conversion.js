import { Button } from "@mui/material";
import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { LineJoinStyle, PDFDocument } from "pdf-lib";

export default function Conversion() {
  const [downloadLink, setDownloadLink] = useState(null);
  const fonts = {
    Roboto: {
      normal:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
      bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
      italics:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
      bolditalics:
        "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
    },
  };

  //   const handlePdf = () => {
  //     console.log("downloading pdf");
  //     const docDefinition = {
  //       content: "Esto es un pdf de prueba",
  //     };
  //     pdfMake.createPdf(docDefinition, null, fonts).download();
  //   };

  const handlePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText("this is my pdf", { x: 25, y: 800 });
    const pdfBytes = await pdfDoc.save();
    const pdfDocument = new Blob([pdfBytes], { type: "text/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(pdfDocument);
    link.download ="myPdf.pdf"; 
    link.click();
  };

//   const handlePDFLib = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage();
//     page.drawText("This is my first pdf");
//     const pdfBytes = await pdfDoc.save();
//     const pdfDocument = new Blob([pdfBytes], { type: "text/pdf" });
//     // if (downloadLink !== null) window.URL.revokeObjectURL(downloadLink);
//     // setDownloadLink(window.URL.createObjectURL(pdfDocument));
//     const link = document.createElement("a");
//     link.href = window.URL.createObjectURL(pdfDocument);
//     link.download = "myPDF.pdf";
//     link.click();
//   };

  return (
    <>
      <h1>PDF Conversion</h1>
      <Button onClick={handlePDF} variant="outlined">
        Get PDF
      </Button>
    </>
  );
}
