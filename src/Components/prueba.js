
    const { PDFDocument } = PDFLib

    async function embedPdfPages() {
    	// Fetch American flag PDF
      const flagUrl = 'https://pdf-lib.js.org/assets/american_flag.pdf';
      const flagPdfBytes = await fetch(flagUrl).then((res) => res.arrayBuffer());

			// Fetch U.S. constitution PDF
      const constitutionUrl = 'https://pdf-lib.js.org/assets/us_constitution.pdf';
      const constitutionPdfBytes = await fetch(constitutionUrl).then((res) =>
        res.arrayBuffer(),
      );

			// Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();

			// Embed the first page of the American flag PDF
      const [americanFlag] = await pdfDoc.embedPdf(flagPdfBytes);

			// Load the constitution PDF into a PDFDocument
      const usConstitutionPdf = await PDFDocument.load(constitutionPdfBytes);

			// Embed the second page of the constitution and clip the preamble
      const preamble = await pdfDoc.embedPage(usConstitutionPdf.getPages()[1], {
        left: 55,
        bottom: 485,
        right: 300,
        top: 575,
      });

			// Get the width/height of the American flag PDF scaled down to 30% of its original size
      const americanFlagDims = americanFlag.scale(0.3);

			// Get the width/height of the preamble clipping scaled up to 225% of its original size
      const preambleDims = preamble.scale(2.25);

			// Add a blank page to the document
      const page = pdfDoc.addPage();

			// Draw the American flag image in the center top of the page
      page.drawPage(americanFlag, {
        ...americanFlagDims,
        x: page.getWidth() / 2 - americanFlagDims.width / 2,
        y: page.getHeight() - americanFlagDims.height - 150,
      });

			// Draw the preamble clipping in the center bottom of the page
      page.drawPage(preamble, {
        ...preambleDims,
        x: page.getWidth() / 2 - preambleDims.width / 2,
        y: page.getHeight() / 2 - preambleDims.height / 2 - 50,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Trigger the browser to download the PDF document
      download(pdfBytes, "pdf-lib_pdf_page_embedding_example.pdf", "application/pdf");
    }
 

    const handleProperPDF = async () => {
        // Constanteamos la primera pegatina decodeada
        // const pdfSticker = decodeFromBase64(pdfObject[0].label);
        const pdfSticker1 = decode(pdfObject[0].label);
        console.log(pdfSticker1);
        // const pdfSticker1 = new Blob([pdfSticker], {type: "text/pdf"})
        // Creamos el documento
        const pdfDoc = await PDFDocument.create();
        // incrustamos el sticker
        const [sticker1] = await pdfDoc.embedPdf(pdfSticker1, [0]);
        console.log(sticker1);
        const page = pdfDoc.addPage();
        page.drawPage(sticker1, {
          x: page.getWidth() / 2 - sticker1.width / 2,
          y: page.getHeight() - sticker1.height - 150,
          xScale: 0.5,
          yScale: 0.5,
        });
        const pdfBytes = await pdfDoc.save();
        console.log(pdfBytes);
    
        // const pdfDocument = new Blob([pdfBytes], { type: "text/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(pdfBytes);
        link.download = "myPdf.pdf";
        link.click();
      };

      const handle = async () => {
        const base64 = pdfObject[0].label;
        let pdfDoc = await PDFDocument.load(base64);
        const pdfBytes = await pdfDoc.save();
       
        let blob = new Blob([pdfBytes], { type: "text/pdf" });
        FileSaver.saveAs(blob, "mypdf.pdf");
      };