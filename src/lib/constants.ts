export const APP_NAME = 'PhoText';
export const APP_TAGLINE = 'Edit Text in Image Online';
export const APP_DESCRIPTION = 'The Easiest way to Edit Text in Image, Click Text in Image to Edit it, without needing PS skills.';

export const SUPPORTED_FORMATS = ['JPG', 'PNG', 'JPEG', 'WEBP', 'PDF'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const NAV_LINKS = [
  { label: 'AI Image Editor', href: '/ai-image-editor' },
  { label: 'Translate Image', href: '/translate' },
  { label: 'Photo Scanner', href: '/scanner' },
  { label: 'Font Identifier', href: '/font-finder' },
];

export const MORE_LINKS = [
  { label: 'Resize Image', href: '#' },
  { label: 'Image to PDF', href: '#' },
  { label: 'PDF to Images', href: '#' },
];

export const FEATURES = [
  { title: 'AI Text Editing', description: 'Supports conversational image editing. Based on next-gen AI \'Semantic Understanding + Smart Background Repair + Style Transfer\' all-in-one solution.' },
  { title: 'AI Font Matching', description: 'Supports AI recognition of fonts in images, providing a vast library of fonts for use.' },
  { title: 'Background Seamless Restoration', description: 'Automatically restores background during text modification. No ghosts, white edges, or color blocks.' },
  { title: 'Perfect Style Matching', description: 'AI analyzes the original image to match font, color, weight, perspective, shadow, and gloss.' },
  { title: 'High-Precision OCR', description: 'Supports recognition of text in all languages within images. Accurately recognizes slanted, curved, small text.' },
  { title: 'Powerful Image Editing', description: 'Offers features like filters, stickers, and word art. Supports processing and exporting high-resolution images.' },
  { title: 'Minimalist Experience', description: 'Smooth operation on both Web and App. Intuitive interface, no learning required.' },
  { title: 'High Cost-Performance', description: 'Basic features are free. Generous free trial quota for advanced features.' },
  { title: 'Privacy & Security', description: 'We do not collect user photos or device information. Edited images are automatically cleared after 3 days.' },
];

export const FAQ_ITEMS = [
  { question: 'How do I match the same font?', answer: 'After selecting the text, click "Identify Font" in the font section of the editing panel to recognize and match similar fonts.' },
  { question: 'Spots during manual editing?', answer: 'When manually editing, the background removal tool offers multiple schemes to achieve the best seamless background restoration. Try a different removal result, or use AI conversational editing.' },
  { question: 'How do I fix just one word in a line?', answer: 'When manually editing, you can precisely select the text in the image to edit it, or manually erase the target text and add new text at the corresponding position.' },
  { question: 'What image formats are supported?', answer: 'We support JPG, PNG, JPEG, WEBP, and PDF formats. Maximum file size is 10MB.' },
  { question: 'How accurate is the text detection?', answer: 'Our AI-powered OCR provides high accuracy for most fonts and languages. Accuracy may vary with highly stylized or handwritten text.' },
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'zh-tw', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'th', label: 'ไทย' },
  { code: 'ru', label: 'Русский' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
];

export const FOOTER_FEATURES = [
  { label: 'Edit Text in Image', href: '/' },
  { label: 'Translate Image', href: '/translate' },
  { label: 'Photo Scanner', href: '/scanner' },
  { label: 'Font Identifier', href: '/font-finder' },
  { label: 'PDF Text Editor', href: '#' },
  { label: 'AI Image Editor', href: '/ai-image-editor' },
  { label: 'Resize Image', href: '#' },
  { label: 'Image to PDF', href: '#' },
  { label: 'PDF to Images', href: '#' },
  { label: 'Remove Text from Image', href: '#' },
  { label: 'Replace Text in Image', href: '#' },
  { label: 'Poster Text Edit', href: '#' },
  { label: 'E-commerce Image Text Edit', href: '#' },
  { label: 'Certificate Image Text Edit', href: '#' },
  { label: 'Fix Text in Image', href: '#' },
];
