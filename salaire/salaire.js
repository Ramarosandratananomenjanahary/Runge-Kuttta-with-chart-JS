    function f(t, y, depot, r) {
      return r * y + depot;
    }

    function rungeKutta(y0, t0, h, n, depot, r) {
      let y = y0;
      let result = [[t0, y0]];
      for (let i = 1; i <= n; i++) {
        let k1 = h * f(t0, y, depot, r);
        let k2 = h * f(t0 + h / 2, y + k1 / 2, depot, r);
        let k3 = h * f(t0 + h / 2, y + k2 / 2, depot, r);
        let k4 = h * f(t0 + h, y + k3, depot, r);
        y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        t0 += h;
        result.push([t0, y]);
      }
      return result;
    }

    function simulerEpargne() {
      const initial = parseFloat(document.getElementById("initial").value || 0);
      const depot = parseFloat(document.getElementById("depot").value || 0);
      const taux = parseFloat(document.getElementById("taux").value || 0) / 100 / 12;
      const mois = parseInt(document.getElementById("mois").value || 12);

      const h = 1;
      const data = rungeKutta(initial, 0, h, mois, depot, taux);

      const labels = data.map(([t]) => `${Math.round(t)} mois`);
      const valeurs = data.map(([_, y]) => y.toFixed(2));

      const ctx = document.getElementById("graphique").getContext("2d");
      if (window.myChart) window.myChart.destroy();

      window.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Épargne cumulée (€)",
            data: valeurs,
            borderColor: "green",
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Évolution de l'épargne sur la durée"
            },
            legend: {
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Temps (mois)"
              }
            },
            y: {
              title: {
                display: true,
                text: "Montant (€)"
              },
              beginAtZero: true
            }
          }
        }
      });
    }