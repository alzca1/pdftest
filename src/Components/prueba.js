import { PDFDocument } from 'pdf-lib'

async function embedPdfPages() {

    // 1) Definimos las url de los pdf
  const flagUrl = 'https://pdf-lib.js.org/assets/american_flag.pdf';
  const constitutionUrl = 'https://pdf-lib.js.org/assets/us_constitution.pdf';
// 2) Hacemos el fetch de cada pdf y les pasamos el 
// arrayBuffer (no necesario porque recibimos en base64)
  const flagPdfBytes = await fetch(flagUrl).then((res) => res.arrayBuffer());
  const constitutionPdfBytes = await fetch(constitutionUrl).then((res) =>
    res.arrayBuffer(),
  );
// 3) Creamos el documento pdfDoc
  const pdfDoc = await PDFDocument.create();
// 4 Incrustamos la bandera en el pdfDoc y la guardamos en la constante
// americanFlag
  const [americanFlag] = await pdfDoc.embedPdf(flagPdfBytes);
// 5) Guardamos en una constante la carga de constitutionPdfBytes (para qué???)
  const usConstitutionPdf = await PDFDocument.load(constitutionPdfBytes);
  // Guardamos en la constante preamble el incrustamiento de la segunda página
  // de la constante usConstitutionPdf y le añadimos un objeto con las 
  // coordenadas. 
  const preamble = await pdfDoc.embedPage(usConstitutionPdf.getPages()[1], {
    left: 55,
    bottom: 485,
    right: 300,
    top: 575,
  });

  const americanFlagDims = americanFlag.scale(0.3);
  const preambleDims = preamble.scale(2.25);

  const page = pdfDoc.addPage();

  page.drawPage(americanFlag, {
    ...americanFlagDims,
    x: page.getWidth() / 2 - americanFlagDims.width / 2,
    y: page.getHeight() - americanFlagDims.height - 150,
  });
  page.drawPage(preamble, {
    ...preambleDims,
    x: page.getWidth() / 2 - preambleDims.width / 2,
    y: page.getHeight() / 2 - preambleDims.height / 2 - 50,
  });

  const pdfBytes = await pdfDoc.save();
}