let chart; 

function f(t, y, taux) {
  return taux * y;
}

function rungeKutta4ParSemaines(y0, taux, t0, tf, h) {
  let y = y0;
  let t = t0;
  let points = [{ t, y }];

  while (t < tf) {
    let k1 = h * f(t, y, taux);
    let k2 = h * f(t + h / 2, y + k1 / 2, taux);
    let k3 = h * f(t + h / 2, y + k2 / 2, taux);
    let k4 = h * f(t + h, y + k3, taux);

    y += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
    t += h;
    points.push({ t, y });
  }

  return points;
}

function simuler() {
  let y0 = parseFloat(document.getElementById("y0").value);
  let taux = parseFloat(document.getElementById("rate").value);
  
  let t0 = 0;
  let tf = 10; 
  let h = 1; 

  let progression = rungeKutta4ParSemaines(y0, taux, t0, tf, h);

  const dernier = progression[progression.length - 1];
  document.getElementById("resultat").innerText =
    `Niveau prévu à la fin du semestre : ${dernier.y.toFixed(2)}`;

  afficherGraphique(progression);
}

function afficherGraphique(donnees) {
  const labels = donnees.map(p => `Semaine ${p.t}`);
  const data = donnees.map(p => p.y.toFixed(2));

  if (chart) chart.destroy();

  const ctx = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Niveau de l\'étudiant',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Niveau'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Temps (semaines)'
          }
        }
      }
    }
  });
}
