let chart = null;

function parseEquation(expr) {
  return new Function("t", "y", `return ${expr};`);
}

function rungeKutta(t0, y0, h, n, f) {
  let t = t0;
  let y = y0;
  const points = [[t, y]];

  for (let i = 0; i < n; i++) {
    const k1 = h * f(t, y);
    const k2 = h * f(t + h / 2, y + k1 / 2);
    const k3 = h * f(t + h / 2, y + k2 / 2);
    const k4 = h * f(t + h, y + k3);

    y = y + (1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    t = t + h;
    points.push([t, y]);
  }

  return points;
}

function generateChart() {
  const y0 = parseFloat(document.getElementById("y0").value);
  const weeks = parseInt(document.getElementById("weeks").value);
  const equation = document.getElementById("equation").value;

  let f;
  try {
    f = parseEquation(equation);
    f(1, 1);
  } catch (e) {
    alert("Erreur dans l'équation. Utilise t et y. Exemple : 2*t - 0.1*y");
    return;
  }

  const results = rungeKutta(0, y0, 1, weeks, f);
  const labels = results.map(p => `Semaine ${Math.round(p[0])}`);
  const data = results.map(p => p[1].toFixed(2));
  
  if (chart) chart.destroy();

  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Charge de travail (heures)',
        data: data,
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
