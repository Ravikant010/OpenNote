interface MenuOption {
    name: string;
    description: string;
}

interface MenuSection {
    section: string;
    options: MenuOption[];
}


export const menu_options:MenuSection[] = [
    {
        section: "Text Formatting",
        options: [
            { name: "bold", description: "Toggle bold text" },
            { name: "italic", description: "Toggle italic text" },
            { name: "underline", description: "Toggle underline" },
            { name: "strike", description: "Toggle strikethrough" },
            { name: "script", description: "Sub/superscript" }
        ]
    },
    {
        section: "Text Styling",
        options: [
            { name: "color", description: "Change text color" },
            { name: "background", description: "Change background color" },
            { name: "font", description: "Change font family" },
            { name: "size", description: "Change font size" }
        ]
    },
    {
        section: "Text Alignment & Direction",
        options: [
            { name: "align", description: "Text alignment" },
            { name: "direction", description: "Text direction" }
        ]
    },
    {
        section: "Structural Elements",
        options: [
            { name: "header", description: "Add heading" },
            { name: "blockquote", description: "Toggle blockquote" },
            { name: "indent", description: "Adjust indentation" },
            { name: "list", description: "Toggle list (ordered/bullet)" }
        ]
    },
    {
        section: "Code & Special Formats",
        options: [
            { name: "code", description: "Toggle code format" },
            { name: "code-block", description: "Toggle code block" },
            { name: "formula", description: "Insert formula" }
        ]
    },
    {
        section: "Media",
        options: [
            { name: "link", description: "Insert/edit link" },
            { name: "image", description: "Insert image" },
      
        ]
    }
];