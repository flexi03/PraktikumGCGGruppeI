////////////////////////////////////////////////////////////////////////////////
// bresenham.js
//
// Bearbeiten Sie diese Datei für den Praktikumsteil "Bresenham Line".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
//
// Studiengang:   BMI
// Gruppe     :   I
// Autor 1    :   Sedra Alkouatli
// Autor 2    :   Christoph Kern
// Autor 3    :   Lina Khalifeh
// Autor 4    :   Felix Kircher
// Autor 5    :   Sengphachanh Lanavanh
// Autor 6    :   Felix Nienhaus
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// drawLine(x0, y0, x1, y1)
// Diese Funktion soll eine Linie von (x0, y0) nach (x1, y1) zeichnen.
// Implementieren Sie dazu den Bresenham-Line-Algorithmus für alle Oktanten
// in dieser Funktion. Einen Punkt zeichnen Sie mit setPixel(x,y).
////////////////////////////////////////////////////////////////////////////////


function drawLine(x0, y0, x1, y1) {
  // Helferfunktion zur Visualisierung der Oktanten.
  if (typeof ctx !== 'undefined') {
    drawOctantGuides(x0, y0, ctx); // ctx -> das Objekt, das alle Zeichenfunktionen für die Canvas-Leinwand bereitstellt
  }

  // Absolute Distanz zwischen Start- und Endpunkt für beide Achsen.
  const absDistanceX = Math.abs(x1 - x0);
  const absDistanceY = Math.abs(y1 - y0);

  // Gibt die Schrittrichtung an: +1 (positiv) oder -1 (negativ).
  const stepX = (x0 < x1) ? 1 : -1;
  const stepY = (y0 < y1) ? 1 : -1;

  // Startpunkt der Linie. Diese Variablen werden schrittweise verändert.
  let currentX = x0;
  let currentY = y0;

  // Der Bresenham-Algorithmus wird klassisch für den 1. Oktanten (flache Linien)
  // erklärt. Für die anderen Oktanten kann man die Logik anpassen.
  // Eine gängige Methode ist, zwischen "flachen" und "steilen" Linien zu unterscheiden.

  // Fall 1: "Flache" Linie (Oktanten 1, 4, 5, 8).
  // Die Änderung in x ist größer oder gleich der Änderung in y.
  if (absDistanceX >= absDistanceY) {
    // Der Fehlerterm (error term) entscheidet, wann die "langsame" Achse (Y) einen Schritt macht.
    let errorTerm = absDistanceX / 2.0;

    while (true) {
      setPixel(currentX, currentY); // Aktuellen Pixel zeichnen.

      if (currentX === x1 && currentY === y1) {
        break; // Endpunkt erreicht, Schleife beenden.
      }

      // Der Fehlerterm wird um die Distanz der langsamen Achse reduziert.
      errorTerm -= absDistanceY;

      // Wenn der Fehler unter 0 fällt, ist es Zeit für einen Schritt auf der langsamen Achse.
      if (errorTerm < 0) {
        currentY += stepY; // Schritt auf der Y-Achse.
        errorTerm += absDistanceX; // Fehlerterm korrigieren.
      }

      currentX += stepX; // Schritt auf der schnellen Achse (X) erfolgt immer.
    }
  }
  // Fall 2: "Steile" Linie (Oktanten 2, 3, 6, 7).
  // Die Änderung in y ist größer als die Änderung in x.
  else {
    // Die Logik ist dieselbe wie oben, nur dass Y jetzt die "schnelle" Achse ist.
    let errorTerm = absDistanceY / 2.0;

    while (true) {
      setPixel(currentX, currentY); // Aktuellen Pixel zeichnen.

      if (currentX === x1 && currentY === y1) {
        break; // Endpunkt erreicht, Schleife beenden.
      }

      // Der Fehlerterm wird um die Distanz der langsamen Achse reduziert.
      errorTerm -= absDistanceX;

      // Wenn der Fehler unter 0 fällt, ist es Zeit für einen Schritt auf der langsamen Achse.
      if (errorTerm < 0) {
        currentX += stepX; // Schritt auf der X-Achse.
        errorTerm += absDistanceY; // Fehlerterm korrigieren.
      }

      currentY += stepY; // Schritt auf der schnellen Achse (Y) erfolgt immer.
    }
  }
}



// drawOctantGuides(x0, y0, ctx)
// Visualisiert die Oktanten um den Startpunkt
// Grün = funktioniert, Rot = nicht implementiert
function drawOctantGuides(x0, y0, ctx) {
  var centerX = 2 * x0 + 1;
  var centerY = 2 * y0 + 1;
  var radius = 80;

  // Bestimme aktive Oktanten (alle 8 für die vollständige Version)
  var activeOctants = [1, 2, 3, 4, 5, 6, 7, 8];

  ctx.save();

  // Zeichne ALLE Oktanten
  for (var oct = 1; oct <= 8; oct++) {
    var startAngle, endAngle;
    var isActive = activeOctants.indexOf(oct) !== -1;

    // Farbe je nach Status
    if (isActive) {
      ctx.strokeStyle = "rgba(100, 200, 100, 0.6)";
      ctx.fillStyle = "rgba(100, 200, 100, 0.15)";
    } else {
      ctx.strokeStyle = "rgba(200, 100, 100, 0.4)";
      ctx.fillStyle = "rgba(200, 100, 100, 0.05)";
    }
    ctx.lineWidth = 2;

    // Oktanten-Winkel (Y-Achse zeigt nach UNTEN!)
    switch(oct) {
      case 1: startAngle = 0; endAngle = Math.PI / 4; break;
      case 2: startAngle = Math.PI / 4; endAngle = Math.PI / 2; break;
      case 3: startAngle = Math.PI / 2; endAngle = 3 * Math.PI / 4; break;
      case 4: startAngle = 3 * Math.PI / 4; endAngle = Math.PI; break;
      case 5: startAngle = Math.PI; endAngle = 5 * Math.PI / 4; break;
      case 6: startAngle = 5 * Math.PI / 4; endAngle = 3 * Math.PI / 2; break;
      case 7: startAngle = 3 * Math.PI / 2; endAngle = 7 * Math.PI / 4; break;
      case 8: startAngle = 7 * Math.PI / 4; endAngle = 2 * Math.PI; break;
    }

    // Zeichne gefüllten Sektor
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Trennlinien zwischen Oktanten
  ctx.strokeStyle = "rgba(150, 150, 150, 0.3)";
  ctx.lineWidth = 1;
  for (var i = 0; i < 8; i++) {
    var angle = (i * Math.PI) / 4;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + radius * Math.cos(angle),
      centerY + radius * Math.sin(angle)
    );
    ctx.stroke();
  }

  // Beschriftung der Oktanten
  ctx.fillStyle = "rgba(80, 80, 80, 0.8)";
  ctx.font = "bold 16px Arial";
  ctx.textAlign = "center";

  var labels = [
    {oct: 1, angle: Math.PI / 8},
    {oct: 2, angle: 3 * Math.PI / 8},
    {oct: 3, angle: 5 * Math.PI / 8},
    {oct: 4, angle: 7 * Math.PI / 8},
    {oct: 5, angle: 9 * Math.PI / 8},
    {oct: 6, angle: 11 * Math.PI / 8},
    {oct: 7, angle: 13 * Math.PI / 8},
    {oct: 8, angle: 15 * Math.PI / 8}
  ];

  labels.forEach(function(label) {
    var x = centerX + (radius + 18) * Math.cos(label.angle);
    var y = centerY + (radius + 18) * Math.sin(label.angle) + 5;
    ctx.fillText(label.oct, x, y);
  });

  ctx.restore();
}
