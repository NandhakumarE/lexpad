# 📝 Lexpad – Lightweight, Pluggable Rich Text Editor for React

**Lexpad** is a flexible, React-based rich text editor built on [Lexical](https://lexical.dev/). It’s designed to be lightweight, extensible, and ready for modern app integration — with a focus on clean UX, real-time HTML output, and developer-first ergonomics.


## 🚀 Features

| Feature | Description |
|:-|:-|
| 🧩 **React/TypeScript** | Modern, type-safe, easy to use |
| 🧠 **Lexical-powered** | Extensible, reliable, accessible |
| 🛠️ **Plugins** | Extend with your own plugins |
| 📨 **HTML In/Out** | `value` / `onChange` for full HTML control |
| 🧮 **Controlled/Uncontrolled** | Use as managed or unmanaged state |
| 🎨 **Styling & Placeholder** | Custom classes, placeholder, and i18n support |
| 🌐 **i18n-ready** | Pass your own language labels |
| 🧰 **Imperative APIs** (soon) | Direct control over editor state |

----

## 📦 Installation (Coming Soon)

```bash
npm install lexpad
```

---

## 🔧 Usage

```tsx
import { RichTextEditor } from "lexpad";

function App() {
  const [content, setContent] = useState("<p>Hello World!</p>");

  return (
    <RichTextEditor
      name="about"
      value={content}
      placeholder="Write your story..."
      onChange={setContent}
      autoFocus
    />
  );
}
```

---

## ✨ Props

| Prop         | Type                     | Description                                |
|--------------|--------------------------|--------------------------------------------|
| `name`       | `string`                 | Unique field name, helpful for forms.      |
| `value`      | `string` (HTML)          | Editor value (HTML content).               |
| `onChange`   | `(html: string) => void` | Callback on content change.                |
| `placeholder`| `string`                 | Placeholder text when empty.               |
| `autoFocus`  | `boolean`                | Autofocus on mount (optional).             |
| `readOnly`   | `boolean`                | Makes editor read-only (optional).         |
| `className`  | `string`                 | Wrapper class (optional).                  |
| `editorClassName` | `string`           | Editor content class (optional).           |
| `i18n`       | `Record<string, string>` | Custom language labels.                    |
| `debounce`   | `number` (ms)            | Debounce delay for `onChange` (optional).  |

---

## 🌍 i18n Example

```tsx
<RichTextEditor
  name="intro"
  i18n={{
    bold: "Gras",
    italic: "Italique",
    heading: "Titre",
    placeholder: "Écrivez quelque chose..."
  }}
/>
```

---

## 📈 Roadmap

- [x] HTML value in/out
- [x] Controlled & uncontrolled support
- [x] i18n via props
- [ ] Built-in formatting toolbar
- [ ] Plugin API
- [ ] Image embed plugin
- [ ] Markdown input/output (optional)
- [ ] Publish on npm

---

## 🧑‍💻 Contributing

Have a plugin or a feature in mind? Feel free to open a discussion or PR!

---

## 📄 License

MIT

---

Made with ❤️ by [@NandhakumarE](https://github.com/NandhakumarE)