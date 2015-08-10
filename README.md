# pdfjs-slow

Recreating a case where pdf.js renders very slowly in Safari

Steps to recreate:

```
git clone https://github.com/nicksellen/pdfjs-slow
cd pdfjs-slow
python -m SimpleHTTPServer
```

Then download the two test PDF's (they are identical, but the select element doesn't trigger change event if you don't change the file):
- https://github.com/nicksellen/pdfjs-slow/raw/master/Ubersmith_API_documentation_3_3_0.pdf
- https://github.com/nicksellen/pdfjs-slow/raw/master/Ubersmith_API_documentation_3_3_0.copy.pdf

Visit [http://localhost:8000/slow.html](http://localhost:8000/slow.html) and alternate uploading the two files. For me, after 1 or 2 fast renders it'll start to take up to 10 seconds.

You can see what I experience here https://github.com/mozilla/pdf.js/issues/6338.

Alternatively just try viewing https://github.com/nicksellen/pdfjs-slow/blob/master/Ubersmith_API_documentation_3_3_0.pdf (github uses PDF.js itself to render the PDF's and this is extremely slow for me on Safari, I didn't check if it is for the same reason though).
