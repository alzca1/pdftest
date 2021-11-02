import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { decodeFromBase64, degrees, LineJoinStyle, PDFDocument } from "pdf-lib";
import { pdfObject } from "../pdfObject";
import { decode } from "base64-arraybuffer";
import FileSaver from "file-saver";

export default function Conversion() {

    useEffect(() => {
        console.log("saving...")
    })
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

//   const handleFullPage = async () => {
//     const labelsArray = [];

//     pdfObject.forEach(async (pdf) => {
//       const label = await PDFDocument.load(pdf);
//       labelsArray.push(label);
//     });

//     const pdfDoc = await PDFDocument.create();
//     const [sticker1] = await pdfDoc.embedPdf(labelsArray[0]);
//     const [sticker2] = await pdfDoc.embedPdf(labelsArray[1]);
//     const [sticker3] = await pdfDoc.embedPdf(labelsArray[2]);
//     const [sticker4] = await pdfDoc.embedPdf(labelsArray[3]);

//     const page = pdfDoc.addPage(); 
    
//     page.drawPage(sticker1, {})
//   };

  const handleHalfPage = async () => {
    const base64label1 = pdfObject[0].label;
    const base64label2 = pdfObject[1].label;
    let label1 = await PDFDocument.load(base64label1);
    let label2 = await PDFDocument.load(base64label2);

    const pdfDoc = await PDFDocument.create();
    const [sticker1] = await pdfDoc.embedPdf(label1);
    const [sticker2] = await pdfDoc.embedPdf(label2);

    

    const page = pdfDoc.addPage([595.28, 841.89]);

    console.log("width", page.getWidth(), "height", page.getHeight())

    // sticker1 x -311.82 - y - 841.89
    // page.drawPage(sticker1, {
    //     x: page.getWidth() - 283.46, // 311.82
    //     y: page.getHeight(), // 841.89
    //     xScale: 1,
    //     yScale: 1,
    //     rotate: degrees(-90)
    //   });
   
      // sticker2 x-311.82 - y 416.7
    // page.drawPage(sticker2, {
    //   x: page.getWidth() - 283.46, 
    //   y: page.getHeight() 
    //   xScale: 1,
    //   yScale: 1,
    //   rotate: degrees(-90)
    // });

    // sticker3
     page.drawPage(sticker1, {
      x: 0,
      y: page.getHeight(),
      xScale: 1,
      yScale: 1,
      rotate: degrees(-90)
    });

    // sticker4
    page.drawPage(sticker2, {
      x: 0,
      y: page.getHeight() - 425.19,
      xScale: 1,
      yScale: 1,
      rotate: degrees(-90)
    });
    

    const pdfBytes = await pdfDoc.save();

    let blob = new Blob([pdfBytes], { type: "text/pdf" });
    FileSaver.saveAs(blob, "mypdf.pdf");
  };

  return (
    <>
      <h1>PDF Conversion</h1>
      <Button onClick={handleHalfPage} variant="outlined">
        Get PDF
      </Button>
    </>
  );
}
