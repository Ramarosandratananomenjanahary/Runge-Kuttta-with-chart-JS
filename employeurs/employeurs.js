function f(t, y) {
    return 1.5 * t - 0.1 * y;
  }

  function rungeKutta(y0, t0, h, n) {
    let y = y0;
    let result = [[t0, y0]];
    for (let i = 1; i <= n; i++) {
      let k1 = h * f(t0, y);
      let k2 = h * f(t0 + h / 2, y + k1 / 2);
      let k3 = h * f(t0 + h / 2, y + k2 / 2);
      let k4 = h * f(t0 + h, y + k3);
      y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      t0 += h;
      result.push([t0, y]);
    }
    return result;
  }

  function simulerCharge() {
    const y0 = parseFloat(document.getElementById("y0").value || 0);
    const semaines = parseInt(document.getElementById("semaines").value || 16);

    const h = 1;
    const data = rungeKutta(y0, 0, h, semaines);

    const labels = data.map(([t]) => `${Math.round(t)} sem`);
    const valeurs = data.map(([_, y]) => y.toFixed(2));

    const ctx = document.getElementById("graphique").getContext("2d");
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Charge de travail (heures)",
          data: valeurs,
          borderColor: "#e67e22",
          backgroundColor: "rgba(230, 126, 34, 0.2)",
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Évolution de la charge de travail hebdomadaire"
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Temps (semaines)"
            }
          },
          y: {
            title: {
              display: true,
              text: "Heures de travail"
            },
            beginAtZero: true
          }
        }
      }
    });
  }