## Sending as byte

```
ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
try {

    PdfWriter pdfWriter = new PdfWriter(byteArrayOutputStream);
    PdfDocument pdfDocument = new PdfDocument(pdfWriter);
 	Document document = new Document(pdfDocument, PageSize.A4, false);
// set font, add text etc...Do your thing
	document.close();
	return byteArrayOutputStream.toByteArray();
```