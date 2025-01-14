import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './SubjectPage.css'; 

const SubjectPage = () => {
  const [text, setText] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video', 'color', 'background', 'align'
  ];

  const handleSave = () => {
    localStorage.setItem('editorContent', text);
    alert('Contenido guardado');
    console.log(text)
  };

  const handleLoad = () => {
    const savedText = localStorage.getItem('editorContent');
    if (savedText) {
      setText(savedText);
    } else {
      alert('No hay contenido guardado');
    }
  };

  const handleClear = () => {
    setText("");
  };

  const wordCount = text.trim().split(/\s+/).length;

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
      />
      <div className="editor-controls">
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleLoad}>Cargar</button>
        <button onClick={handleClear}>Limpiar</button>
        <div>Contador de palabras: {wordCount}</div>
      </div>
    </div>
  );
};

export default SubjectPage;