import marked from "marked";
import { decode as htmlEntityDecode } from "html-entities";

export const markdownToText = markdown => htmlEntityDecode(marked(
    markdown,
    {
        renderer: {
            // Blocks
            code: code => `${code.split("\n").map(line => `  ${line}`).join("\n")}\n\n`,
            blockquote: quote => `${quote.split("\n").map(line => `  ${line}`).join("\n")}\n\n`,
            html: html => "",
            heading: text => `${text}\n`,
            hr: () => "\n",
            list: () => "",
            listitem: text => `- ${text}\n`,
            checkbox: () => "",
            paragraph: text => `${text}\n\n`,
            table: (header, body) => `${header}\n${body}\n`,
            tablerow: content => `${content}\n`,
            tablecell: content => `${content}`,

            // Inline
            strong: text => `*${text}*`,
            em: text => `_${text}_`,
            codespan: text => `"${text}"`,
            br: () => "\n",
            del: () => "",
            link: (href, title, text) => text,
            image: () => "(image)",
            text: text => text,
        },
    }
));
