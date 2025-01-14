// Simulación de un backend con datos falsos
const temarios = [
    {
      id: "1",
      nombre: "Cálculo Integral",
      descripcion: "Temario de cálculo integral para segundo semestre.",
      temas: [
        {
          id: "1.1",
          nombre: "Teorema fundamental del cálculo",
          subtemas: [
            {
              id: "1.1.1",
              nombre: "Medición aproximada de figuras amorfas",
              contenido: [
                { tipo: "texto", valor: "La medición aproximada de figuras amorfas utiliza técnicas de sumas." },
                { tipo: "imagen", valor: "https://example.com/figura-amorfa.png" },
              ],
            },
            {
              id: "1.1.2",
              nombre: "Notación sumatoria",
              contenido: [
                { tipo: "texto", valor: "La notación sumatoria simplifica el cálculo de series y sumas extensas." },
                { tipo: "video", valor: "https://example.com/notacion-sumatoria.mp4" },
                { tipo: "texto", valor: "La notación sumatoria simplifica el cálculo de series y sumas extensas." },

              ],
            },
          ],
        },
      ],
    },
  ];
  
  // Endpoint simulado para obtener el contenido de un subtema
  export async function getContenido(subtemaId) {
    for (const temario of temarios) {
      for (const tema of temario.temas) {
        for (const subtema of tema.subtemas) {
          if (subtema.id === subtemaId) {
            return subtema.contenido;
          }
        }
      }
    }
    return [];
  }