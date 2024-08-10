document.addEventListener('DOMContentLoaded', () => {
  let polarChart;

  const boton = document.getElementById('boton');
  const descargarPdf = document.getElementById('descargarPdf');

  const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(199, 199, 199, 1)',
    'rgba(83, 102, 255, 1)',
    'rgba(255, 206, 186, 1)',
    'rgba(105, 192, 75, 1)',
    'rgba(0, 119, 204, 1)',
    'rgba(255, 99, 71, 1)'
  ];

  boton.addEventListener('click', () => {
    const datos = [];
    const nombres = [];
    const backgroundColors = [];
    const borderColors = [];
    let error = false;

    for (let i = 1; i <= 12; i++) {
      const nombreInput = document.getElementById(`dato${i}_nombre`);
      const valorInput = document.getElementById(`dato${i}_valor`);

      if (!nombreInput || !valorInput) continue;

      const nombre = nombreInput.value.trim();
      const valor = parseFloat(valorInput.value);

      if (!nombre || isNaN(valor) || valor < 0 || valor > 10) {
        error = true;
        alert(`Error: El valor de ${nombre || `dato${i}`} debe estar entre 0 y 10.`);
        break;
      }

      nombres.push(nombre);
      datos.push(valor);
      backgroundColors.push(colors[i - 1]);
      borderColors.push(colors[i - 1].replace('0', '0'));
    }

    if (error || datos.length === 0) return;

    const data = {
      labels: nombres,
      datasets: [{
        label: 'Datos',
        data: datos,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    };

    const config = {
      type: 'polarArea',
      data: data,
      options: {
        scales: {
          r: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 1
            },
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw}`
            }
          }
        }
      }
    };

    const polarChartCanvas = document.getElementById('polarChart');
    if (polarChart) polarChart.destroy();
    polarChart = new Chart(polarChartCanvas, config);
  });

  descargarPdf.addEventListener('click', () => {
    html2canvas(document.querySelector('#grafica')).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'polar_chart.png';
      link.click();
    });
  });
});