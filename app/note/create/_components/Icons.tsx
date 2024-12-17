import { 
    Bold, 
    Italic, 
    Underline, 
    Strikethrough, 
    Superscript,
    Palette,
    Type,
 StrikethroughIcon,
    AlignLeft,
    RotateCcw,
    Heading1,
    Quote,
    Indent,
    List,
    Code,
    FileCode,

    Link,
    Image,
    Video,
    Parentheses
  } from 'lucide-react';
export default function getIcon(name: string) {
    switch(name) {
      case 'bold':
        return <Bold size={16} />;
      case 'italic':
        return <Italic size={16} />;
      case 'underline':
        return <Underline size={16} />;
      case 'strike':
        return <StrikethroughIcon size={16} />;
      case 'script':
        return <Superscript size={16} />;
      case 'color':
        return <Palette size={16} />;
      case 'background':
        return <Palette size={16} />;
      case 'font':
        return <Type size={16} />;
      case 'size':
        // return <FontSize size={16} />;
      case 'align':
        return <AlignLeft size={16} />;
      case 'direction':
        return <RotateCcw size={16} />;
      case 'header':
        return <Heading1 size={16} />;
      case 'blockquote':
        return <Quote size={16} />;
      case 'indent':
        return <Indent size={16} />;
      case 'list':
        return <List size={16} />;
      case 'code':
        return <Code size={16} />;
      case 'code-block':
        return <FileCode size={16} />;
      case 'formula':
        return <Parentheses size={16} />;
      case 'link':
        return <Link size={16} />;
      case 'image':
        return <Image size={16} />;
      case 'video':
        return <Video size={16} />;
      default:
        return null;
    }
  }