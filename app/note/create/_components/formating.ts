// Quill Format Handlers
export const formats = {
    background: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("background", "#ff0000");  // You can hardcode a color or implement a color picker
      }
    },
    bold: (quill: any) => {
      const range = quill.getSelection();
      console.log(range, "dfdf")
      if (range) {
        const format = quill.getFormat(range);
        quill.format("bold", !format.bold);  // Toggle bold
      }
    },
    color: (quill: any, color:string) => {
        console.log(quill, color)
      const range = quill.getSelection();
      console.log(range)
      if (range) {
        quill.format("color", color);  // Hardcoded color, you can change this to your preferred color picker
      }
    },
    font: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("font", "Arial");  // Hardcoded font, adjust as necessary
      }
    },
    code: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        const format = quill.getFormat(range);
        quill.format("code", !format.code);  // Toggle code
      }
    },
    italic: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        const format = quill.getFormat(range);
        quill.format("italic", !format.italic);  // Toggle italic
      }
    },
    link: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("link", "https://example.com");  // You can prompt the user for a link
      }
    },
    size: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("size", "large");  // Hardcoded size, you can modify this as per your needs
      }
    },
    strike: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        const format = quill.getFormat(range);
        quill.format("strike", !format.strike);  // Toggle strike-through
      }
    },
    script: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("script", "sub");  // Example: 'sub' script. You can toggle or allow more options
      }
    },
    underline: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        const format = quill.getFormat(range);
        quill.format("underline", !format.underline);  // Toggle underline
      }
    },
    blockquote: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        const format = quill.getFormat(range);
        quill.format("blockquote", !format.blockquote);  // Toggle blockquote
      }
    },
    header: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("header", 1);  // Example: applying header 1. You can allow other header levels
      }
    },
    indent: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("indent", "+1");  // Increase indent
      }
    },
    list: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("list", "ordered");  // Hardcoded to ordered list, change to "bullet" for unordered
      }
    },
    align: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("align", "center");  // Center alignment, you can change this to left/right/justify
      }
    },
    direction: (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        quill.format("direction", "rtl");  // Right-to-left text direction, change as needed
      }
    },
    "code-block": (quill: any) => {
      const range = quill.getSelection();
      if (range) {
        const format = quill.getFormat(range);
        quill.format("code-block", !format["code-block"]);  // Toggle code block
      }
    },
    formula: (quill: any) => {
      const range = quill.getSelection(true);
      if (range) {
        quill.insertEmbed(range.index, "formula", "E = mc^2", "user");  // Example formula, can be dynamic
      }
    },
    image: (quill: any) => {
      const range = quill.getSelection(true);
      if (range) {
        quill.insertEmbed(range.index, "image", "https://example.com/image.png", "user");  // Example image URL
      }
    },
    video: (quill: any) => {
      const range = quill.getSelection(true);
      if (range) {
        quill.insertEmbed(range.index, "video", "https://example.com/video.mp4", "user");  // Example video URL
      }
    },
  };
  